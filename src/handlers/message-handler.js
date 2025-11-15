/**
 * Message Handler
 * Base handler for processing messages
 */

/**
 * Extracts message metadata
 * @param {Object} msg - WhatsApp message object
 * @returns {Promise<Object>} Message metadata
 */
export async function extractMessageMetadata(msg) {
  try {
    const chat = await msg.getChat();
    const author = msg._data?.notifyName || msg.author || (msg.fromMe ? 'Me' : 'User');
    const chatName = chat.name || msg.from;

    return {
      author,
      text: msg.body,
      chatName,
      chatId: msg.from,
      isGroup: chat.isGroup,
      timestamp: msg.timestamp
    };
  } catch (error) {
    return {
      author: 'Unknown',
      text: msg.body,
      chatName: 'Unknown',
      chatId: msg.from,
      isGroup: false,
      timestamp: msg.timestamp
    };
  }
}

/**
 * Checks if message is from allowed group
 * @param {string} chatId - Chat ID
 * @param {Array} allowedGroups - List of allowed group IDs
 * @returns {boolean}
 */
export function isAllowedGroup(chatId, allowedGroups) {
  return allowedGroups.includes(chatId);
}
