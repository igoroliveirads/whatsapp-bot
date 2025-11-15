/**
 * Ping Pong Module
 * Simple ping/pong response module for testing
 */

import 'dotenv/config';
import { createWhatsAppClient } from '../../services/whatsapp-client.js';
import { ALLOWED_GROUPS, BOT_COMMANDS } from '../../config/app.js';
import { extractMessageMetadata, isAllowedGroup } from '../../handlers/message-handler.js';
import { logMessageReceived, logSuccess, logError } from '../../services/logger.js';

const client = createWhatsAppClient();

client.on('message', async (msg) => {
  try {
    const metadata = await extractMessageMetadata(msg);
    const chat = await msg.getChat();

    if (!chat.isGroup) return;
    if (!isAllowedGroup(metadata.chatId, ALLOWED_GROUPS)) return;

    logMessageReceived(metadata.chatName, metadata.author, metadata.text);

    if (msg.body === BOT_COMMANDS.PING) {
      await msg.reply("pong 🏓");
    }
  } catch (error) {
    logError("Error in ping-pong module", error);
  }
});

logSuccess("Iniciando módulo Ping/Pong");
client.initialize();
