#!/usr/bin/env node
import { runDaemon } from '../src/cli.js';
runDaemon(process.argv.slice(2)).catch((err) => {
  console.error(err);
  process.exit(1);
});