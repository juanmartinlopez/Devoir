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

// Verificar si ya existe un index.html generado por Vite
const indexPath = path.join(distPath, 'index.html');
if (fs.existsSync(indexPath)) {
  console.log('Ya existe un archivo index.html generado por Vite');
  
  // Leer el contenido del archivo index.html
  let htmlContent = fs.readFileSync(indexPath, 'utf8');
  
  // Modificar las rutas para que sean relativas
  htmlContent = htmlContent.replace(/src="\/assets\//g, 'src="./assets/');
  htmlContent = htmlContent.replace(/href="\/assets\//g, 'href="./assets/');
  
  // Guardar el archivo modificado
  fs.writeFileSync(indexPath, htmlContent);
  console.log('Rutas en index.html actualizadas para ser relativas');
} else {
  // Buscar los archivos generados por Vite
  const assetsDir = path.join(distPath, 'assets');
  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    
    // Buscar el archivo JS principal (suele tener un nombre como index-[hash].js)
    const jsFile = files.find(file => file.startsWith('index-') && file.endsWith('.js'));
    const cssFile = files.find(file => file.endsWith('.css'));
    
    if (jsFile) {
      console.log(`Archivo JS principal encontrado: ${jsFile}`);
      
      // Crear un archivo index.html con las rutas correctas
      const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Devoir Solutions</title>
  ${cssFile ? `<link rel="stylesheet" href="./assets/${cssFile}">` : ''}
  <link rel="icon" type="image/x-icon" href="./favicon.ico">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./assets/${jsFile}"></script>
</body>
</html>
`;

      fs.writeFileSync(indexPath, htmlContent);
      console.log('Archivo index.html creado en dist con rutas correctas');
    } else {
      console.log('No se encontró el archivo JS principal, usando rutas genéricas');
      
      // Crear un archivo index.html básico
      const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Devoir Solutions</title>
  <link rel="icon" type="image/x-icon" href="./favicon.ico">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./index.js"></script>
</body>
</html>
`;

      fs.writeFileSync(indexPath, htmlContent);
      console.log('Archivo index.html creado en dist');
    }
  } else {
    console.log('No se encontró el directorio assets, usando rutas genéricas');
    
    // Crear un archivo index.html básico
    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Devoir Solutions</title>
  <link rel="icon" type="image/x-icon" href="./favicon.ico">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./index.js"></script>
</body>
</html>
`;

    fs.writeFileSync(indexPath, htmlContent);
    console.log('Archivo index.html creado en dist');
  }
}

// Copiar el favicon si existe
const faviconSource = path.join(__dirname, 'client', 'public', 'favicon.ico');
const faviconDest = path.join(distPath, 'favicon.ico');
if (fs.existsSync(faviconSource) && !fs.existsSync(faviconDest)) {
  fs.copyFileSync(faviconSource, faviconDest);
  console.log('Favicon copiado a dist');
}

// Copiar el archivo _redirects si existe
const redirectsSource = path.join(__dirname, 'client', 'public', '_redirects');
const redirectsDest = path.join(distPath, '_redirects');
if (fs.existsSync(redirectsSource) && !fs.existsSync(redirectsDest)) {
  fs.copyFileSync(redirectsSource, redirectsDest);
  console.log('Archivo _redirects copiado a dist');
} else if (!fs.existsSync(redirectsSource)) {
  // Si no existe el archivo _redirects, crearlo
  fs.writeFileSync(redirectsDest, '/* /index.html 200');
  console.log('Archivo _redirects creado en dist');
} 