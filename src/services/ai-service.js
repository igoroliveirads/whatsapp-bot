/**
 * AI Service using Google Gemini
 * Handles all AI-related operations
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generates a summary of group conversations using AI
 * @param {Array} messages - Array of message objects with 'author' and 'text' properties
 * @returns {Promise<string>} Formatted summary from Gemini
 */
export async function generateDailySummary(messages) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  if (!messages || messages.length === 0) {
    return "📭 Nenhuma conversa registrada hoje.";
  }

  const formattedConversations = messages
    .map(m => `${m.author}: ${m.text}`)
    .join("\n");

  const prompt = `
Analise as conversas abaixo e gere um resumo organizado exatamente neste formato:

📢 *Hora do resumo do dia*
———————————————————
📨 *Total de mensagens:* X
😂 *Clima geral do dia:* frase divertida sobre o humor do grupo

👥 *Top faladores:*
🏆 1. Nome — Y msgs
🏆 2. Nome — Y msgs
🏆 3. Nome — Y msgs

🔍 *Assuntos mais comentados:*
Para cada assunto detectado faça:
💬 "tema" — citado Xx
👤 Por: nomes de quem falou sobre isso
🤖 Opinião da IA: comentário divertido e curto

🔥 *Tretas do dia* (se houver):
Para cada discussão detectada:
⚡ Assunto da treta: "tema"
👥 Envolvidos: nomes
🥊 Quem ganhou segundo a IA: nome
😂 Opinião da IA: comentário engraçado sobre a treta

———————————————————
📌 *Conversas analisadas:*
${formattedConversations}

Regras importantes:
- NÃO invente fatos, apenas resuma o que realmente aparece.
- Se não houver brigas, diga "Hoje foi paz e amor, nenhuma treta detectada ✨".
- Se não houver assunto diga "que grupo quietinho.."
- Seja breve, divertido e muito claro.
- Use emojis como no exemplo acima.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiText = response.text();
    return `📌 *Resumo do Dia*\n\n${aiText}`;
  } catch (error) {
    console.error("❌ Erro ao gerar resumo:", error.message);
    return "❌ Desculpe, não consegui gerar o resumo. Tente novamente mais tarde.";
  }
}
