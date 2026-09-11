import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = dirname(fileURLToPath(import.meta.url));

const LOGOS = JSON.parse(readFileSync(join(OUT, '..', 'src', 'data', 'pixel-logos.json'), 'utf8'));

const IMAGE_LOGOS_DIR = join(OUT, '..', 'src', 'assets', 'logos');

const IMAGE_LOGO_DATA = Object.fromEntries(
  readdirSync(IMAGE_LOGOS_DIR)
    .filter((file) => extname(file) === '.png')
    .map((file) => [file.slice(0, -extname(file).length), readFileSync(join(IMAGE_LOGOS_DIR, file)).toString('base64')])
);

function logo(name, size, overrides) {
  if (IMAGE_LOGO_DATA[name]) {
    return '<img src="data:image/png;base64,' + IMAGE_LOGO_DATA[name] +
      '" width="' + size + '" height="' + size + '" alt="" style="display:block;flex-shrink:0">';
  }
  const def = LOGOS[name];
  if (!def) throw new Error('unknown logo: ' + name);
  const palette = Object.assign({}, def.palette, overrides || {});
  const byColor = new Map();

  def.map.forEach((row, y) => {
    if (row.length !== 16) throw new Error(name + ' row ' + y + ' is ' + row.length + ' wide, expected 16');
    let x = 0;
    while (x < 16) {
      const ch = row[x];
      if (ch === '.') { x += 1; continue; }
      const color = palette[ch];
      if (!color) throw new Error(name + ' has no color for "' + ch + '"');
      let run = 1;
      while (x + run < 16 && row[x + run] === ch) run += 1;
      if (!byColor.has(color)) byColor.set(color, []);
      byColor.get(color).push('M' + x + ' ' + y + 'h' + run + 'v1h-' + run + 'z');
      x += run;
    }
  });

  const paths = [...byColor.entries()]
    .map(([color, segs]) => '<path fill="' + color + '" d="' + segs.join('') + '"/>')
    .join('');

  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 16 16" shape-rendering="crispEdges" style="display:block;flex-shrink:0">' + paths + '</svg>';
}

const INK = '#1d1d1f';
const BLUE = '#0066cc';
const SKY = '#2997ff';
const PARCHMENT = '#f5f5f7';
const TILE = '#272729';
const TILE3 = '#252527';
const MUTED = '#7a7a7a';

const F_PIXEL = "'Press Start 2P', ui-monospace, monospace";
const F_LABEL = "Silkscreen, ui-monospace, monospace";
const F_BODY = "VT323, ui-monospace, monospace";

function dither(base, check) {
  return '<div style="height:10px;background-color:' + base +
    ';background-image:linear-gradient(45deg,' + check + ' 25%,transparent 25%,transparent 75%,' + check + ' 75%),linear-gradient(45deg,' + check + ' 25%,transparent 25%,transparent 75%,' + check + ' 75%);background-size:10px 10px;background-position:0 0,5px 5px"></div>';
}

function chip(logoName, label, dark, overrides) {
  const border = dark ? '#4a4a4c' : INK;
  const bg = dark ? '#1d1d1f' : '#ffffff';
  const fg = dark ? '#ffffff' : INK;
  const shadow = dark ? '#000000' : INK;
  return '<span style="display:inline-flex;align-items:center;gap:6px;background:' + bg +
    ';border:2px solid ' + border + ';box-shadow:2px 2px 0 ' + shadow +
    ';padding:5px 8px;font-family:' + F_LABEL + ';font-size:11px;color:' + fg + '">' +
    logo(logoName, 16, overrides) + label + '</span>';
}

function chipRow(items, dark) {
  return '<div style="display:flex;flex-wrap:wrap;gap:8px">' +
    items.map((it) => chip(it[0], it[1], dark, it[2])).join('') + '</div>';
}

