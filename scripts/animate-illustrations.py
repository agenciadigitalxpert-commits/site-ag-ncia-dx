"""Adiciona motion (CSS dentro do SVG) às 22 ilustrações e corrige peças.
Uso: python3 -I scripts/animate-illustrations.py design/ilustracoes-fonte public/ilustracoes
As fontes (estáticas) ficam em design/ilustracoes-fonte; a saída animada vai para public/ilustracoes."""
import os, re, sys

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)

BASE_CSS = """
@keyframes f{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes sh{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(.9);opacity:.75}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}
@keyframes blink{50%{opacity:0}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes dash{to{stroke-dashoffset:-28}}
@keyframes draw{0%{stroke-dashoffset:1}30%,80%{stroke-dashoffset:0}100%{stroke-dashoffset:-1}}
.f{animation:f 6s ease-in-out infinite}
.f2{animation:f 6s ease-in-out -3s infinite}
.sh{transform-box:fill-box;transform-origin:center;animation:sh 6s ease-in-out infinite}
.pulse{transform-box:fill-box;transform-origin:center;animation:pulse 2.6s ease-in-out infinite}
"""
RM = "@media (prefers-reduced-motion:reduce){*{animation:none!important}.rm-hide{display:none}}"

def end_of_element(s, i):
    """Índice logo após o elemento que começa em i (auto-fechado ou <g>…</g>)."""
    m = re.match(r"<(\w+)", s[i:])
    tag = m.group(1)
    j = s.index(">", i)
    if s[j - 1] == "/":
        return j + 1
    depth, k = 1, j + 1
    while depth:
        o = s.find("<" + tag, k)
        c = s.find("</" + tag + ">", k)
        if o != -1 and o < c:
            depth += 1; k = o + 1
        else:
            depth -= 1; k = c + len(tag) + 3
    return k

def wrap(s, first, last, open_tag):
    """Envolve do elemento que começa com `first` até o elemento que contém/começa com `last`."""
    a = s.index(first)
    b0 = s.index(last, a)
    b0 = s.rfind("<", 0, b0 + 1) if not last.startswith("<") else b0
    b = end_of_element(s, b0)
    return s[:a] + open_tag + s[a:b] + "</g>" + s[b:]

def cls(s, first, c):
    """Adiciona class ao elemento que começa com `first`."""
    a = s.index(first)
    tag_end = re.match(r"<\w+", s[a:]).end()
    return s[:a + tag_end] + f' class="{c}"' + s[a + tag_end:]

def outline(s):
    """Estilo outline: preenchimentos escuros viram transparentes, volume vira 2º contorno."""
    s = re.sub(r'<ellipse[^>]*fill="url\(#shadow\)"[^>]*/>\s*', "", s)          # sombra preta
    s = re.sub(r'<path [^>]*stroke="#000"[^>]*/>', "", s)                           # contorno-sombra preto
    s = s.replace('fill="url(#face)"', 'fill="#ffffff" fill-opacity="0.03"')
    s = s.replace('fill="url(#edge)"', 'fill="none"')
    for dark in ["#0A0A0B", "#141416", "#151516", "#151517"]:
        s = s.replace(f'fill="{dark}"', 'fill="#ffffff" fill-opacity="0.02"')
    return s

def finish(s, css):
    s = outline(s)
    s = s.replace("</defs>", "</defs>\n  <style>" + BASE_CSS + css + RM + "</style>", 1)
    return s

# ---------------------------------------------------------------------------
# Oclusão: no estilo outline as formas são transparentes, então cada forma
# "da frente" recorta (máscara) o que foi desenhado antes dela. Cada elemento é
# re-emitido com a cadeia de grupos que o envolvia (transform/animação), e a
# cópia usada na máscara herda a mesma cadeia — o recorte acompanha o movimento.
# ---------------------------------------------------------------------------
import copy
import xml.etree.ElementTree as ET
NS = "http://www.w3.org/2000/svg"
ET.register_namespace("", NS)
q = lambda t: f"{{{NS}}}{t}"
SHAPES = {q(t) for t in ["path", "rect", "circle", "ellipse", "polygon", "line"]}

def is_occluder(el):
    return el.get("fill") == "#ffffff" and el.get("fill-opacity") in ("0.03", "0.02")

def flatten(node, chain, outl):
    for ch in list(node):
        if ch.tag == q("g"):
            flatten(ch, chain + [dict(ch.attrib)], outl)
        elif ch.tag in SHAPES:
            outl.append((ch, chain))

