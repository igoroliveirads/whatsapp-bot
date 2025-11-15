/**
 * WhatsApp Client Service
 * Manages WhatsApp Web.js client initialization and lifecycle
 */

import pkg from 'whatsapp-web.js';
import { MongoStore } from 'wwebjs-mongo';
import mongoose from 'mongoose';
import qrcode from 'qrcode-terminal';
import { PUPPETEER_CONFIG } from '../config/app.js';
import { logInfo, logSuccess, logError } from './logger.js';

const { Client, RemoteAuth } = pkg;

/**
 * Creates and initializes WhatsApp client
 * @returns {Promise<Object>} WhatsApp client instance
 */
export async function createWhatsAppClient() {
  logInfo('Conectando ao MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI);
  logSuccess('MongoDB conectado!');

  const store = new MongoStore({ mongoose: mongoose });
  const client = new Client({
    authStrategy: new RemoteAuth({
      store: store,
      backupSyncIntervalMs: 300000
    }),
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

export { Client, RemoteAuth };
