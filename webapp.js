const TelegramBot = require('node-telegram-bot-api');

const token = '7966028229:AAFv2lcUQrX3oKFdKVcZutXx-TSfNz0uGtU';
const bot = new TelegramBot(token, { polling: false }); // webhook!

// Твой текущий код /start КОПИРУЙ ЗДЕСЬ полностью
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name;

  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [{
          text: "🛒 Открыть магазин DigiSell",
          web_app: { url: "https://digisellbot.store/" }, // ТВОЙ ДОМЕН!
        }],
        [{
          text: "Канал DigiSell",
          url: "https://t.me/digiselloff"
        }, {
          text: "Связь с поддержкой",
          url: "https://t.me/digisell_support"
        }, {
          text: "Отзывы клиентов",
          url: "https://t.me/digisellreviews"
        }],
      ],
    },
  };

  bot.sendMessage(chatId, `
<b>Здравствуйте, ${userName}!</b>

<b>🎮DigiSell</b> — твой надёжный сервис цифровых товаров...

Для просмотра каталога и оформления заказа нажмите «Открыть магазин DigiSell».`, {
    parse_mode: "HTML",
    reply_markup: keyboard,
  });
});

const PORT = process.env.PORT || 3000;
const URL = 'https://digisellbot.store'; // ТВОЙ ДОМЕН

bot.setWebHook(`${URL}/${token}`);

// Сервер для webhook
const express = require('express');
const app = express();
app.use(express.json());

app.post(`/${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Bot слушает webhook на ${URL}`);
});