def wrap_chain(leaf, chain):
    top = leaf
    for attrs in reversed(chain):
        g = ET.Element(q("g"), attrs)
        g.append(top)
        top = g
    return top

def occlude(svg):
    root = ET.fromstring(svg)
    defs = root.find(q("defs"))
    style = root.find(q("style"))
    content = [c for c in root if c.tag not in (q("defs"), q("style"))]
    glow = [c for c in content if c.get("fill") == "url(#glow)"]
    holder = ET.Element(q("g"))
    for c in content:
        if c in glow: continue
        holder.append(c)
    leaves = []
    flatten(holder, [], leaves)
    out_nodes, n = [], 0
    for leaf, chain in leaves:
        if is_occluder(leaf) and out_nodes:
            n += 1
            m = ET.SubElement(defs, q("mask"), {"id": f"oc{n}", "maskUnits": "userSpaceOnUse", "x": "-100", "y": "-100", "width": "600", "height": "600"})
            ET.SubElement(m, q("rect"), {"x": "-100", "y": "-100", "width": "600", "height": "600", "fill": "#fff"})
            hole = copy.deepcopy(leaf)
            for k in ("fill-opacity", "stroke-opacity", "stroke-dasharray"):
                hole.attrib.pop(k, None)
            hole.set("fill", "#000"); hole.set("stroke", "#000")
            for sub in list(hole):  # sem animateMotion etc. na cópia
                hole.remove(sub)
            m.append(wrap_chain(hole, copy.deepcopy(chain)))
            g = ET.Element(q("g"), {"mask": f"url(#oc{n})"})
            for node in out_nodes: g.append(node)
            out_nodes = [g]
        out_nodes.append(wrap_chain(copy.deepcopy(leaf), copy.deepcopy(chain)))
    for c in list(root):
        if c.tag not in (q("defs"), q("style")):
            root.remove(c)
    for c in glow + out_nodes:
        root.append(c)
    # style depois de defs
    root.remove(style); root.insert(1, style)
    return ET.tostring(root, encoding="unicode")

E = {}  # edições por arquivo: função(s) -> (s, css)

def e_404(s):
    s = s.replace('<g stroke-dasharray="3 11">', '<g class="flow" stroke-dasharray="3 11">')
    s = cls(s, '<circle cx="205" cy="173"', "bob pulse")
    return s, ".flow path{animation:dash 1.4s linear infinite}@keyframes bobk{50%{transform:translateY(-6px)}}.bob{animation:bobk 2.4s ease-in-out infinite,pulse 2.4s ease-in-out infinite}"
E["404"] = e_404

def e_cases(s):
    xs = ["91", "145", "199", "253"]
    for i, x in enumerate(xs):
        first = f'<g transform="translate(7 -7)"><rect x="{x}"'
        hl = {"91": "M98 272", "145": "M152 272", "199": "M206 272", "253": "M260 272"}[x]
        s = wrap(s, first, hl, f'<g class="bar" style="animation-delay:{i*0.18:.2f}s;transform-origin:{int(x)+20}px 286px">')
    return s, ".bar{animation:grow 4.8s cubic-bezier(.2,0,0,1) infinite}@keyframes grow{0%{transform:scaleY(.15);opacity:.3}22%,82%{transform:scaleY(1);opacity:1}100%{transform:scaleY(1);opacity:1}}"
E["cases"] = e_cases

def e_estetica(s):
    # espelho (cabo + moldura) balança; frasco flutua; brilho cintila
    s = wrap(s, '<g transform="rotate(15 145 233)"><rect x="133"', 'M102 146Q108 101 136 96', '<g class="sway">')
    s = wrap(s, '<rect x="217" y="170"', 'M226 193H282', '<g class="f2">')
    s = cls(s, '<path d="M268 116 Q288 113', "tw")
    return s, ".sway{transform-origin:150px 310px;animation:sway 5s ease-in-out infinite}@keyframes sway{0%,100%{transform:rotate(-2.5deg)}50%{transform:rotate(2.5deg)}}.tw{transform-box:fill-box;transform-origin:center;animation:tw 2.8s ease-in-out infinite}@keyframes tw{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(.7) rotate(45deg);opacity:.6}}"
E["clinicas-de-estetica"] = e_estetica