const AVANGENIO_CHIPS = [
  ['nextjs', 'Next.js 16'],
  ['react', 'React 19'],
  ['tailwind', 'Tailwind 4'],
  ['turborepo', 'Turborepo'],
  ['zod', 'Zod'],
  ['generic', 'Keycloak'],
];

const CUJAE_CHIPS = [
  ['spring', 'Spring Boot 3.4'],
  ['java', 'Java 21'],
  ['mariadb', 'MariaDB'],
  ['liquibase', 'Liquibase'],
  ['docker', 'Docker'],
  ['nginx', 'Nginx'],
];

const PROJECT_CHIPS = [
  ['hono', 'Hono'],
  ['vercel', 'Vercel AI SDK', { k: '#ffffff' }],
  ['mcp-on-dark', 'MCP'],
  ['sqlite', 'SQLite'],
  ['drizzle', 'Drizzle'],
  ['typescript', 'TypeScript'],
];

const STACK_GRID = [
  ['typescript', 'TypeScript'],
  ['java', 'Java'],
  ['react', 'React'],
  ['nextjs', 'Next.js'],
  ['tailwind', 'Tailwind'],
  ['spring', 'Spring Boot'],
  ['nestjs', 'NestJS'],
  ['postgres', 'PostgreSQL'],
  ['mariadb', 'MariaDB'],
  ['docker', 'Docker'],
  ['nginx', 'Nginx'],
  ['github-actions', 'GH Actions'],
];

function stackGrid(cols, iconSize) {
  const cells = STACK_GRID.map(
    (it) =>
      '<div style="display:flex;flex-direction:column;align-items:center;gap:8px;background:#ffffff;border:2px solid ' +
      INK + ';box-shadow:3px 3px 0 ' + INK + ';padding:14px 8px">' +
      logo(it[0], iconSize) +
      '<span style="font-family:' + F_LABEL + ';font-size:10px;color:' + INK + ';text-align:center;line-height:1.3">' +
      it[1] + '</span></div>'
  ).join('');
  return '<div style="display:grid;grid-template-columns:repeat(' + cols +
    ', minmax(0, 1fr));gap:12px">' + cells + '</div>';
}

function pixelBox(inner, dark) {
  const border = dark ? '#4a4a4c' : INK;
  const bg = dark ? '#1d1d1f' : '#ffffff';
  const shadow = dark ? '#000000' : INK;
  return '<div style="background:' + bg + ';border:3px solid ' + border +
    ';box-shadow:5px 5px 0 ' + shadow + ';padding:20px">' + inner + '</div>';
}

function button(labelHole, primary, dark) {
  const bg = primary ? BLUE : 'transparent';
  const fg = primary ? '#ffffff' : (dark ? SKY : BLUE);
  const border = dark ? '#ffffff' : INK;
  const shadow = dark ? '#000000' : INK;
  return '<span style="display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 18px;background:' +
    bg + ';color:' + fg + ';border:3px solid ' + border + ';box-shadow:4px 4px 0 ' + shadow +
    ';font-family:' + F_PIXEL + ';font-size:10px;line-height:1.6">' + labelHole + '</span>';
}

