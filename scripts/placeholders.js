const fs = require("fs");
const path = require("path");

const dir = path.join("public", "placeholders");
fs.mkdirSync(dir, { recursive: true });

const items = [
  ["hero-dining", "Dining room at dusk", "#2B3623", "#3D4A31", 1440, 620],
  ["about-room", "Room / chef's pass", "#3D4A31", "#4E7A52", 900, 460],
  ["dish-chicken", "Chargrilled chicken", "#8E4426", "#B65A34", 800, 260],
  ["dish-fish", "Market fish over coals", "#3A352E", "#6E675D", 800, 260],
  ["dish-risotto", "Wild mushroom risotto", "#3D4A31", "#6E675D", 800, 260],
  ["dish-lamb", "Lamb shoulder", "#2B3623", "#8E4426", 800, 300],
  ["dish-cauliflower", "Coal-roast cauliflower", "#4E7A52", "#3D4A31", 800, 260],
  ["dish-bread", "Wood-fired flatbread", "#B65A34", "#8E4426", 800, 260],
  ["dish-sardines", "Sardines on toast", "#3A352E", "#B65A34", 800, 260],
  ["dish-burrata", "Burrata and peaches", "#8E4426", "#C08A2E", 800, 260],
  ["dish-squid", "Salt and pepper squid", "#3D4A31", "#23201C", 800, 260],
  ["dish-cake", "Olive oil cake", "#C08A2E", "#B65A34", 800, 260],
  ["dish-pudding", "Sticky date pudding", "#8E4426", "#3A352E", 800, 260],
  ["dish-affogato", "Affogato", "#23201C", "#3D4A31", 800, 260],
  ["dish-drink", "House vermouth", "#3D4A31", "#E3C9A8", 800, 260],
  ["dish-wine", "Yarra pinot", "#2B3623", "#B65A34", 800, 260],
  ["menu-hero", "Plated dish, overhead", "#23201C", "#3D4A31", 1440, 340],
  ["about-hero", "Restaurant portrait", "#3A352E", "#3D4A31", 900, 520],
  ["chef", "Chef portrait", "#23201C", "#4E7A52", 900, 460],
  ["gallery-1", "Room detail", "#3D4A31", "#6E675D", 800, 294],
  ["gallery-2", "Produce", "#4E7A52", "#3D4A31", 600, 294],
  ["gallery-3", "Wine / service", "#8E4426", "#3A352E", 600, 294],
  ["map", "Fitzroy map", "#E6E1D6", "#3D4A31", 900, 480],
];

for (const [id, caption, a, b, w, h] of items) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="40" y="${h - 36}" fill="#E3C9A8" font-family="Georgia, serif" font-size="18">TODO: ${caption}</text>
</svg>`;
  fs.writeFileSync(path.join(dir, `${id}.svg`), svg);
}

console.log("wrote", items.length, "placeholders");
