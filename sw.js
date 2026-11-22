/* 이야기꾼의 등불: 게임 파일을 기기에 담아 두어 빨리 열리게 함. AI 호출(다른 주소)은 건드리지 않음 */
const CACHE = 'lantern-v14';
const FILES = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "img/camp.png", "img/castle.png", "img/cave.png", "img/die_obsidian.png", "img/dungeon.png", "img/field.png", "img/forest.png", "img/m_assassin.png", "img/m_bandit.png", "img/m_cultist.png", "img/m_dark_mage.png", "img/m_dragon.png", "img/m_giant_spider.png", "img/m_goblin.png", "img/m_knight.png", "img/m_orc.png", "img/m_pirate.png", "img/m_skeleton.png", "img/m_slime.png", "img/m_wolf.png", "img/river.png", "img/ruins.png", "img/s_city.png", "img/s_coast.png", "img/s_highland.png", "img/s_snowpeak.png", "img/s_swamp.png", "img/s_tavern.png", "img/s_temple.png", "img/s_wasteland.png", "img/shop.png", "img/village.png", "img/worldmap.png"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  /* 새 버전을 올리면 바로 반영되도록: 먼저 네트워크, 안 되면 저장해 둔 것 */
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); return r; }).catch(() => caches.match(e.request, {ignoreSearch: true})));
});
