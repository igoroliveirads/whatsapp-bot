#!/usr/bin/env node
import 'dotenv/config';

const args = process.argv.slice(2);
const module = args[0] || 'summary';

console.log(`🤖 Starting module: ${module}\n`);

try {
  if (module === 'summary') {
    await import('./src/modules/summary/summary-module.js');
  } else if (module === 'ping-pong') {
    await import('./src/modules/ping-pong/ping-pong-module.js');
  } else if (module === 'discovery' || module === 'discover') {
    await import('./src/modules/group-discovery/group-discovery-module.js');
  } else {
    console.error(`❌ Module '${module}' not found.`);
    console.log('\nAvailable modules:');
    console.log('  - summary (default - generate summaries with !resumo command)');
    console.log('  - ping-pong (responds "pong" to "ping" message)');
    console.log('  - discovery (discovers group IDs automatically)\n');
    console.log('Usage: node start.js [module]');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error starting module:', error.message);
  process.exit(1);
}