def e_odonto(s):
    s = wrap(s, '<g transform="translate(6 4)"><path d="M178 99', 'M153 110Q177 122', '<g class="f">')
    s = s.replace('<path d="M264 119l10 10 19-21" fill="none" stroke="#C8F53C"', '<path class="chk" pathLength="1" d="M264 119l10 10 19-21" fill="none" stroke="#C8F53C"')
    return s, ".chk{stroke-dasharray:1;animation:draw 3.6s cubic-bezier(.2,0,0,1) infinite}"
E["clinicas-odontologicas"] = e_odonto

def e_contato(s):
    s = wrap(s, '<g transform="translate(397 124)', '<g transform="translate(397 124)', '<g class="f2">')
    s = wrap(s, '<path d="M107 93H253', 'cx="204" cy="139"', '<g class="f">')
    for i, cx in enumerate(["156", "180", "204"]):
        s = cls(s, f'<circle cx="{cx}" cy="139"', f"dot d{i}")
    return s, ".dot{transform-box:fill-box;transform-origin:center;animation:typ 1.3s ease-in-out infinite}.d1{animation-delay:.16s}.d2{animation-delay:.32s}@keyframes typ{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-7px)}}"
E["contato"] = e_contato

def e_conteudos(s):
    s = wrap(s, '<rect x="126" y="81"', 'M175 129h55', '<g class="f">')
    s = cls(s, '<path d="M245 81H267V128', "mark")
    return s, ".mark{transform-box:fill-box;transform-origin:50% 0;animation:mark 4s cubic-bezier(.2,0,0,1) infinite}@keyframes mark{0%,100%{transform:scaleY(1)}45%{transform:scaleY(1.22)}60%{transform:scaleY(.94)}}"
E["conteudos"] = e_conteudos

def e_criativos(s):
    # play: dentro do celular, centralizado opticamente na tela e inclinado junto
    s = re.sub(r'<path d="M214 158Q214 151.*?/>', '', s, flags=re.S)
    play = '<path class="pulse" d="M182.2 164.6Q182.2 158.7 188.1 162.1L231.5 189.3Q237.4 193.5 231.5 197.8L188.1 225Q182.2 228.4 182.2 222.4Z" fill="#C8F53C"/>'
    phone_open = '<g transform="translate(61 0) rotate(7 200 200)">'
    a = s.index(phone_open); b = end_of_element(s, a)
    s = s[:a] + '<g class="f2">' + s[a:b - 4] + play + "</g></g>" + s[b:]
    # claquete: braço "bate"
    s = s.replace('<g transform="rotate(-15 75 146)">', '<g class="clap"><g transform="rotate(-15 75 146)">', 1)
    a = s.index('<g class="clap">'); inner = s.index('<g transform="rotate(-15 75 146)">', a); b = end_of_element(s, inner)
    s = s[:b] + "</g>" + s[b:]
    s = wrap(s, '<rect x="69" y="154"', 'M86 192h58', '<g class="f">')
    return s, ".clap{transform-origin:72px 150px;animation:clap 3.2s ease-in-out infinite}@keyframes clap{0%,30%,100%{transform:rotate(0)}38%{transform:rotate(15deg)}46%{transform:rotate(0)}}"
E["criativos-e-roteiros"] = e_criativos

def e_crm(s):
    s = s.replace('<g transform="rotate(-10 207 235)">', '<g class="move"><g transform="rotate(-10 207 235)">', 1)
    a = s.index('<g class="move">'); inner = s.index('<g transform="rotate(-10 207 235)">', a); b = end_of_element(s, inner)
    s = s[:b] + "</g>" + s[b:]
    s = cls(s, '<path d="M296 83 Q307 80', "tw")
    return s, ".move{animation:move 6s cubic-bezier(.5,0,.2,1) infinite}@keyframes move{0%,12%{transform:translate(-86px,-40px)}35%,62%{transform:translate(0,0)}85%,100%{transform:translate(86px,-40px);opacity:1}}.tw{transform-box:fill-box;transform-origin:center;animation:tw 2.8s ease-in-out infinite}@keyframes tw{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(.65) rotate(45deg);opacity:.5}}"
E["crm-automacao-ia"] = e_crm

