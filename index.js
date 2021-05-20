const SlackBot = require("slackbots");
const axios = require("axios");

const bot = new SlackBot({
  token: process.env.SLACK_TOKEN,
  name: "nomadbot",
});

bot.on("start", () => {});

bot.on("error", (err) => {
  console.log(err);
});

bot.on("message", (data) => {
  if (data.type !== "message") {
    return;
  }
  handleMessage(data);
});

const handleMessage = (data) => {
  if (data.text.includes(" ping")) {
    handlePing(data.channel);
  }
};

const handlePing = async (channelId) => {
  const channel = await bot.getChannelById(channelId);
  try {
    const res = await axios.get("https://api.vhomesgroup.com/ping");
    const { state, dbState } = res.data;

    bot.postMessageToChannel(
      channel.name,
      `Server is ${state}, database is ${dbState}!`
    );
  } catch (err) {
    bot.postMessageToChannel(channel.name, "Server is down!");
  }
};
