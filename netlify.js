// Este archivo se ejecuta durante el proceso de construcción en Netlify
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Iniciando script de post-construcción para Netlify...');

// Verificar si el directorio dist existe, si no, crearlo
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
  console.log('Directorio dist creado');
}

// Función para copiar archivos con manejo de errores
function copyFileWithErrorHandling(source, dest, description) {
  if (fs.existsSync(source)) {
    try {
      // Asegurarse de que el directorio de destino exista
      const destDir = path.dirname(dest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      
      fs.copyFileSync(source, dest);
      console.log(`${description} copiado correctamente a: ${dest}`);
      return true;
    } catch (error) {
      console.error(`Error al copiar ${description}:`, error);
      return false;
    }
  } else {
    console.warn(`${description} no encontrado en: ${source}`);
    return false;
  }
}

// Copiar el favicon a múltiples ubicaciones para asegurar que se encuentre
const faviconSource = path.join(__dirname, 'client', 'public', 'favicon.ico');
const faviconDest = path.join(distPath, 'favicon.ico');
copyFileWithErrorHandling(faviconSource, faviconDest, 'Favicon (raíz)');

// Copiar a ubicaciones adicionales
copyFileWithErrorHandling(faviconSource, path.join(distPath, 'assets', 'favicon.ico'), 'Favicon (assets)');
copyFileWithErrorHandling(faviconSource, path.join(distPath, 'images', 'favicon.ico'), 'Favicon (images)');
copyFileWithErrorHandling(faviconSource, path.join(distPath, 'img', 'favicon.ico'), 'Favicon (img)');

// Copiar el archivo site.webmanifest
const manifestSource = path.join(__dirname, 'client', 'public', 'site.webmanifest');
const manifestDest = path.join(distPath, 'site.webmanifest');
copyFileWithErrorHandling(manifestSource, manifestDest, 'Archivo site.webmanifest');

// Copiar el archivo de prueba del favicon
const faviconTestSource = path.join(__dirname, 'favicon-test.html');
const faviconTestDest = path.join(distPath, 'favicon-test.html');
copyFileWithErrorHandling(faviconTestSource, faviconTestDest, 'Archivo de prueba del favicon');

// Verificar si ya existe un index.html generado por Vite
const indexPath = path.join(distPath, 'index.html');
if (fs.existsSync(indexPath)) {
  console.log('Ya existe un archivo index.html generado por Vite');
  
  // Leer el contenido del archivo index.html
  let htmlContent = fs.readFileSync(indexPath, 'utf8');
  
  // Modificar las rutas para que sean relativas
  htmlContent = htmlContent.replace(/src="\/assets\//g, 'src="./assets/');
  htmlContent = htmlContent.replace(/href="\/assets\//g, 'href="./assets/');
  
  // Asegurarnos de que el favicon esté incluido con múltiples formatos y rutas
  if (!htmlContent.includes('favicon.ico')) {
    const headEndPos = htmlContent.indexOf('</head>');
    if (headEndPos !== -1) {
      htmlContent = htmlContent.slice(0, headEndPos) + 
        '\n  <!-- Favicon -->\n' +
        '  <link rel="icon" href="/favicon.ico" type="image/x-icon">\n' +
        '  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">\n' +
        '  <link rel="icon" href="./favicon.ico" type="image/x-icon">\n' +
        '  <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">\n' +
        '  <link rel="icon" href="favicon.ico" type="image/x-icon">\n' +
        '  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">\n' +
        htmlContent.slice(headEndPos);
      console.log('Referencias al favicon añadidas al index.html');
    }
  }
  
  // Asegurarnos de que el site.webmanifest esté incluido
  if (!htmlContent.includes('site.webmanifest') && fs.existsSync(manifestDest)) {
    const headEndPos = htmlContent.indexOf('</head>');
    if (headEndPos !== -1) {
      htmlContent = htmlContent.slice(0, headEndPos) + 
        '\n  <link rel="manifest" href="/site.webmanifest">\n' + 
        htmlContent.slice(headEndPos);
      console.log('Referencia al site.webmanifest añadida al index.html');
    }
  }
  
  // Guardar el archivo modificado
  fs.writeFileSync(indexPath, htmlContent);
  console.log('Rutas en index.html actualizadas');
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
  
  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" type="image/x-icon">
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
  <link rel="icon" href="./favicon.ico" type="image/x-icon">
  <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">
  <link rel="icon" href="favicon.ico" type="image/x-icon">
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
  
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#000000">
  <meta name="description" content="Devoir Solutions - Soluciones tecnológicas para tu negocio">
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
  
  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" type="image/x-icon">
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
  <link rel="icon" href="./favicon.ico" type="image/x-icon">
  <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">
  <link rel="icon" href="favicon.ico" type="image/x-icon">
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
  
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#000000">
  <meta name="description" content="Devoir Solutions - Soluciones tecnológicas para tu negocio">
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
  
  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" type="image/x-icon">
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
  <link rel="icon" href="./favicon.ico" type="image/x-icon">
  <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">
  <link rel="icon" href="favicon.ico" type="image/x-icon">
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
  
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#000000">
  <meta name="description" content="Devoir Solutions - Soluciones tecnológicas para tu negocio">
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

// Copiar el archivo _redirects si existe
const redirectsSource = path.join(__dirname, 'client', 'public', '_redirects');
const redirectsDest = path.join(distPath, '_redirects');
if (fs.existsSync(redirectsSource) && !fs.existsSync(redirectsDest)) {
  fs.copyFileSync(redirectsSource, redirectsDest);
  console.log('Archivo _redirects copiado a dist');
} else if (!fs.existsSync(redirectsDest)) {
  // Si no existe el archivo _redirects, crearlo
  fs.writeFileSync(redirectsDest, '/* /index.html 200');
  console.log('Archivo _redirects creado en dist');
}

// Crear un archivo favicon.html para probar
const faviconTestPath = path.join(distPath, 'favicon.html');
const faviconTestContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Favicon</title>
  
  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" type="image/x-icon">
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
</head>
<body>
  <h1>Página de prueba para el favicon</h1>
  <p>Si puedes ver el favicon en la pestaña del navegador, entonces está funcionando correctamente.</p>
</body>
</html>
`;
fs.writeFileSync(faviconTestPath, faviconTestContent);
console.log('Archivo favicon.html creado para pruebas');

console.log('Script de post-construcción para Netlify completado.'); 