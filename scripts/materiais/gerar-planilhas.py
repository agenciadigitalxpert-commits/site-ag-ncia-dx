"""Gera os materiais em planilha/CSV de /materiais.

Uso (na raiz do projeto): python3 scripts/materiais/gerar-planilhas.py
"""
import json
from pathlib import Path

from openpyxl import Workbook
from openpyxl.formatting.rule import CellIsRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation

OUT = Path(__file__).resolve().parents[2] / "public" / "materiais" / "arquivos"
NAMES = json.loads((Path(__file__).parent / "arquivos.json").read_text())
OUT.mkdir(parents=True, exist_ok=True)

INK = "0A0A0B"
HEAD = PatternFill("solid", fgColor=INK)
INPUT = PatternFill("solid", fgColor="F1F1EE")
THIN = Side(style="thin", color="DCDCD6")
BOX = Border(top=THIN, bottom=THIN, left=THIN, right=THIN)
WHITE_BOLD = Font(bold=True, color="FFFFFF")


def header(ws, row, titles, widths):
    for i, (t, w) in enumerate(zip(titles, widths), start=1):
        c = ws.cell(row=row, column=i, value=t)
        c.fill, c.font = HEAD, WHITE_BOLD
        c.alignment = Alignment(vertical="center", wrap_text=True)
        ws.column_dimensions[get_column_letter(i)].width = w
    ws.row_dimensions[row].height = 30


# ---------------------------------------------------------------------------
# 2. Planilha de controle de leads (XLSX)
# ---------------------------------------------------------------------------
STATUS = ["Novo", "Em contato", "Qualificado", "Reunião ou visita marcada", "Proposta enviada", "Ganho", "Perdido", "Sem perfil"]
wb = Workbook()
ws = wb.active
ws.title = "Leads"
cols = ["Data", "Nome", "Empresa", "WhatsApp", "Origem", "Campanha ou palavra-chave", "Status", "Responsável",
        "Próximo passo", "Data do próximo contato", "Valor da proposta (R$)", "Motivo da perda", "Observações"]
widths = [12, 22, 22, 18, 16, 28, 24, 16, 30, 16, 18, 22, 36]
header(ws, 1, cols, widths)
ws.freeze_panes = "C2"
ws.append(["", "Exemplo: apague esta linha", "Empresa Exemplo", "(00) 00000-0000", "Google Ads", "marketing para clínicas",
           "Novo", "", "Responder e fazer as perguntas de qualificação", "", "", "", ""])
for r in range(2, 502):
    ws.cell(row=r, column=1).number_format = "DD/MM/YYYY"
    ws.cell(row=r, column=10).number_format = "DD/MM/YYYY"
    ws.cell(row=r, column=11).number_format = '"R$" #,##0.00'
dv = DataValidation(type="list", formula1='"' + ",".join(STATUS) + '"', allow_blank=True)
dv.error, dv.errorTitle = "Escolha um status da lista.", "Status"
ws.add_data_validation(dv)
dv.add("G2:G501")
dvo = DataValidation(type="list", formula1='"Google Ads,Meta Ads,Instagram,Indicação,Site,WhatsApp,Outro"', allow_blank=True)
ws.add_data_validation(dvo)
dvo.add("E2:E501")
colors = {"Novo": "E8EEF9", "Em contato": "FFF4C2", "Qualificado": "DBEAFE", "Reunião ou visita marcada": "E0E7FF",
          "Proposta enviada": "F3E8FF", "Ganho": "D1FAE5", "Perdido": "FEE2E2", "Sem perfil": "EEEEEE"}
for st, color in colors.items():
    ws.conditional_formatting.add("G2:G501", CellIsRule(operator="equal", formula=[f'"{st}"'], fill=PatternFill("solid", fgColor=color)))
ws.auto_filter.ref = "A1:M501"

rs = wb.create_sheet("Resumo")
rs.column_dimensions["A"].width = 34
rs.column_dimensions["B"].width = 14
rs.column_dimensions["C"].width = 20
rs["A1"] = "Resumo do funil (atualiza sozinho)"
rs["A1"].font = Font(bold=True, size=14)
header(rs, 3, ["Status", "Leads", "% do total"], [34, 14, 20])
for i, st in enumerate(STATUS, start=4):
    rs.cell(row=i, column=1, value=st)
    rs.cell(row=i, column=2, value=f'=COUNTIF(Leads!G:G,A{i})')
    rs.cell(row=i, column=3, value=f'=IFERROR(B{i}/$B$13,0)').number_format = "0%"