const HEAD = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&family=VT323&display=swap">
  <style>
    body { margin: 0; }
    a { color: ${BLUE}; text-decoration: none; }
    a:hover { color: #0071e3; }
    svg { image-rendering: pixelated; }
  </style>
</helmet>`;

const LOGIC = (w, h) => `<script data-dc-script data-props='{"$preview":{"width":${w},"height":${h}}}'>
var PILL_BASE = 'display:flex;align-items:center;justify-content:center;font-family:${F_LABEL};font-size:12px;border:2px solid #ffffff;cursor:pointer;';
var PILL_ON = PILL_BASE + 'background:#0066cc;color:#ffffff;box-shadow:2px 2px 0 #000000;';
var PILL_OFF = PILL_BASE + 'background:#1d1d1f;color:#7a7a7a;box-shadow:2px 2px 0 #000000;';

var COPY = {
  es: {
    navExp: 'EXPERIENCIA',
    navProj: 'PROYECTOS',
    navStack: 'STACK',
    navContact: 'CONTACTO',
    heroKicker: 'LA HABANA, CUBA / REMOTO',
    heroFullName: 'Eduardo Marcelo Mazzola Fernandez',
    heroTagline: 'Construyo interfaces dentro de arquitecturas de micro-frontends, con recorrido full stack en Spring Boot y Clean Architecture.',
    ctaPrimary: 'VER PROYECTOS',
    ctaSecondary: 'DESCARGAR CV',
    expKicker: 'TRAYECTORIA',
    expHead: 'DONDE HE TRABAJADO',
    role1: 'DESARROLLADOR FRONTEND',
    period1: '[MES AAAA - ACTUAL]',
    body1: 'Frontend de eTravelBeyond, plataforma de viajes con micro-frontends Multi-Zones sobre un monorepo TypeScript. Paquetes internos de UI, autenticacion y navegacion compartidos entre aplicaciones, SSO con Keycloak y feature flags para liberar por partes.',
    role2: 'PROGRAMADOR FULL STACK',
    period2: '[MES AAAA - MES AAAA]',
    body2: 'Sobrecarga Docente, sistema de gestion de carga academica del profesorado, construido de extremo a extremo: Clean Architecture en el backend, migraciones versionadas y la aplicacion completa empaquetada en contenedores.',
    projKicker: 'PROYECTO PROPIO',
    projBody: 'Linea de comandos que orquesta modelos de lenguaje ejecutandose 100 % en local, sin depender de APIs externas. Model Context Protocol para exponer herramientas al modelo, persistencia en SQLite y una interfaz de terminal propia.',
    projLink: 'VER EL REPOSITORIO',
    stackKicker: 'HERRAMIENTAS',
    stackHead: 'CON QUE CONSTRUYO',
    eduKicker: 'FORMACION',
    eduDegree: 'INGENIERIA INFORMATICA',
    eduSchool: 'Universidad Tecnologica de La Habana Jose Antonio Echeverria',
    eduYear: '[ANO DE GRADUACION]',
    awardKicker: 'RECONOCIMIENTO',
    awardTitle: '3.er LUGAR - COPA EULER 2025',
    awardWhere: 'Hackathon celebrado en la CUJAE',
    awardTitle2: 'IPBC CARIBBEAN QUALIFIER 2025',
    awardWhere2: 'Participacion en el IPBC Caribbean Qualifier 2025',
    awardTitle3: 'UNESCO YOUTH HACKATHON 2025',
    awardWhere3: 'Participacion en la UNESCO Youth Hackathon 2025',
    contactKicker: 'CONTACTO',
    contactHead: 'HABLEMOS DE TU PROXIMO PRODUCTO',
    labelEmail: 'CORREO',
    labelPhone: 'TELEFONO',
    labelLangs: 'IDIOMAS',
    langsValue: 'Espanol nativo / Ingles B1',
    contactCta: 'ESCRIBEME',
    footerLocation: 'La Habana, Cuba / Disponible en remoto',
    footerLegal: 'Ultima actualizacion: [FECHA]'
  },
  en: {
    navExp: 'EXPERIENCE',
    navProj: 'PROJECTS',
    navStack: 'STACK',
    navContact: 'CONTACT',
    heroKicker: 'HAVANA, CUBA / REMOTE',
    heroFullName: 'Eduardo Marcelo Mazzola Fernandez',
    heroTagline: 'I build interfaces inside micro-frontend architectures, with full stack experience in Spring Boot and Clean Architecture.',
    ctaPrimary: 'SEE PROJECTS',
    ctaSecondary: 'DOWNLOAD CV',
    expKicker: 'TRACK RECORD',
    expHead: 'WHERE I HAVE WORKED',
    role1: 'FRONTEND DEVELOPER',
    period1: '[MONTH YYYY - PRESENT]',
    body1: 'Frontend for eTravelBeyond, a travel platform built on Multi-Zones micro-frontends inside a TypeScript monorepo. Shared internal packages for UI, authentication and navigation across apps, SSO through Keycloak, and feature flags for staged releases.',
    role2: 'FULL STACK DEVELOPER',
    period2: '[MONTH YYYY - MONTH YYYY]',
    body2: 'Sobrecarga Docente, an academic workload management system for university faculty, built end to end: Clean Architecture on the backend, versioned migrations, and the whole application shipped in containers.',
    projKicker: 'PERSONAL PROJECT',
    projBody: 'A command-line tool that orchestrates language models running entirely on the local machine, with no external APIs. Model Context Protocol exposes tools to the model, SQLite handles persistence, and it ships with its own terminal interface.',
    projLink: 'VIEW THE REPOSITORY',
    stackKicker: 'TOOLING',
    stackHead: 'WHAT I BUILD WITH',
    eduKicker: 'EDUCATION',
    eduDegree: 'COMPUTER ENGINEERING',
    eduSchool: 'Universidad Tecnologica de La Habana Jose Antonio Echeverria',
    eduYear: '[GRADUATION YEAR]',
    awardKicker: 'RECOGNITION',
    awardTitle: '3RD PLACE - COPA EULER 2025',
    awardWhere: 'Hackathon held at CUJAE',
    awardTitle2: 'IPBC CARIBBEAN QUALIFIER 2025',
    awardWhere2: 'Participation in the IPBC Caribbean Qualifier 2025',
    awardTitle3: 'UNESCO YOUTH HACKATHON 2025',
    awardWhere3: 'Participation in the UNESCO Youth Hackathon 2025',
    contactKicker: 'CONTACT',
    contactHead: 'LET US TALK ABOUT YOUR NEXT PRODUCT',
    labelEmail: 'EMAIL',
    labelPhone: 'PHONE',
    labelLangs: 'LANGUAGES',
    langsValue: 'Native Spanish / English B1',
    contactCta: 'GET IN TOUCH',
    footerLocation: 'Havana, Cuba / Available for remote work',
    footerLegal: 'Last updated: [DATE]'
  }
};

class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { lang: 'es' };
  }
  renderVals() {
    var lang = this.state.lang === 'en' ? 'en' : 'es';
    var self = this;
    return {
      t: COPY[lang],
      esStyle: lang === 'es' ? PILL_ON : PILL_OFF,
      enStyle: lang === 'en' ? PILL_ON : PILL_OFF,
      setEs: function () { self.setState({ lang: 'es' }); },
      setEn: function () { self.setState({ lang: 'en' }); }
    };
  }
}
</script>
</body>
</html>
`;

function kicker(hole, dark) {
  return '<div style="font-family:' + F_LABEL + ';font-size:11px;letter-spacing:0.06em;color:' +
    (dark ? '#cccccc' : MUTED) + ';margin-bottom:14px">' + hole + '</div>';
}

function heading(hole, size, dark) {
  return '<h2 style="font-family:' + F_PIXEL + ';font-size:' + size +
    'px;font-weight:400;line-height:1.5;margin:0 0 26px;color:' +
    (dark ? '#ffffff' : INK) + '">' + hole + '</h2>';
}

function body(hole, dark, size) {
  return '<p style="font-family:' + F_BODY + ';font-size:' + (size || 20) +
    'px;line-height:1.35;margin:0;color:' + (dark ? '#cccccc' : '#333333') + '">' + hole + '</p>';
}

function expCard(company, roleHole, periodHole, bodyHole, chips, nameSize) {
  return pixelBox(
    '<div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">' +
      '<span style="font-family:' + F_PIXEL + ';font-size:' + nameSize + 'px;line-height:1.5;color:' + INK + '">' + company + '</span>' +
      '<span style="font-family:' + F_LABEL + ';font-size:11px;color:' + BLUE + '">' + roleHole + '</span>' +
      '<span style="font-family:' + F_LABEL + ';font-size:10px;color:' + MUTED + '">' + periodHole + '</span>' +
    '</div>' +
    body(bodyHole, false) +
    '<div style="margin-top:20px">' + chipRow(chips, false) + '</div>',
    false
  );
}

function awardList(bodySize, titleSize) {
  const size = titleSize || 11;
  const items = [
    ['{{t.awardTitle}}', '{{t.awardWhere}}'],
    ['{{t.awardTitle2}}', '{{t.awardWhere2}}'],
    ['{{t.awardTitle3}}', '{{t.awardWhere3}}'],
  ];
  return kicker('{{t.awardKicker}}', false) +
    '<div style="display:flex;flex-direction:column;gap:14px">' +
    items
      .map(
        (item, i) =>
          '<div style="' + (i > 0 ? 'padding-top:14px;border-top:2px solid #e0e0e0;' : '') + '">' +
          '<div style="font-family:' + F_PIXEL + ';font-size:' + size + 'px;line-height:1.6;color:' + INK + ';margin-bottom:12px">' + item[0] + '</div>' +
          body(item[1], false, bodySize) +
          '</div>'
      )
      .join('') +
    '</div>';
}

const GITHUB_LABEL = 'github.com/Marceloski1';
const LINKEDIN_LABEL = 'linkedin.com/in/marcelo-mazzola-b4a33b2a1';
const PROJECT_REPO_URL = 'https://github.com/Marceloski1/my-local-code';

function contactRows(valueSize) {
  const rows = [
    ['{{t.labelEmail}}', 'pendragonn89@gmail.com', SKY, F_BODY, valueSize],
    ['{{t.labelPhone}}', '+53 55393216', '#ffffff', F_BODY, valueSize],
    ['GITHUB', GITHUB_LABEL, SKY, F_LABEL, 10],
    ['LINKEDIN', LINKEDIN_LABEL, SKY, F_LABEL, 10],
    ['{{t.labelLangs}}', '{{t.langsValue}}', '#ffffff', F_BODY, valueSize],
  ];
  return rows
    .map(
      (r) =>
        '<div style="display:flex;align-items:baseline;justify-content:space-between;gap:14px;padding:13px 0;border-bottom:2px solid #3a3a3c">' +
        '<span style="font-family:' + F_LABEL + ';font-size:10px;color:#cccccc">' + r[0] + '</span>' +
        '<span style="font-family:' + r[3] + ';font-size:' + r[4] + 'px;color:' + r[2] + ';text-align:right">' + r[1] + '</span>' +
        '</div>'
    )
    .join('');
}

function mobile() {
  return HEAD + `
