const CHROME_PATH =
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
const PROFILE_PATH = `${process.env["USERPROFILE"]}\\AppData\\Local\\Google\\Chrome\\User Data`;

const puppeteer = require("puppeteer-core");
const readlineSync = require("readline-sync");

let channel = readlineSync.question("https://www.twitch.tv/");
let amountOfCollect = 0;

async function openBrowser() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    executablePath: CHROME_PATH,
    userDataDir: PROFILE_PATH,
    args: ["--disable-extensions"],
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.goto(`https://www.twitch.tv/${channel}`);
  // await page.addScriptTag({ path: "functions.js" });

  console.log("Waiting to collect...");

  teste2(page)
}

async function collectPoints(page) { {
  return await page.evaluate(async () => {
      return await new Promise(resolve => {
        setTimeout(() => {
          let chestPoints = document.querySelector(".community-points-summary .tw-z-above button.tw-button");
          if (chestPoints) {chestPoints.click();}
          
          resolve(chestPoints);
        }, 8000)
    })
  })
}  
}

// function collectPoints(page) {
//   return await page.evaluate(async () => {
//     return await new Promise(resolve => {
//       setTimeout(() => {
//         let chestPoints = document.querySelector(
//           ".community-points-summary .tw-z-above button.tw-button"
//         );

//         if (chestPoints) {
//           chestPoints.click();
//         }
//       }, 8000);
//     }
//   },)
// }

async function teste2(page) {
  x = await collectPoints(page);
  teste(x, page)
}

function teste(x, page) {
  if (x) {
    console.log(
      `[${(amountOfCollect += 1)}] Bonus Chest Clicked. ` + timeString()
    );
    teste2(page);
  } else {
    console.log("Chest Unavailable " + timeString());
    teste2(page);
  }
}

function timeString() {
  let date = new Date();

  hour = date.getHours();
  minute = date.getMinutes();

  return hour + ":" + minute;
}

openBrowser();
