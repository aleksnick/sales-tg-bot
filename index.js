import dotenv from 'dotenv'
import { Telegraf } from 'telegraf'
import express from 'express'

dotenv.config()

const expressApp = express()

const port = process.env.PORT || 3000

expressApp.get('/', (req, res) => {
  res.send('Hello World!')
})

expressApp.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('quit', (ctx) => {
  ctx.telegram.leaveChat(ctx.message.chat.id)
})

bot.on('text', (ctx) => {
  console.log(ctx.update.message.from)
  ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.update.message.from.username}`)
})

bot.startPolling()