def e_delivery(s):
    s = s.replace('<circle cx="0" cy="0" r="66"', '<circle class="ring" cx="0" cy="0" r="66"').replace('<circle cx="0" cy="0" r="41"', '<circle class="ring r2" cx="0" cy="0" r="41"')
    s = wrap(s, '<path d="M195 70C165 70', 'cx="195" cy="119"', '<g class="drop">')
    s = wrap(s, '<path d="M274 256l23-12', '<path d="M274 256l23-12', '<g class="f2">')
    return s, ".ring{transform-origin:0 0;animation:ring 3.2s ease-out infinite}.r2{animation-delay:-1.6s}@keyframes ring{0%{transform:scale(.45);opacity:1}100%{transform:scale(1.35);opacity:0}}.drop{animation:drop 3.2s cubic-bezier(.3,0,.3,1) infinite}@keyframes drop{0%,100%{transform:translateY(0)}40%{transform:translateY(-12px)}55%{transform:translateY(2px)}65%{transform:translateY(0)}}"
E["delivery"] = e_delivery

def e_derma(s):
    s = s.replace('<circle cx="208" cy="145" r="62" fill="#151517"', '<circle cx="208" cy="145" r="62" fill="none"')
    s = wrap(s, '<g transform="rotate(-46 247 183)">', 'M171 144A37 37', '<g class="scan">')
    return s, ".scan{animation:scan 6s ease-in-out infinite}@keyframes scan{0%,100%{transform:translate(-26px,6px)}50%{transform:translate(26px,-4px)}}"
E["dermatologistas"] = e_derma

def e_funil(s):
    # esferas desenhadas ANTES do funil: ao cair, passam por trás das camadas
    balls = []
    for cx, cy in [("161", "91"), ("199", "75"), ("237", "94")]:
        a = s.index(f'<circle cx="{cx}" cy="{cy}"'); b = end_of_element(s, a)
        balls.append(s[a:b]); s = s[:a] + s[b:]
    first = s.index('<path d="M79 111H321')
    s = s[:first] + "".join(balls) + s[first:]
    for i, (cx, cy) in enumerate([("161", "91"), ("199", "75"), ("237", "94")]):
        s = cls(s, f'<circle cx="{cx}" cy="{cy}"', f"fall k{i}")
    s = cls(s, '<circle cx="200" cy="305"', "pulse")
    return s, ".fall{animation:fall 3.6s cubic-bezier(.45,0,.55,1) infinite}.k1{animation-delay:1.2s}.k2{animation-delay:2.4s}@keyframes fall{0%{transform:translateY(0);opacity:0}12%{opacity:1}70%{opacity:1}100%{transform:translateY(190px);opacity:0}}"
E["estruturacao-comercial"] = e_funil

def e_google(s):
    # separa o "texto digitado" e o cursor; resultados entram em sequência
    s = s.replace('<path d="M104 139l8 8M125 115V153M144 134H279" fill="none" stroke="#ffffff" stroke-opacity="0.48" stroke-width="2.4"/>',
                  '<path d="M104 139l8 8M125 115V153" fill="none" stroke="#ffffff" stroke-opacity="0.48" stroke-width="2.4"/>'
                  '<path class="type" d="M144 134H279" fill="none" stroke="#ffffff" stroke-opacity="0.48" stroke-width="2.4"/>'
                  '<path class="caret" d="M286 122V146" fill="none" stroke="#ffffff" stroke-opacity="0.8" stroke-width="2"/>')
    for i, y in enumerate(["188", "223", "258"]):
        x = ["89", "94", "99"][i]; txt = ["M132 201", "M137 236", "M142 271"][i]
        s = wrap(s, f'<rect x="{x}" y="{y}"', txt, f'<g class="row" style="animation-delay:{0.5+i*0.15:.2f}s">')
    s = cls(s, '<rect x="102" y="196"', "pulse")
    return s, ".type{transform-box:fill-box;transform-origin:0 50%;animation:type 5s steps(18,end) infinite}@keyframes type{0%{transform:scaleX(0)}40%,100%{transform:scaleX(1)}}.caret{animation:blink 1s steps(1) infinite}.row{animation:row 5s cubic-bezier(.2,0,0,1) infinite}@keyframes row{0%,38%{transform:translateY(10px);opacity:0}52%,100%{transform:none;opacity:1}}"
E["google-ads"] = e_google

