// Test runner for task_3 sequence 3
import fs from 'fs';
import path from 'path';

function main() {
  try {
    const requiredFiles = [
      'src/utils.js',
      'src/Notifications.jsx',
      'src/utils.spec.js',
      'src/Notifications.spec.js'
    ];

    for (const file of requiredFiles) {
      if (!fs.existsSync(path.join(process.cwd(), file))) {
        console.log('NOK');
        return;
      }
    }

    const utilsPath = path.join(process.cwd(), 'src/utils.js');
    const utilsContent = fs.readFileSync(utilsPath, 'utf8');

    if (!utilsContent.includes('getCurrentYear') ||
        !utilsContent.includes('getFooterCopy') ||
        !utilsContent.includes('getLatestNotification')) {
      console.log('NOK');
      return;
    }

    const notificationsPath = path.join(process.cwd(), 'src/Notifications.jsx');
    const notificationsContent = fs.readFileSync(notificationsPath, 'utf8');

    if (!notificationsContent.includes('aria-label="Close"') ||
        !notificationsContent.includes('<li') ||
        !notificationsContent.includes('dangerouslySetInnerHTML')) {
      console.log('NOK');
      return;
    }

    console.log('OK');

  } catch (error) {
    console.log('NOK');
  }
}

main();
