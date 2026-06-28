async function globalTeardown() {
  const start = (global as any).__suiteStart;
  if (start) {
    const elapsed = ((Date.now() - start) / 1000).toFixed(2);
    console.log(`\n✅ Test suite finished at ${new Date().toISOString()}`);
    console.log(`⏱  Total suite duration: ${elapsed}s`);
  }
}

export default globalTeardown;
