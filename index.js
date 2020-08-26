const cool = require("cool-ascii-faces");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const { Pool } = require("pg");
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(async (_ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log("Response time: %sms", ms);
});

bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

bot.start((ctx) =>
  ctx.reply(
    `Hi ${ctx.from.first_name} ${ctx.from.last_name || ""}! 🎉\n` +
      "I can do couple of things\n" +
      "send me /income + number to add some 🤑🤑🤑\n" +
      "or /show to see what you got 🙈"
  )
);
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));

bot.command("oldschool", (ctx) => ctx.reply("Hello"));
bot.command("modern", ({ reply }) => reply("Yo"));
bot.command("hipster", Telegraf.reply("λ"));

const incomeCallback = async ({ reply, message }) => {
  var msg = message.text;

  console.log(message)
  const sum = parseInt(msg.replace('/income ',''));

  if (!sum) reply("😥 income not found");
  else {
    const client = await pool.connect();
    const result = await client.query(
      `insert into test_table(name) values('${sum}');`
    );
    client.release();

    reply("💰💰💰");
  }
};

bot.command("income", incomeCallback);

const showCallback = async ({ reply, message }) => {
  const client = await pool.connect();
  const result = await client.query("SELECT * FROM test_table");
  const results = { results: result ? result.rows : null };
  client.release();

  result.rows.forEach((r) => {
    reply(`💰${r.name}💰`);
  });
};
bot.command("show", showCallback);

bot.launch();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

showTimes = () => {
  let result = "";
  const times = process.env.TIMES || 5;
  for (i = 0; i < times; i++) {
    result += i + " ";
  }
  return result;
};

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (_req, res) => res.render("pages/index"))
  .get("/cool", (_req, res) => res.send(cool()))
  .get("/times", (_req, res) => res.send(showTimes()))
  .get("/db", async (_req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM test_table");
      const results = { results: result ? result.rows : null };
      res.render("pages/db", results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