rs.cell(row=13, column=1, value="Total de leads").font = Font(bold=True)
rs.cell(row=13, column=2, value="=SUM(B4:B11)").font = Font(bold=True)
rs["A15"], rs["B15"] = "Taxa de qualificação", '=IFERROR((B6+B7+B8+B9)/B13,0)'
rs["A16"], rs["B16"] = "Taxa de fechamento (ganhos / qualificados)", '=IFERROR(B9/(B6+B7+B8+B9),0)'
rs["A17"], rs["B17"] = "Valor total ganho (R$)", '=SUMIF(Leads!G:G,"Ganho",Leads!K:K)'
rs["B15"].number_format = rs["B16"].number_format = "0%"
rs["B17"].number_format = '"R$" #,##0.00'
rs["A19"] = "Dica: registre a origem de cada lead. É isso que mostra quais campanhas trazem clientes, e não só contatos."
rs["A19"].font = Font(italic=True, color="55565B")
wb.save(OUT / NAMES["planilha-controle-de-leads"])
print("planilha de leads ok")

# ---------------------------------------------------------------------------
# 3. Calculadora de investimento em anúncios (XLSX)
# ---------------------------------------------------------------------------
wb = Workbook()
ws = wb.active
ws.title = "Calculadora"
ws["A1"] = "Calculadora de investimento em anúncios"
ws["A1"].font = Font(bold=True, size=14)
ws["A2"] = "Preencha só as células cinza. Os valores abaixo são um exemplo: troque pelos números do seu negócio."
ws["A2"].font = Font(italic=True, color="55565B")
header(ws, 4, ["O que você sabe (ou estima)", "Valor", "Dica"], [52, 18, 64])
inputs = [
    ("Contatos que você quer receber por mês", 40, "0", "Quantos pedidos sua equipe consegue atender bem"),
    ("Custo por clique estimado (R$)", 5.0, '"R$" #,##0.00', "Pergunte à sua agência; ela consulta no Google Ads"),
    ("De cada 100 visitas, quantas viram contato (%)", 0.08, "0.0%", "Sem histórico, use um número conservador"),
    ("De cada 100 contatos, quantos têm perfil (%)", 0.5, "0%", "Veja na sua planilha de leads"),
    ("De cada 100 com perfil, quantos fecham (%)", 0.2, "0%", "Sua taxa de fechamento no comercial"),
]
for i, (label, val, fmt, where) in enumerate(inputs, start=5):
    ws.cell(row=i, column=1, value=label)
    c = ws.cell(row=i, column=2, value=val)
    c.fill, c.number_format, c.border = INPUT, fmt, BOX
    ws.cell(row=i, column=3, value=where).font = Font(color="55565B")
header(ws, 11, ["Resultado", "Valor", "Como é calculado"], [52, 18, 64])
outs = [
    ("Visitas necessárias por mês", "=IFERROR(B5/B7,0)", "#,##0", "Contatos ÷ % de visitas que viram contato"),
    ("Investimento mensal em anúncios (R$)", "=B12*B6", '"R$" #,##0.00', "Visitas × custo por clique"),
    ("Investimento por dia (R$)", "=B13/30.4", '"R$" #,##0.00', "Mensal ÷ 30,4 dias"),
    ("Custo por contato (R$)", "=IFERROR(B13/B5,0)", '"R$" #,##0.00', "Investimento ÷ contatos"),
    ("Contatos com perfil por mês", "=B5*B8", "#,##0", "Contatos × % com perfil"),
    ("Clientes por mês (estimativa)", "=B16*B9", "#,##0.0", "Com perfil × % que fecham"),
    ("Investimento em anúncios por cliente (R$)", "=IFERROR(B13/B17,0)", '"R$" #,##0.00', "Investimento ÷ clientes (sem honorários da agência)"),
]
for i, (label, formula, fmt, how) in enumerate(outs, start=12):
    ws.cell(row=i, column=1, value=label)
    c = ws.cell(row=i, column=2, value=formula)
    c.number_format, c.font = fmt, Font(bold=True)
    ws.cell(row=i, column=3, value=how).font = Font(color="55565B")
