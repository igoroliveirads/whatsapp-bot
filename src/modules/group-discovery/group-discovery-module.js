/**
 * Group Discovery Module
 * Discovers WhatsApp group IDs automatically
 */

import 'dotenv/config';
import { createWhatsAppClient } from '../../services/whatsapp-client.js';
import { PUPPETEER_CONFIG } from '../../config/app.js';
import { logInfo, logSuccess, logError } from '../../services/logger.js';

const discoveredGroups = new Set();

const client = createWhatsAppClient();

client.on('ready', () => {
  logSuccess("Bot conectado com sucesso!");
  console.log("\n📋 Aguardando mensagens de grupos...");
  console.log("⏳ Envie algumas mensagens nos seus grupos para que o bot os descubra.");
  console.log("=".repeat(80) + "\n");
});

client.on('message', async (msg) => {
  try {
    const chat = await msg.getChat();

    if (chat.isGroup && !discoveredGroups.has(chat.id._serialized)) {
      discoveredGroups.add(chat.id._serialized);

      console.log(`\n🆕 Grupo descoberto:`);
      console.log(`   📱 Nome: ${chat.name}`);
      console.log(`   🆔 ID: ${chat.id._serialized}`);
      console.log(`   👥 Participantes: ${chat.participants ? chat.participants.length : 'N/A'}`);
      console.log("-".repeat(80));

      if (discoveredGroups.size > 0) {
        console.log("\n✨ GRUPOS DESCOBERTOS ATÉ AGORA:\n");
        console.log("const ALLOWED_GROUPS = [");
        discoveredGroups.forEach(id => {
          console.log(`  "${id}",`);
        });
        console.log("];\n");
      }
    }
  } catch (error) {
    logError("Error discovering groups", error);
  }
});

logSuccess("Iniciando módulo de descoberta de grupos");
client.initialize();
