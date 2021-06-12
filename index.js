const { App } = require('@slack/bolt');
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.message('!ping', async ({ message, say }) => {
  var msg;
  try {
    const res = await axios.get("https://api.vhomesgroup.com/ping");
    const { state, dbState } = res.data;

    msg = `Server is ${state}, database is ${dbState}!`
  } catch (err) {
    msg = 'Server is down!'
  }
  // say() sends a message to the channel where the event was triggered
  await say(msg);
});

app.message('hi', async ({ message, say }) => {
  console.log("hello")
});

// const handlePing = async (channelId) => {
//   const channel = await bot.getChannelById(channelId);
//   try {
//     const res = await axios.get("https://api.vhomesgroup.com/ping");
//     const { state, dbState } = res.data;

//     bot.postMessageToChannel(
//       channel.name,
//       `Server is ${state}, database is ${dbState}!`
//     );
//   } catch (err) {
//     bot.postMessageToChannel(channel.name, "Server is down!");
//   }
// };

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
