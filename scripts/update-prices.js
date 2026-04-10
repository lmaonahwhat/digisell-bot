const fs = require("fs/promises");
const axios = require("axios");

const GAMES_PATH = "./data/games.json";
const OUTPUT_PATH = "./data/steam-data.json";

function toRubWithMarkup(value, rateToRub, markupPercent) {
  return Math.ceil(value * rateToRub * (1 + markupPercent / 100));
}

async function fetchSteamPrice(appid, cc) {
  const url = `https://store.steampowered.com/api/appdetails?appids=${appid}&cc=${cc}&filters=price_overview`;

  const response = await axios.get(url, {
    timeout: 15000,
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "application/json,text/plain,*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
  });

  const json = response.data;
  const app = json[String(appid)];

  if (!app || !app.success || !app.data || !app.data.price_overview) {
    throw new Error(`No price_overview for ${appid} (${cc})`);
  }

  const p = app.data.price_overview;

  return {
    currency: p.currency,
    initial: p.initial / 100,
    final: p.final / 100,
    discountPercent: p.discount_percent,
  };
}

async function main() {
  const games = JSON.parse(await fs.readFile(GAMES_PATH, "utf8"));

  const result = {
    updatedAt: new Date().toISOString(),
    games: [],
  };

  for (const game of games) {
    const prices = {};

    for (const [regionCode, region] of Object.entries(game.regions)) {
      try {
        const steam = await fetchSteamPrice(game.appid, region.cc);

        prices[regionCode] = {
          sourceCurrency: steam.currency,
          sourceInitial: steam.initial,
          sourceFinal: steam.final,
          oldAmount: toRubWithMarkup(
            steam.initial,
            region.rateToRub,
            game.markupPercent,
          ),
          amount: toRubWithMarkup(
            steam.final,
            region.rateToRub,
            game.markupPercent,
          ),
          discount:
            steam.discountPercent > 0 ? `-${steam.discountPercent}%` : "",
          updatedAt: new Date().toISOString(),
        };
      } catch (error) {
        prices[regionCode] = {
          error: error.message,
          updatedAt: new Date().toISOString(),
        };
      }
    }

    result.games.push({
      id: game.id,
      title: game.title,
      appid: game.appid,
      prices,
    });
  }

  await fs.writeFile(OUTPUT_PATH, JSON.stringify(result, null, 2), "utf8");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
