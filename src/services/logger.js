/**
 * Logger Service
 * Centralized logging with consistent formatting
 */

import { LOG_LEVELS } from '../config/app.js';

export function logInfo(message) {
  console.log(`${LOG_LEVELS.INFO} ${message}`);
}

export function logSuccess(message) {
  console.log(`${LOG_LEVELS.SUCCESS} ${message}`);
}

export function logWarning(message) {
  console.warn(`${LOG_LEVELS.WARNING} ${message}`);
}

export function logError(message, error = null) {
  console.error(`${LOG_LEVELS.ERROR} ${message}`, error?.message || '');
}

export function logMessageReceived(groupName, author, text) {
  console.log(`${LOG_LEVELS.MESSAGE} Mensagem recebida — Grupo: ${groupName} | Autor: ${author} | Texto: ${text}`);
}
