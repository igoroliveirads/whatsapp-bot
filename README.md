# WhatsApp Bot com IA (Gemini)

Bot de WhatsApp automatizado com integração de IA Gemini para gerar resumos de grupos, com arquitetura modular e escalável.

## 📁 Estrutura do Projeto

```
whatsapp-bot/
├── src/
│   ├── config/
│   │   └── app.js                    # Configuração centralizada
│   ├── services/
│   │   ├── ai-service.js             # Serviço de IA (Gemini)
│   │   ├── logger.js                 # Logging centralizado
│   │   └── whatsapp-client.js        # Cliente WhatsApp
│   ├── handlers/
│   │   └── message-handler.js        # Handlers de mensagem
│   └── modules/
│       ├── summary/
│       │   └── summary-module.js     # Gerador de resumos (!resumo)
│       ├── ping-pong/
│       │   └── ping-pong-module.js   # Responde ping/pong
│       └── group-discovery/
│           └── group-discovery-module.js  # Descobre IDs dos grupos
├── .env                              # Variáveis de ambiente
├── .wwebjs_auth/                     # Sessão autenticada do WhatsApp
├── start.js                          # Script de entrada
├── package.json
└── README.md
```

## 🚀 Funcionalidades

- ✅ Monitora grupos específicos do WhatsApp
- ✅ Captura e armazena mensagens do dia
- ✅ Comando `!resumo` gera análise com IA incluindo:
  - Total de mensagens
  - Top 3 faladores
  - Assuntos mais comentados
  - Detecção de "tretas" (discussões)
  - Clima geral do grupo
- ✅ Bot ping/pong para testes
- ✅ Descobridor automático de IDs de grupos
- ✅ Código modularizado e reutilizável
- ✅ Arquitetura escalável com services e handlers
- ✅ Logging centralizado e consistente

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/igoroliveirads/whatsapp-bot.git
cd whatsapp-bot

# Instale as dependências
npm install
```

## ⚙️ Configuração

1. Crie um arquivo `.env` na raiz do projeto:

```env
GEMINI_API_KEY=sua_chave_aqui
```

2. Obtenha sua chave de API do Gemini em: https://aistudio.google.com/

3. Configure os grupos permitidos em `src/config/app.js`:

```javascript
export const ALLOWED_GROUPS = [
  "seu_grupo_id@g.us",
  "outro_grupo_id@g.us"
];
```

## 🎯 Uso

### Módulo de Resumo (Padrão)
```bash
npm start
# ou
node start.js summary
```

**Comando disponível:**
- `!resumo` — Gera um resumo divertido do dia usando IA

### Módulo Ping/Pong
```bash
npm run start:ping-pong
# ou
node start.js ping-pong
```

**Comando disponível:**
- `ping` — Bot responde com `pong 🏓`

### Descobrir Grupos
```bash
npm run start:discovery
# ou
node start.js discovery
```

Envia mensagens nos seus grupos e o bot descobrirá automaticamente seus IDs.

## 📝 Funcionamento

### Módulo de Resumo
1. Monitora mensagens dos grupos permitidos
2. Armazena mensagens do dia por grupo
3. Quando alguém envia `!resumo`:
   - Coleta todas as mensagens do dia
   - Envia para o Gemini gerar um resumo criativo
   - Retorna resumo formatado no grupo

### Logs
Cada mensagem recebida é registrada no console:
```
📥 Mensagem recebida — Grupo: Nome do Grupo | Autor: Nome | Texto: mensagem
```

## 🔧 Personalização

### Adicionar novos módulos

1. Crie uma pasta em `src/modules/seu-modulo/`
2. Crie um arquivo `seu-modulo.js` (veja exemplos em outros módulos)
3. Use em `start.js`:

```javascript
else if (module === 'seu-modulo') {
  await import('./src/modules/seu-modulo/seu-modulo.js');
}
```

### Modificar prompts da IA

Edite o arquivo `src/services/ai-service.js` para ajustar o prompt do Gemini.

### Usar outro modelo de IA

```javascript
const model = genAI.getGenerativeModel({ model: "seu-modelo" });
```

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **whatsapp-web.js** - Integração com WhatsApp
- **@google/generative-ai** - IA Gemini
- **qrcode-terminal** - QR code no terminal
- **dotenv** - Variáveis de ambiente

## ⚠️ Notas Importantes

- O bot não funciona com contas oficiais de WhatsApp Business
- Primeira execução gera um QR code para autenticar
- A sessão é armazenada em `.wwebjs_auth/` para reuso
- Respeite os limites de API do Gemini (quotas diárias)

## 🐛 Solução de Problemas

### Erro: "Invalid API key"
- Verifique se o arquivo `.env` está na raiz do projeto
- Confirme se a chave está correta

### Bot não responde ao comando !resumo
- Verifique se o ID do grupo está em `src/config/app.js`
- Confirme que o bot está conectado ("✅ Bot conectado!")
- Veja os logs no console

### Erro ao iniciar o bot
- Certifique-se de que todas as dependências estão instaladas: `npm install`
- Verifique se o Node.js está atualizado

## 📄 Licença

ISC

## 👨‍💻 Autor

**Igor Oliveira** - igoroliveirads

