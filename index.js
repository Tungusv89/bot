const TelegramBot = require('node-telegram-bot-api');

const token = '630897290:AAEpNHEX9YT4MywBjJsKAE7U6TC9r4RReZ4';


const bot = new TelegramBot(token, { polling: true });


const keyboard = [
    [{
        text: 'Хочу кота',
        callback_data: 'moreKeks'
    }],
    [{
        text: 'Хочу песика',
        callback_data: 'morePes'
    }],
    [{
        text: 'Хочу ссылку',
        url: 'https://google.ru/'
    }]
];


bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Привет? чего хочешь?', {
        reply_markup: {
            inline_keyboard: keyboard
        }
    });
});


bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    let img = '';

    if (query.data === 'moreKeks') {
        img = 'keks.png';
    }

    if (query.data === 'morePes') {
        img = 'pes.png';
    }

    if (img) {
        bot.sendPhoto(chatId, img, {
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    } else {
        bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', {
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }
});