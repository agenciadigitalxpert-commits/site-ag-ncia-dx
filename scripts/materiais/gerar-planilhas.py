"""Gera os materiais em planilha/CSV de /materiais.

Uso (na raiz do projeto): python3 scripts/materiais/gerar-planilhas.py
"""
import csv
from pathlib import Path

from openpyxl import Workbook
from openpyxl.formatting.rule import CellIsRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation

OUT = Path(__file__).resolve().parents[2] / "public" / "materiais"
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
# 1. Palavras-chave negativas (CSV)
# ---------------------------------------------------------------------------
NEG = {
    "Emprego e estudo": (
        "Quem quer estudar ou trabalhar com marketing, não contratar",
        ["curso", "cursos", "faculdade", "graduação", "pós", "mba", "certificação", "certificado", "apostila", "pdf",
         "livro", "ebook", "tcc", "monografia", "vaga", "vagas", "emprego", "estágio", "salário", '"quanto ganha"',
         '"trabalhe conosco"', '"como ser"', '"como se tornar"', '"como virar"', "aprender", "aula", "mentoria",
         "formação", '"home office"'],
    ),
    "Faça você mesmo": (
        "Pesquisa de quem quer fazer sozinho ou só entender o assunto",
        ['"o que é"', '"o que faz"', "significado", "definição", "conceito", "exemplos", "modelo", "template",
         "tutorial", '"passo a passo"', "sozinho", '"como fazer"', '"como colocar"', '"como anunciar"',
         '"como funciona"', '"como usar"', '"como divulgar"', '"como impulsionar"', "gratuitamente", "grátis",
         "gratuito", '"de graça"', "free"],
    ),
    "Ferramentas e login": (
        "Quem procura a ferramenta da plataforma, o login ou o suporte",
        ["gerenciador", '"gestor de anúncios"', '"meta business"', '"business center"', '"business suite"', "login",
         "entrar", "senha", "suporte", '"telefone google"', '"conta suspensa"', "reembolso", "cupom", "skillshop",
         "app", "aplicativo", "ferramenta"],
    ),
    "Seguidores e engajamento": (
        "Venda de seguidores, curtidas e painéis de redes sociais",
        ["seguidores", "curtidas", "engajamento", "ugc", "smm", '"painel smm"', "turbina", '"impulsiona perfil"',
         "visualizações", "comprar"],
    ),
    "Outras agências": (
        "Outros tipos de agência que aparecem na mesma busca",
        ['"agência de viagem"', '"agência de viagens"', '"agência bancária"', '"agência caixa"',
         '"agência de emprego"', '"agência de modelos"', "intercâmbio"],
    ),
}

with open(OUT / "palavras-chave-negativas-google-ads.csv", "w", newline="", encoding="utf-8-sig") as f:
    w = csv.writer(f)
    w.writerow(["Palavra-chave negativa (cole no Google Ads)", "Tipo de correspondência", "Grupo", "O que bloqueia"])
    total = 0
    for group, (why, words) in NEG.items():
        for word in words:
            tipo = "Frase" if word.startswith('"') else "Ampla"
            w.writerow([word, tipo, group, why])
            total += 1
    w.writerow([])
    w.writerow(["Revise antes de usar: tire da lista qualquer termo que descreva o que você vende (ex.: se você vende cursos, não negative \"curso\")."])
print("negativas:", total)

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
wb.save(OUT / "planilha-controle-de-leads.xlsx")
print("planilha de leads ok")

# ---------------------------------------------------------------------------
# 3. Calculadora de orçamento de mídia (XLSX)
# ---------------------------------------------------------------------------
wb = Workbook()
ws = wb.active
ws.title = "Calculadora"
ws.column_dimensions["A"].width = 52
ws.column_dimensions["B"].width = 18
ws.column_dimensions["C"].width = 60
ws["A1"] = "Calculadora de orçamento de mídia"
ws["A1"].font = Font(bold=True, size=14)
ws["A2"] = "Preencha só as células cinza. Os valores abaixo são exemplos: troque pelos números do seu negócio."
ws["A2"].font = Font(italic=True, color="55565B")
header(ws, 4, ["Dado de entrada", "Valor", "Onde encontrar"], [52, 18, 60])
inputs = [
    ("Leads que você quer por mês", 40, "0", "Quantos contatos sua equipe consegue atender bem"),
    ("CPC médio estimado (R$)", 5.0, '"R$" #,##0.00', "Planejador de palavras-chave do Google Ads ou histórico da conta"),
    ("Taxa de conversão da página (visita → lead)", 0.08, "0.0%", "Analytics ou relatório de conversões; sem histórico, comece conservador"),
    ("Leads qualificados (% dos leads)", 0.5, "0%", "Planilha de leads: qualificados ÷ total"),
    ("Taxa de fechamento (% dos qualificados)", 0.2, "0%", "Ganhos ÷ qualificados no seu comercial"),
]
for i, (label, val, fmt, where) in enumerate(inputs, start=5):
    ws.cell(row=i, column=1, value=label)
    c = ws.cell(row=i, column=2, value=val)
    c.fill, c.number_format, c.border = INPUT, fmt, BOX
    ws.cell(row=i, column=3, value=where).font = Font(color="55565B")
header(ws, 11, ["Resultado", "Valor", "Como é calculado"], [52, 18, 60])
outs = [
    ("Cliques necessários por mês", "=IFERROR(B5/B7,0)", "#,##0", "Leads ÷ taxa de conversão da página"),
    ("Orçamento mensal de mídia (R$)", "=B12*B6", '"R$" #,##0.00', "Cliques × CPC"),
    ("Orçamento diário (R$)", "=B13/30.4", '"R$" #,##0.00', "Mensal ÷ 30,4 dias"),
    ("Custo por lead (R$)", "=IFERROR(B13/B5,0)", '"R$" #,##0.00', "Orçamento ÷ leads"),
    ("Leads qualificados por mês", "=B5*B8", "#,##0", "Leads × % qualificados"),
    ("Custo por lead qualificado (R$)", "=IFERROR(B13/B16,0)", '"R$" #,##0.00', "Orçamento ÷ leads qualificados"),
    ("Clientes por mês (estimativa)", "=B16*B9", "#,##0.0", "Qualificados × taxa de fechamento"),
    ("Custo de mídia por cliente (R$)", "=IFERROR(B13/B18,0)", '"R$" #,##0.00', "Orçamento ÷ clientes (não inclui honorários)"),
]
for i, (label, formula, fmt, how) in enumerate(outs, start=12):
    ws.cell(row=i, column=1, value=label)
    c = ws.cell(row=i, column=2, value=formula)
    c.number_format, c.font = fmt, Font(bold=True)
    ws.cell(row=i, column=3, value=how).font = Font(color="55565B")
ws["A21"] = "Regra prática: cada campanha precisa de orçamento diário de pelo menos 10 vezes o CPC médio para aprender."
ws["A22"] = "Estimativa, não promessa: CPC e conversão mudam com o mercado, a oferta, a página e o atendimento."
ws["A21"].font = ws["A22"].font = Font(italic=True, color="55565B")
wb.save(OUT / "calculadora-orcamento-de-midia.xlsx")
print("calculadora ok")
