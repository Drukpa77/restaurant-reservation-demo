/** Production photography stand-ins for the client demo. Swap for owned assets later. */
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const photos = {
  hero: u("photo-1559339352-11d035aa65de"),
  diningRoom: u("photo-1517248135467-4c7edcad34c4"),
  menuHero: u("photo-1414235077428-338989a2e8c0"),
  chef: u("photo-1577219491135-ce391730fb2c"),
  galleryRoom: u("photo-1466978913421-dad2ebd01b17"),
  galleryProduce: u("photo-1540420773420-3366772f4999"),
  galleryWine: u("photo-1510812431401-41d2bd2722f3"),
  map: u("photo-1524661135-423995f22d0b"),
  chicken: u("photo-1598103442097-8b74394b95c6"),
  fish: u("photo-1519708227418-c8fd9a32b7a2"),
  risotto: u("photo-1476124369491-e7addf5db371"),
  lamb: u("photo-1529692236671-f1f6cf9683ba"),
  cauliflower: u("photo-1568584711075-3d021a7c3ca3"),
  bread: u("photo-1549931319-a545dcf3bc73"),
  sardines: u("photo-1485921325833-c519f76c4927"),
  burrata: u("photo-1608897013039-887f21d8c804"),
  squid: u("photo-1559737558-2f5a35f4523b"),
  cake: u("photo-1578985545062-69928b1d9587"),
  pudding: u("photo-1488477181946-6428a0291777"),
  affogato: u("photo-1485808191679-5f86510681a2"),
  drink: u("photo-1514362545857-3bc16c4c7d1b"),
  wine: u("photo-1510812431401-41d2bd2722f3"),
};

export const dishPhotos: Record<string, string> = {
  flatbread: photos.bread,
  sardines: photos.sardines,
  burrata: photos.burrata,
  squid: photos.squid,
  chicken: photos.chicken,
  fish: photos.fish,
  lamb: photos.lamb,
  risotto: photos.risotto,
  cauliflower: photos.cauliflower,
  cake: photos.cake,
  pudding: photos.pudding,
  affogato: photos.affogato,
  vermouth: photos.drink,
  "wine-red": photos.wine,
};
