const TelegramBot = require('node-telegram-bot-api'),
      token = '417321050:AAHihi2nO4xja8s3OdGQQxPfSiuE8pOj1yI',
      bot = new TelegramBot(token, {polling: true});

const cex = require('./cex.js')

const MESSAGE_TYPES = {
  COURSE: 'COURSE',
  DOBRO: 'DOBRO',
  RESPECT: 'RESPECT'
}

const parseMessage = (msg, res = false) => {
  if (msg.text.match(/\/course/)) {
    res = {
      type: MESSAGE_TYPES.COURSE,
      data: msg.text.split(' ')[1].toUpperCase()
    }
  } else if (msg.text.match(/\/zdorovya/)) {
    res = {
      type: MESSAGE_TYPES.DOBRO,
      data: {
        from: '@' + msg.from.username,
        to: msg.text.split(' ')[1] || 'себе'
      }
    }
  } else if (msg.text.match(/\/respect/)) {
    res = {
      type: MESSAGE_TYPES.RESPECT,
      data: 'https://scontent-cdt1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/22280263_1929980330666191_2697190018224488448_n.jpg'
    }
  }
  return res
}

bot.on('text', msg => {
  switch (parseMessage(msg).type) {
    case MESSAGE_TYPES.COURSE:
      cex.getCurrentPrice(parseMessage(msg).data)
          .then(data => bot.sendMessage(
             msg.chat.id,
             data.lprice
          )
      )
      break;
    case MESSAGE_TYPES.DOBRO:
      bot.sendMessage(
        msg.chat.id,
        parseMessage(msg).data.from + ' уважаемый/ая желает ' + parseMessage(msg).data.to + ' уважаемому/ой крепкого здоровья и финансового благополучия'
      )
      break;
    case MESSAGE_TYPES.RESPECT:
      bot.sendPhoto(
        msg.chat.id,
        parseMessage(msg).data
      )
      break;
    default:
      bot.sendMessage(msg.chat.id, 'ИЗВЕНИ')
      break;
  }
})
