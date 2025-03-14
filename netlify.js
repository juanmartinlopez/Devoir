// Este archivo se ejecuta durante el proceso de construcción en Netlify
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Verificar si el directorio dist existe, si no, crearlo
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
  console.log('Directorio dist creado');
}

// Crear un archivo index.html básico en el directorio dist
const indexPath = path.join(distPath, 'index.html');
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Devoir Solutions</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/assets/index.js"></script>
</body>
</html>
`;

fs.writeFileSync(indexPath, htmlContent);
console.log('Archivo index.html creado en dist'); 