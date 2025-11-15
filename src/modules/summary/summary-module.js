/**
 * Summary Module
 * Handles group conversation summaries
 */

import 'dotenv/config';
import { createWhatsAppClient } from '../../services/whatsapp-client.js';
import { ALLOWED_GROUPS, BOT_COMMANDS } from '../../config/app.js';
import { generateDailySummary } from '../../services/ai-service.js';
import { extractMessageMetadata, isAllowedGroup } from '../../handlers/message-handler.js';
import { logMessageReceived, logSuccess, logError } from '../../services/logger.js';

// Store messages by group and date
let messages = {};

const client = createWhatsAppClient();

client.on('message', async (msg) => {
  const metadata = await extractMessageMetadata(msg);

  if (!isAllowedGroup(metadata.chatId, ALLOWED_GROUPS)) return;

  logMessageReceived(metadata.chatName, metadata.author, metadata.text);

  const date = new Date().toISOString().split("T")[0];

  if (!messages[metadata.chatId]) messages[metadata.chatId] = {};
  if (!messages[metadata.chatId][date]) messages[metadata.chatId][date] = [];

  messages[metadata.chatId][date].push({
    author: metadata.author,
    text: metadata.text
  });

  // Handle summary command
  if (msg.body.toLowerCase().includes(BOT_COMMANDS.SUMMARY)) {
    try {
      if (messages[metadata.chatId] && messages[metadata.chatId][date]) {
        const summary = await generateDailySummary(messages[metadata.chatId][date]);
        const chat = await msg.getChat();
        await chat.sendMessage(summary);
      } else {
        const chat = await msg.getChat();
        await chat.sendMessage("📭 Nenhuma conversa registrada hoje.");
      }
    } catch (error) {
      logError("Error generating summary", error);
    }
  }
});

logSuccess("Iniciando módulo de resumo");
client.initialize();