def e_carro(s):
    # chave: troca por chave de presença com argola, que balança
    a = s.index('<g transform="rotate(-19 275 107)">'); b = end_of_element(s, a)
    fob = ('<g class="swing">'
           '<circle cx="302" cy="78" r="11" fill="none" stroke="#ffffff" stroke-opacity="0.55" stroke-width="2"/>'
           '<rect x="297" y="87" width="10" height="9" rx="3" fill="url(#face)" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.3"/>'
           '<g transform="translate(4 5)"><rect x="284" y="95" width="36" height="56" rx="16" fill="url(#edge)" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1.3"/></g>'
           '<rect x="284" y="95" width="36" height="56" rx="16" fill="url(#face)" stroke="#ffffff" stroke-opacity="0.55" stroke-width="1.3"/>'
           '<rect x="291" y="104" width="22" height="38" rx="10" fill="#0A0A0B" stroke="#ffffff" stroke-opacity="0.18" stroke-width="1.2"/>'
           '<circle cx="302" cy="115" r="5" fill="#C8F53C"/>'
           '<circle cx="302" cy="130" r="4" fill="none" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.2"/>'
           '</g>')
    s = s[:a] + fob + s[b:]
    # rodas com raios girando; carroceria "respira"; faixa da pista corre
    for cx in ["126", "278"]:
        hub = f'<circle cx="{cx}" cy="241" r="10"'
        a = s.index(hub); b = end_of_element(s, a)
        import math
        c = int(cx); segs = []
        for k in range(5):
            ang = math.radians(k * 72 - 90)
            x1, y1 = c + math.cos(ang) * 12.5, 241 + math.sin(ang) * 12.5
            x2, y2 = c + math.cos(ang) * 20.5, 241 + math.sin(ang) * 20.5
            segs.append(f"M{x1:.1f} {y1:.1f}L{x2:.1f} {y2:.1f}")
        spokes = f'<g class="wheel" style="transform-origin:{cx}px 241px"><path d="{"".join(segs)}" fill="none" stroke="#ffffff" stroke-opacity="0.38" stroke-width="1.6"/></g>'
        s = s[:b] + spokes + s[b:]
    s = wrap(s, '<g transform="translate(0 7)"><path d="M73 238', 'M137 183l25-28', '<g class="bob">')
    road = '<path class="road" d="M52 273H348" fill="none" stroke="#ffffff" stroke-opacity="0.16" stroke-width="2" stroke-dasharray="16 12"/>'
    s = s.replace('<g class="bob">', road + '<g class="bob">', 1)
    return s, ".swing{transform-origin:302px 67px;animation:swing 3.6s ease-in-out infinite}@keyframes swing{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg)}}.wheel{animation:spin 1.6s linear infinite}.bob{animation:bob 1.6s ease-in-out infinite}@keyframes bob{50%{transform:translateY(-1.5px)}}.road{animation:road .8s linear infinite}@keyframes road{to{stroke-dashoffset:28}}"
E["intermediacao-e-revendas"] = e_carro

def e_landing(s):
    s = cls(s, '<rect x="119" y="189"', "cta")
    for i, x in enumerate(["99", "178", "257"]):
        s = cls(s, f'<rect x="{x}" y="257"', f"card c{i}")
    cursor = '<path class="cur" d="M168 214l0 30 8-8 7 15 7-3-7-15 11-1Z" fill="#ffffff" fill-opacity="0.92" stroke="#0A0A0B" stroke-width="1.2"/>'
    s = s.replace("</svg>", cursor + "\n</svg>")
    return s, ".cta{transform-box:fill-box;transform-origin:center;animation:cta 4.5s ease-in-out infinite}@keyframes cta{0%,52%,64%,100%{transform:scale(1)}58%{transform:scale(.92)}}.cur{animation:cur 4.5s cubic-bezier(.4,0,.2,1) infinite}@keyframes cur{0%,100%{transform:translate(70px,60px);opacity:0}15%{opacity:1}50%,66%{transform:translate(0,0)}58%{transform:translate(0,0) scale(.9)}85%{opacity:1}}.card{animation:f 6s ease-in-out infinite}.c1{animation-delay:-2s}.c2{animation-delay:-4s}"
E["landing-pages"] = e_landing

def e_legal(s):
    s = wrap(s, '<g transform="translate(8 5)">', 'M155 194l31 31', '<g class="f">')
    s = s.replace('<path d="M155 194l31 31 59-66" fill="none" stroke="#C8F53C"', '<path class="chk" pathLength="1" d="M155 194l31 31 59-66" fill="none" stroke="#C8F53C"')
    s = s.replace('<path d="M155 197l31 31 59-66" fill="none" stroke="#000"', '<path class="chk" pathLength="1" d="M155 197l31 31 59-66" fill="none" stroke="#000"')
    return s, ".chk{stroke-dasharray:1;animation:draw 4s cubic-bezier(.2,0,0,1) infinite}"