<div style="width:390px;min-height:3400px;background:${PARCHMENT};font-family:${F_BODY};color:${INK}">

  <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;background:#000000;padding:6px 14px;min-height:56px;box-sizing:border-box">
    <span style="font-family:${F_PIXEL};font-size:12px;color:#ffffff">EMMF</span>
    <div style="display:flex;align-items:center;gap:8px">
      <span style="{{esStyle}}min-height:44px;padding:0 13px" onClick="{{setEs}}">ES</span>
      <span style="{{enStyle}}min-height:44px;padding:0 13px" onClick="{{setEn}}">EN</span>
      <span style="display:flex;align-items:center;justify-content:center;min-height:44px;padding:0 11px;border:2px dashed #4a4a4c;font-family:${F_LABEL};font-size:12px;color:${MUTED}">+</span>
    </div>
  </div>

  ${dither(TILE, '#000000')}

  <div style="background:${TILE};padding:44px 22px 52px;color:#ffffff">
    ${kicker('{{t.heroKicker}}', true)}
    <h1 style="font-family:${F_PIXEL};font-size:26px;font-weight:400;line-height:1.35;margin:0 0 16px;color:#ffffff">EDUARDO<br>MAZZOLA</h1>
    <div style="font-family:${F_LABEL};font-size:11px;color:#cccccc;margin-bottom:22px">{{t.heroFullName}}</div>
    <p style="font-family:${F_BODY};font-size:21px;line-height:1.35;margin:0 0 30px;color:#ffffff">{{t.heroTagline}}</p>
    <div style="display:flex;flex-wrap:wrap;gap:14px">
      ${button('{{t.ctaPrimary}}', true, true)}
      ${button('{{t.ctaSecondary}}', false, true)}
    </div>
  </div>

  ${dither(PARCHMENT, TILE)}

  <div style="background:${PARCHMENT};padding:52px 22px">
    ${kicker('{{t.expKicker}}', false)}
    ${heading('{{t.expHead}}', 15, false)}
    <div style="display:flex;flex-direction:column;gap:22px">
      ${expCard('AVANGENIO', '{{t.role1}}', '{{t.period1}}', '{{t.body1}}', AVANGENIO_CHIPS, 13)}
      ${expCard('CUJAE', '{{t.role2}}', '{{t.period2}}', '{{t.body2}}', CUJAE_CHIPS, 13)}
    </div>
  </div>

  ${dither(TILE, PARCHMENT)}

  <div style="background:${TILE};padding:52px 22px;color:#ffffff">
    ${kicker('{{t.projKicker}}', true)}
    <h2 style="font-family:${F_PIXEL};font-size:15px;font-weight:400;line-height:1.5;margin:0 0 20px;color:#ffffff">LOCAL AI<br>CODING AGENT</h2>
    ${body('{{t.projBody}}', true)}
    <div style="margin:24px 0 28px">${chipRow(PROJECT_CHIPS, true)}</div>
    <a href="${PROJECT_REPO_URL}" target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;gap:8px;font-family:${F_LABEL};font-size:12px;color:${SKY}">{{t.projLink}}
      <svg width="12" height="12" viewBox="0 0 12 12" shape-rendering="crispEdges" style="display:block"><path fill="${SKY}" d="M2 0h2v2H2zM4 2h2v2H4zM6 4h2v2H6zM6 6h2v2H6zM4 8h2v2H4zM2 10h2v2H2z"/></svg>
    </a>
  </div>

  ${dither('#ffffff', TILE)}

  <div style="background:#ffffff;padding:52px 22px">
    ${kicker('{{t.stackKicker}}', false)}
    ${heading('{{t.stackHead}}', 15, false)}
    ${stackGrid(3, 26)}

    <div style="margin-top:34px;display:flex;flex-direction:column;gap:18px">
      ${pixelBox(
        kicker('{{t.eduKicker}}', false) +
        '<div style="font-family:' + F_PIXEL + ';font-size:11px;line-height:1.6;color:' + INK + ';margin-bottom:12px">{{t.eduDegree}}</div>' +
        body('{{t.eduSchool}}', false, 19) +
        '<div style="font-family:' + F_LABEL + ';font-size:10px;color:' + MUTED + ';margin-top:12px">{{t.eduYear}}</div>',
        false
      )}
      ${pixelBox(awardList(19), false)}
    </div>
  </div>

  ${dither(TILE3, '#ffffff')}

  <div style="background:${TILE3};padding:52px 22px;color:#ffffff">
    ${kicker('{{t.contactKicker}}', true)}
    <h2 style="font-family:${F_PIXEL};font-size:15px;font-weight:400;line-height:1.55;margin:0 0 28px;color:#ffffff">{{t.contactHead}}</h2>
    <div style="margin-bottom:32px">${contactRows(20)}</div>
    ${button('{{t.contactCta}}', true, true)}
  </div>

  ${dither(PARCHMENT, TILE3)}

  <div style="background:${PARCHMENT};padding:36px 22px">
    <div style="font-family:${F_PIXEL};font-size:10px;line-height:1.7;color:${INK};margin-bottom:12px">EDUARDO MAZZOLA</div>
    <div style="font-family:${F_LABEL};font-size:11px;color:${MUTED};margin-bottom:20px">{{t.footerLocation}}</div>
    <div style="height:3px;background:${INK};margin-bottom:18px"></div>
    <div style="font-family:${F_LABEL};font-size:10px;color:${MUTED}">{{t.footerLegal}}</div>
  </div>

