const { defineConfig } = require('checkly')

module.exports = defineConfig({
  projectName: 'Sauce Demo Monitoring',
  logicalId: 'sauce-demo-monitoring',
  repoUrl: 'https://github.com/jweng77/playwright-agentic-tests',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2024.02',
    frequency: 10,
    locations: ['us-east-1', 'eu-west-1'],
    tags: ['playwright', 'monitoring'],
    alertChannels: [],
    browserChecks: {
      frequency: 10,
      testMatch: ['checks/**/*.check.js'],
    },
  },
  cli: {
    runLocation: 'us-east-1',
    reporters: ['list'],
  },
})