E["legal"] = e_legal

def e_meta(s):
    s = wrap(s, '<g transform="rotate(-10 200 200)">', '<g transform="rotate(-10 200 200)">', '<g class="f">')
    s = wrap(s, '<rect x="175" y="116"', 'M220 173h35', '<g class="feed">')
    s = cls(s, '<path d="M263 211C253 192', "heart")
    return s, ".feed{animation:feed 5s cubic-bezier(.5,0,.2,1) infinite}@keyframes feed{0%,30%{transform:translateY(0)}45%,80%{transform:translateY(-10px)}100%{transform:translateY(0)}}.heart{transform-box:fill-box;transform-origin:center;animation:heart 2.5s ease-in-out infinite}@keyframes heart{0%,40%,100%{transform:scale(1)}10%{transform:scale(1.22)}20%{transform:scale(.96)}28%{transform:scale(1.1)}}"
E["meta-ads"] = e_meta

def e_metodologia(s):
    # redesenho: cinco marcos em degrau ligados por um arco; ponto percorre o caminho
    head = s[: s.index("</defs>") + 7]
    tail_glow = '<circle cx="200" cy="192" r="179" fill="url(#glow)"/>\n  <ellipse cx="204" cy="319" rx="143" ry="25" fill="url(#shadow)"/>'
    steps = [(86, 276, 25), (144, 240, 27), (202, 204, 29), (260, 168, 31), (318, 132, 33)]
    parts = []
    for i, (x, y, rx) in enumerate(steps):
        ry = rx * 0.38; h = 12 + i * 4
        parts.append(
            f'<g class="st" style="animation-delay:{i*0.5:.1f}s">'
            f'<path d="M{x-rx} {y}V{y+h}A{rx} {ry:.1f} 0 0 0 {x+rx} {y+h}V{y}" fill="url(#edge)" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.3"/>'
            f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry:.1f}" fill="url(#face)" stroke="#ffffff" stroke-opacity="0.62" stroke-width="1.3"/>'
            f'<ellipse cx="{x}" cy="{y}" rx="{rx*0.55:.1f}" ry="{ry*0.55:.1f}" fill="none" stroke="#ffffff" stroke-opacity="0.22" stroke-width="1.2"/>'
            f'</g>')
    arc = "M86 276C110 258 122 250 144 240S180 216 202 204S238 180 260 168S296 144 318 132"
    body = (tail_glow +
            f'<path d="{arc}" fill="none" stroke="#ffffff" stroke-opacity="0.38" stroke-width="1.5" stroke-dasharray="3 7"/>'
            + "".join(parts) +
            f'<circle class="rm-hide" r="7" fill="#C8F53C"><animateMotion dur="5s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;.8;1" calcMode="spline" keySplines=".4 0 .2 1;0 0 1 1" path="{arc}"/></circle>'
            f'<circle class="rm-show" cx="318" cy="132" r="7" fill="#C8F53C"/>')
    s = head + "\n  " + body + "\n</svg>"
    css = ".st ellipse:first-of-type{animation:lit 5s ease-in-out infinite;animation-delay:inherit}.st{animation-delay:inherit}@keyframes lit{0%,100%{stroke-opacity:.45}15%{stroke-opacity:1}}.rm-show{display:none}@media (prefers-reduced-motion:reduce){.rm-show{display:inline}}"
    return s, css
E["metodologia"] = e_metodologia

def e_oficina(s):
    a = s.index('<g transform="rotate(0 200 200)">')
    b0 = s.index('<circle cx="200" cy="200" r="47"'); b = end_of_element(s, b0)
    s = s[:a] + '<g class="gear">' + s[a:b] + "</g>" + s[b:]
    s = wrap(s, '<g transform="translate(4 5)"><path d="M113 270', 'M127 278L230 172', '<g class="wr">')
    return s, ".gear{transform-origin:200px 200px;animation:spin 24s linear infinite}.wr{transform-origin:200px 200px;animation:wr 3s ease-in-out infinite}@keyframes wr{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}"
E["oficinas-e-funilarias"] = e_oficina

