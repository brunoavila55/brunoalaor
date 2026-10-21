import { chromium } from "@playwright/test";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
page.on("pageerror", (e) => console.log("PAGE ERROR", e.message));
page.on("console", (e) => {
  if (e.type() === "error") console.log("CONSOLE ERROR", e.text());
});
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(1800);
await page.screenshot({ path: "outputs/desktop.png", fullPage: true });
console.log(await page.title());
console.log(
  "overflow",
  await page.evaluate(() => ({
    viewport: innerWidth,
    body: document.documentElement.scrollWidth,
  })),
);
await page.setViewportSize({ width: 390, height: 844 });
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(1800);
await page.screenshot({ path: "outputs/mobile.png", fullPage: true });
console.log(
  "mobile overflow",
  await page.evaluate(() => ({
    viewport: innerWidth,
    body: document.documentElement.scrollWidth,
  })),
);
await browser.close();
