async function globalSetup() {
  console.log(`\n🚀 Test suite started at ${new Date().toISOString()}`);
  global.__suiteStart = Date.now();
}

module.exports = globalSetup;
