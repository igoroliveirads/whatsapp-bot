/**
 * Application configuration
 * Centralized configuration for the WhatsApp bot
 */

// Allowed WhatsApp group IDs (add more IDs as needed)
export const ALLOWED_GROUPS = [
  "120363381838568897@g.us"
];

export const PUPPETEER_CONFIG = {
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  headless: 'new'
};

export const BOT_COMMANDS = {
  SUMMARY: '!resumo',
  PING: 'ping'
};

export const LOG_LEVELS = {
  INFO: '📘',
  SUCCESS: '✅',
  WARNING: '⚠️',
  ERROR: '❌',
  MESSAGE: '📥'
};