ws["A20"] = "Pergunta que vale fazer: quanto você pode pagar para conquistar um cliente e ainda ter lucro?"
ws["A21"] = "Isto é uma estimativa, não uma promessa: o resultado muda com o mercado, a oferta, o site e o atendimento."
ws["A20"].font = ws["A21"].font = Font(italic=True, color="55565B")
wb.save(OUT / NAMES["calculadora-investimento-em-anuncios"])
print("calculadora ok")

# ---------------------------------------------------------------------------
# 4. Planilha de meta de vendas (funil reverso)
# ---------------------------------------------------------------------------
wb = Workbook()
ws = wb.active
ws.title = "Meta de vendas"
ws["A1"] = "Planilha de meta de vendas"
ws["A1"].font = Font(bold=True, size=14)
ws["A2"] = "Comece pela meta e volte etapa por etapa. Preencha as células cinza (os valores são um exemplo)."
ws["A2"].font = Font(italic=True, color="55565B")
header(ws, 4, ["Sua meta e seus números", "Valor", "Dica"], [52, 18, 64])
inputs = [
    ("Meta de faturamento no mês (R$)", 50000, '"R$" #,##0.00', "O valor que você quer vender no mês"),
    ("Ticket médio por venda (R$)", 2500, '"R$" #,##0.00', "Faturamento ÷ número de vendas de um mês normal"),
    ("De cada 100 propostas, quantas fecham (%)", 0.25, "0%", "Propostas ganhas ÷ propostas enviadas"),
    ("De cada 100 contatos, quantos viram proposta (%)", 0.4, "0%", "Propostas enviadas ÷ contatos recebidos"),
    ("Dias de trabalho no mês", 22, "0", "Para ver a meta de cada dia"),
]
for i, (label, val, fmt, where) in enumerate(inputs, start=5):
    ws.cell(row=i, column=1, value=label)
    c = ws.cell(row=i, column=2, value=val)
    c.fill, c.number_format, c.border = INPUT, fmt, BOX
    ws.cell(row=i, column=3, value=where).font = Font(color="55565B")
header(ws, 11, ["O que você precisa", "Por mês", "Como é calculado"], [52, 18, 64])
outs = [
    ("Vendas", "=IFERROR(ROUNDUP(B5/B6,0),0)", "#,##0", "Meta ÷ ticket médio"),
    ("Propostas enviadas", "=IFERROR(ROUNDUP(B12/B7,0),0)", "#,##0", "Vendas ÷ % de fechamento"),
    ("Contatos recebidos", "=IFERROR(ROUNDUP(B13/B8,0),0)", "#,##0", "Propostas ÷ % de contatos que viram proposta"),
    ("Contatos por dia de trabalho", "=IFERROR(B14/B9,0)", "#,##0.0", "Contatos ÷ dias de trabalho"),
]
for i, (label, formula, fmt, how) in enumerate(outs, start=12):
    ws.cell(row=i, column=1, value=label)
    c = ws.cell(row=i, column=2, value=formula)
    c.number_format, c.font = fmt, Font(bold=True)
    ws.cell(row=i, column=3, value=how).font = Font(color="55565B")
header(ws, 17, ["E se você melhorar o fechamento?", "Contatos/mês", ""], [52, 18, 64])
for k, extra in enumerate([0.05, 0.10], start=18):
    ws.cell(row=k, column=1, value=f"Fechamento {int(extra*100)} pontos maior")
    c = ws.cell(row=k, column=2, value=f"=IFERROR(ROUNDUP(ROUNDUP(B12/(B7+{extra}),0)/B8,0),0)")
    c.number_format, c.font = "#,##0", Font(bold=True)
ws["A21"] = "Muitas vezes é mais barato melhorar o atendimento do que comprar mais contatos."
ws["A21"].font = Font(italic=True, color="55565B")
wb.save(OUT / NAMES["planilha-meta-de-vendas"])
print("meta de vendas ok")
