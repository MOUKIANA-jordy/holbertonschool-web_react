import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const R = (...p) => path.join(__dirname, ...p);

let pass = true;
const log = (ok, msg) => {
  if (!ok) pass = false;
  process.stdout.write(`${ok ? '✔' : '✖'} ${msg}\n`);
};
const ex = (p) => fs.existsSync(R(p));
const read = (p) => { try { return fs.readFileSync(R(p), 'utf8'); } catch { return ''; } };

// 1) Fichiers requis
log(ex('index.html'), 'index.html existe');
log(ex('public/holberton-logo.jpg'), 'public/holberton-logo.jpg présent');
log(ex('public/favicon.ico'), 'public/favicon.ico présent');
log(ex('src/assets/holberton-logo.jpg'), 'src/assets/holberton-logo.jpg présent');
log(ex('src/assets/close-button.png'), 'src/assets/close-button.png présent');

// 1b) Fichiers interdits
log(!ex('public/vite.svg'), 'public/vite.svg supprimé');
log(!ex('src/assets/react.svg'), 'src/assets/react.svg supprimé');
log(!ex('src/index.css'), 'src/index.css supprimé');
log(!ex('src/assets/favicon.ico'), 'src/assets/favicon.ico supprimé');

const html = read('index.html');

// 2) Titre & icône
const titleOK = /<title>\s*Holberton - School dashboard\s*<\/title>/i.test(html);
log(titleOK, 'index.html: titre exact');

const iconTags = [...html.matchAll(/<link[^>]+rel=["']icon["'][^>]*>/gi)].map(m => m[0]);
log(iconTags.length === 1, `index.html: une seule balise icon (trouvé=${iconTags.length})`);
const iconIsLogo = /href=["']\/holberton-logo\.jpg["']/i.test(iconTags[0] || '');
log(iconIsLogo, 'index.html: icon pointe vers /holberton-logo.jpg');

// 3) App.jsx
const app = read('src/App.jsx');
log(/alt\s*=\s*["']holberton logo["']/i.test(app), 'App.jsx: alt="holberton logo"');
log(/>School dashboard<\/h1>/.test(app), 'App.jsx: h1 "School dashboard"');
log(/Login to access the full dashboard/.test(app), 'App.jsx: texte de login');

// Footer: accepter {year}, { new Date().getFullYear() } ou l'année littérale
const year = new Date().getFullYear().toString();
const footerOK =
  /Copyright\s*\{\s*year\s*\}\s*-\s*holberton\s+School/i.test(app) ||
  /Copyright\s*\{[^}]*getFullYear\(\)[^}]*\}\s*-\s*holberton\s+School/i.test(app) ||
  new RegExp(`Copyright\\s+${year}\\s*-\\s*holberton\\s+School`, 'i').test(app);
log(footerOK, `App.jsx: footer avec l'année ${year} (ou {year}/getFullYear())`);

// 4) Couleur CSS
const css = read('src/App.css');
log(/#e1003c/i.test(css), 'App.css: contient #e1003c');

// 5) main.jsx sans index.css
const main = read('src/main.jsx');
const importsIndex = /index\.css/.test(main);
log(!importsIndex, "main.jsx: pas d'import de index.css");

// 6) package.json: jest + config
try {
  const pkg = JSON.parse(read('package.json') || '{}');
  const hasJestDep =
    (pkg.devDependencies && Object.prototype.hasOwnProperty.call(pkg.devDependencies, 'jest')) ||
    (pkg.dependencies && Object.prototype.hasOwnProperty.call(pkg.dependencies, 'jest'));
  const hasJestConfig = !!pkg.jest;
  log(hasJestDep, 'package.json: dépendance jest présente');
  log(hasJestConfig, 'package.json: bloc de config jest présent');
} catch {
  log(false, 'package.json: JSON invalide');
}

// Résumé final (OK/NOK attendu par le checker)
process.stdout.write(pass ? 'OK\n' : 'NOK\n');