</div>
</x-dc>
` + LOGIC(390, 3400);
}

function desktop() {
  const navLink = (hole) =>
    '<span style="font-family:' + F_LABEL + ';font-size:12px;color:#ffffff">' + hole + '</span>';

  return HEAD + `
<div style="width:1440px;min-height:3200px;background:${PARCHMENT};font-family:${F_BODY};color:${INK}">

  <div style="display:flex;align-items:center;justify-content:space-between;gap:24px;background:#000000;padding:10px 40px;box-sizing:border-box">
    <div style="display:flex;align-items:center;gap:30px">
      <span style="font-family:${F_PIXEL};font-size:13px;color:#ffffff">EMMF</span>
      ${navLink('{{t.navExp}}')}
      ${navLink('{{t.navProj}}')}
      ${navLink('{{t.navStack}}')}
      ${navLink('{{t.navContact}}')}
    </div>
    <div style="display:flex;align-items:center;gap:8px">
      <span style="{{esStyle}}height:34px;padding:0 12px" onClick="{{setEs}}">ES</span>
      <span style="{{enStyle}}height:34px;padding:0 12px" onClick="{{setEn}}">EN</span>
      <span style="display:flex;align-items:center;justify-content:center;height:34px;padding:0 10px;border:2px dashed #4a4a4c;font-family:${F_LABEL};font-size:12px;color:${MUTED}">+</span>
    </div>
  </div>

  ${dither(TILE, '#000000')}

  <div style="background:${TILE};padding:72px 40px 80px;color:#ffffff">
    <div style="max-width:1080px;margin:0 auto">
      ${kicker('{{t.heroKicker}}', true)}
      <h1 style="font-family:${F_PIXEL};font-size:48px;font-weight:400;line-height:1.35;margin:0 0 22px;color:#ffffff">EDUARDO<br>MAZZOLA</h1>
      <div style="font-family:${F_LABEL};font-size:14px;color:#cccccc;margin-bottom:26px">{{t.heroFullName}}</div>
      <p style="font-family:${F_BODY};font-size:27px;line-height:1.3;margin:0 0 36px;max-width:760px;color:#ffffff">{{t.heroTagline}}</p>
      <div style="display:flex;flex-wrap:wrap;gap:18px">
        ${button('{{t.ctaPrimary}}', true, true)}
        ${button('{{t.ctaSecondary}}', false, true)}
      </div>
    </div>
  </div>

  ${dither(PARCHMENT, TILE)}

  <div style="background:${PARCHMENT};padding:72px 40px">
    <div style="max-width:1080px;margin:0 auto">
      ${kicker('{{t.expKicker}}', false)}
      ${heading('{{t.expHead}}', 22, false)}
      <div style="display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:26px">
        ${expCard('AVANGENIO', '{{t.role1}}', '{{t.period1}}', '{{t.body1}}', AVANGENIO_CHIPS, 16)}
        ${expCard('CUJAE', '{{t.role2}}', '{{t.period2}}', '{{t.body2}}', CUJAE_CHIPS, 16)}
      </div>
    </div>
  </div>

  ${dither(TILE, PARCHMENT)}

  <div style="background:${TILE};padding:72px 40px;color:#ffffff">
    <div style="max-width:1080px;margin:0 auto">
      ${kicker('{{t.projKicker}}', true)}
      <h2 style="font-family:${F_PIXEL};font-size:22px;font-weight:400;line-height:1.5;margin:0 0 24px;color:#ffffff">LOCAL AI CODING AGENT</h2>
      <div style="max-width:760px">${body('{{t.projBody}}', true, 22)}</div>
      <div style="margin:28px 0 32px">${chipRow(PROJECT_CHIPS, true)}</div>
      <a href="${PROJECT_REPO_URL}" target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;gap:8px;font-family:${F_LABEL};font-size:13px;color:${SKY}">{{t.projLink}}
        <svg width="12" height="12" viewBox="0 0 12 12" shape-rendering="crispEdges" style="display:block"><path fill="${SKY}" d="M2 0h2v2H2zM4 2h2v2H4zM6 4h2v2H6zM6 6h2v2H6zM4 8h2v2H4zM2 10h2v2H2z"/></svg>
      </a>
    </div>
  </div>

  ${dither('#ffffff', TILE)}

  <div style="background:#ffffff;padding:72px 40px">
    <div style="max-width:1080px;margin:0 auto">
      ${kicker('{{t.stackKicker}}', false)}
      ${heading('{{t.stackHead}}', 22, false)}
      ${stackGrid(6, 32)}

      <div style="margin-top:44px;display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:26px">
        ${pixelBox(
          kicker('{{t.eduKicker}}', false) +
          '<div style="font-family:' + F_PIXEL + ';font-size:14px;line-height:1.6;color:' + INK + ';margin-bottom:14px">{{t.eduDegree}}</div>' +
          body('{{t.eduSchool}}', false, 21) +
          '<div style="font-family:' + F_LABEL + ';font-size:11px;color:' + MUTED + ';margin-top:14px">{{t.eduYear}}</div>',
          false
        )}
        ${pixelBox(awardList(21, 14), false)}
      </div>
    </div>
  </div>

  ${dither(TILE3, '#ffffff')}

  <div style="background:${TILE3};padding:72px 40px;color:#ffffff">
    <div style="max-width:1080px;margin:0 auto">
      ${kicker('{{t.contactKicker}}', true)}
      <h2 style="font-family:${F_PIXEL};font-size:22px;font-weight:400;line-height:1.55;margin:0 0 36px;max-width:800px;color:#ffffff">{{t.contactHead}}</h2>
      <div style="display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:0 44px;margin-bottom:40px">${contactRows(22)}</div>
      ${button('{{t.contactCta}}', true, true)}
    </div>
  </div>

  ${dither(PARCHMENT, TILE3)}

  <div style="background:${PARCHMENT};padding:52px 40px">
    <div style="max-width:1080px;margin:0 auto">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:40px;margin-bottom:26px">
        <div>
          <div style="font-family:${F_PIXEL};font-size:12px;line-height:1.7;color:${INK};margin-bottom:12px">EDUARDO MAZZOLA</div>
          <div style="font-family:${F_LABEL};font-size:12px;color:${MUTED}">{{t.footerLocation}}</div>
        </div>
        <div style="display:flex;gap:26px">
          <span style="font-family:${F_LABEL};font-size:11px;color:#333333">{{t.navExp}}</span>
          <span style="font-family:${F_LABEL};font-size:11px;color:#333333">{{t.navProj}}</span>
          <span style="font-family:${F_LABEL};font-size:11px;color:#333333">{{t.navStack}}</span>
          <span style="font-family:${F_LABEL};font-size:11px;color:#333333">{{t.navContact}}</span>
        </div>
      </div>
      <div style="height:3px;background:${INK};margin-bottom:20px"></div>
      <div style="font-family:${F_LABEL};font-size:11px;color:${MUTED}">{{t.footerLegal}}</div>
    </div>
  </div>

</div>
</x-dc>
` + LOGIC(1440, 3200);
}

writeFileSync(join(OUT, 'Main.dc.html'), mobile(), 'utf8');
writeFileSync(join(OUT, 'DesktopPixel.dc.html'), desktop(), 'utf8');
console.log('generated Main.dc.html + DesktopPixel.dc.html');
