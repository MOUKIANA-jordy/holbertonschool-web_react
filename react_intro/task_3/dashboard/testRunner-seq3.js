// Test runner for task_3 sequence 3
const fs = require('fs');
const path = require('path');

try {
  // Check if the required files exist
  const requiredFiles = [
    'src/utils.js',
    'src/Notifications.jsx',
    'src/utils.spec.js',
    'src/Notifications.spec.js'
  ];

  let allFilesExist = true;
  for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(__dirname, file))) {
      allFilesExist = false;
      break;
    }
  }

  if (!allFilesExist) {
    console.log('NOK');
    return;
  }

  // Check if utils functions exist
  const utilsPath = path.join(__dirname, 'src/utils.js');
  const utilsContent = fs.readFileSync(utilsPath, 'utf8');

  const hasGetCurrentYear = utilsContent.includes('getCurrentYear');
  const hasGetFooterCopy = utilsContent.includes('getFooterCopy');
  const hasGetLatestNotification = utilsContent.includes('getLatestNotification');

  if (!hasGetCurrentYear || !hasGetFooterCopy || !hasGetLatestNotification) {
    console.log('NOK');
    return;
  }

  // Check if Notifications component has required elements
  const notificationsPath = path.join(__dirname, 'src/Notifications.jsx');
  const notificationsContent = fs.readFileSync(notificationsPath, 'utf8');

  const hasCloseButton = notificationsContent.includes('aria-label="Close"');
  const hasListItems = notificationsContent.includes('<li');
  const hasDangerouslySetInnerHTML = notificationsContent.includes('dangerouslySetInnerHTML');

  if (!hasCloseButton || !hasListItems || !hasDangerouslySetInnerHTML) {
    console.log('NOK');
    return;
  }

  // All checks passed
  console.log('OK');

} catch (error) {
  console.log('NOK');
}