def e_segmentos(s):
    # cada hexágono (sombra + face) sobe em onda; o central pulsa
    order = ["M248.00 109.00", "M327.00 154.00", "M327.00 246.00", "M248.00 291.00", "M169.00 246.00", "M169.00 154.00"]
    for i, d in enumerate(order):
        first = f'<g transform="translate(0 7)"><path d="{d}'
        a = s.index(first); b1 = end_of_element(s, a); b2 = end_of_element(s, b1)
        s = s[:a] + f'<g class="hx" style="animation-delay:{i*0.25:.2f}s">' + s[a:b2] + "</g>" + s[b2:]
    a = s.index('<g transform="translate(0 7)"><path d="M248.00 200.00'); b1 = end_of_element(s, a); b2 = end_of_element(s, b1)
    s = s[:a] + '<g class="pc">' + s[a:b2] + "</g>" + s[b2:]
    return s, ".pc{transform-origin:200px 200px;animation:pulse 2.6s ease-in-out infinite}.hx{animation:hx 3s ease-in-out infinite}@keyframes hx{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}"
E["segmentos"] = e_segmentos

def e_servicos(s):
    for i, (x, y) in enumerate([(200, 96), (293, 132), (316, 213), (252, 278), (148, 278), (84, 213), (107, 132)]):
        s = s.replace(f'<path d="M200 192L{x} {y}" fill="none"', f'<path class="spoke" style="animation-delay:{i*0.3:.1f}s" d="M200 192L{x} {y}" fill="none"', 1)
        s = cls(s, f'<circle cx="{x}" cy="{y}" r="13"', "node")
        s = s.replace(f'<circle class="node" cx="{x}" cy="{y}" r="13"', f'<circle class="node" style="animation-delay:{i*0.3:.1f}s" cx="{x}" cy="{y}" r="13"', 1)
    s = cls(s, '<circle cx="200" cy="192" r="28"', "pulse")
    return s, ".spoke{stroke-dasharray:4 6;animation:dash 1.6s linear infinite}.node{transform-box:fill-box;transform-origin:center;animation:node 2.1s ease-in-out infinite}@keyframes node{0%,100%{transform:scale(1)}20%{transform:scale(1.18)}40%{transform:scale(1)}}"
E["servicos"] = e_servicos

def e_sobre(s):
    d = "M91 78H145L200 159L255 78H309L228 198L311 322H257L200 238L143 322H89L172 198Z"
    s = s.replace(f'<path d="{d}" fill="url(#face)" stroke="#C8F53C" stroke-opacity="1" stroke-width="2"/>',
                  f'<path d="{d}" fill="url(#face)" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.4"/>'
                  f'<path class="trace" pathLength="1" d="{d}" fill="none" stroke="#C8F53C" stroke-width="2.2"/>')
    s = wrap(s, '<g transform="translate(9 7)">', 'M108 89H140', '<g class="f">')
    return s, ".trace{stroke-dasharray:.22 .78;animation:trace 6s linear infinite}@keyframes trace{to{stroke-dashoffset:-1}}@media (prefers-reduced-motion:reduce){.trace{stroke-dasharray:none}}"
E["sobre"] = e_sobre

def e_trafego(s):
    s = s.replace('<path d="M200 193V72A121 121 0 0 1 285 107Z" fill="#fff"', '<path class="sweep" d="M200 193V72A121 121 0 0 1 285 107Z" fill="#fff"')
    s = cls(s, '<circle cx="200" cy="193" r="9"', "pulse")
    s = cls(s, '<circle cx="251" cy="146" r="3"', "blip")
    s = cls(s, '<circle cx="146" cy="231" r="3"', "blip b2")
    return s, ".sweep{transform-origin:200px 193px;animation:spin 5s linear infinite}.blip{transform-box:fill-box;transform-origin:center;animation:blip 5s ease-out infinite;animation-delay:.6s}.b2{animation-delay:3.1s}@keyframes blip{0%{transform:scale(1);opacity:.5}6%{transform:scale(2.4);opacity:1}40%,100%{transform:scale(1);opacity:.5}}"
E["trafego-pago"] = e_trafego

for f in sorted(os.listdir(src)):
    if not f.endswith(".svg"): continue
    key = f[:-4]
    s = open(os.path.join(src, f)).read()
    if key in E:
        s, css = E[key](s)
    else:
        css = ""
    s = finish(s, css)
    s = occlude(s)
    open(os.path.join(out, f), "w").write(s)
    print("ok", key, len(s))
