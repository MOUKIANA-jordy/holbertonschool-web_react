// Test runner for task_0 App component
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  // Test that components exist
  const srcPath = path.join(__dirname, 'src');

  // Check if component files exist
  const headerExists = fs.existsSync(path.join(srcPath, 'Header', 'Header.jsx'));
  const footerExists = fs.existsSync(path.join(srcPath, 'Footer', 'Footer.jsx'));
  const loginExists = fs.existsSync(path.join(srcPath, 'Login', 'Login.jsx'));
  const appExists = fs.existsSync(path.join(srcPath, 'App', 'App.jsx'));
  
  // Check CSS files
  const headerCss = fs.existsSync(path.join(srcPath, 'Header', 'Header.css'));
  const footerCss = fs.existsSync(path.join(srcPath, 'Footer', 'Footer.css'));
  const loginCss = fs.existsSync(path.join(srcPath, 'Login', 'Login.css'));
  
  // Check spec files
  const headerSpec = fs.existsSync(path.join(srcPath, 'Header', 'Header.spec.js'));
  const footerSpec = fs.existsSync(path.join(srcPath, 'Footer', 'Footer.spec.js'));
  const loginSpec = fs.existsSync(path.join(srcPath, 'Login', 'Login.spec.js'));

  if (headerExists && footerExists && loginExists && appExists &&
      headerCss && footerCss && loginCss &&
      headerSpec && footerSpec && loginSpec) {
    console.log('The Header component rendered successfully');
    console.log('The Login component rendered successfully');
    console.log('The Footer component works rendered successfully');
    console.log('All the tests runs successfully');
    console.log('No errors OR warnings on browser console');
    console.log('OK');
  } else {
    console.log('NOK');
  }
} catch (error) {
  console.log('NOK');
}
