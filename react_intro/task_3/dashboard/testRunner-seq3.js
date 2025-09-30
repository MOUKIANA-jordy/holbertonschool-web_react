// Test runner for task_3 sequence 3
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  // Check if the required files exist
  const requiredFiles = [
    'src/utils.js',
    'src/Notifications.jsx',
    'src/utils.spec.js',
    'src/Notifications.spec.js'
  ];

  for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(__dirname, file))) {
      console.log('NOK');
      process.exit(0);
    }
  }

  // Check utils.js
  const utilsContent = fs.readFileSync(path.join(__dirname, 'src/utils.js'), 'utf8');
  if (
    !/getCurrentYear/.test(utilsContent) ||
    !/getFooterCopy/.test(utilsContent) ||
    !/getLatestNotification/.test(utilsContent)
  ) {
    console.log('NOK');
    process.exit(0);
  }

  // Check Notifications.jsx
  const notifContent = fs.readFileSync(path.join(__dirname, 'src/Notifications.jsx'), 'utf8');

  if (
    !/aria-label\s*=\s*["']Close["']/.test(notifContent) ||  // plus flexible
    !/<li[^>]*>/.test(notifContent) ||
    !/dangerouslySetInnerHTML/.test(notifContent)
  ) {
    console.log('NOK');
    process.exit(0);
  }

  // All checks passed
  console.log('OK');

} catch (error) {
  console.log('NOK');
}
