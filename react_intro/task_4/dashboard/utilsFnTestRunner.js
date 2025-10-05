// Test runner for utils functions
(async () => {
  try {
    // Import utils functions
    const { getCurrentYear, getFooterCopy } = await import('./src/utils.js');

    // Test getCurrentYear
    const year = getCurrentYear();

    // Test getFooterCopy
    const footerTrue = getFooterCopy(true);
    const footerFalse = getFooterCopy(false);

    // Check if results are as expected
    if (
      typeof year === 'number' &&
      year >= 2024 &&
      footerTrue === 'Holberton School' &&
      footerFalse === 'Holberton School main dashboard'
    ) {
      console.log('OK');
    } else {
      console.log('NOK');
    }
  } catch {
    console.log('NOK');
  }
})();
