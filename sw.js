// 최소한의 서비스워커 — 설치 가능(installable) 조건을 만족시키기 위한 용도입니다.
// 별도 캐싱/오프라인 기능은 없고, 네트워크 요청을 그대로 통과시킵니다.
self.addEventListener('install', () => {
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', () => {
  // 아무 것도 가로채지 않고 기본 네트워크 동작을 사용합니다.
});
