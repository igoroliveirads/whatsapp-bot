/**
 * WhatsApp Client Service
 * Manages WhatsApp Web.js client initialization and lifecycle
 */

import pkg from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { PUPPETEER_CONFIG } from '../config/app.js';
import { logInfo, logSuccess, logError } from './logger.js';

const { Client, LocalAuth } = pkg;

/**
 * Creates and initializes WhatsApp client
 * @returns {Object} WhatsApp client instance
 */
export function createWhatsAppClient() {
  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: PUPPETEER_CONFIG
  });

  client.on('qr', (qr) => {
    logInfo("Escaneie o QR Code:");
    qrcode.generate(qr, { small: true });
  });

  client.on('ready', () => {
    logSuccess("Bot conectado!");
  });

  client.on('auth_failure', (msg) => {
    logError("Falha na autenticação", msg);
  });

  return client;
}

export { Client, LocalAuth };
