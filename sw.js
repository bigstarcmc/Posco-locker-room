// 최소한의 서비스워커 — 설치 가능(installable) 조건을 만족시키기 위한 용도입니다.
// 캐싱은 절대 하지 않고, 항상 네트워크에서 최신 버전을 받아오도록 강제합니다.
const CACHE_BUSTER = true; // 이 파일 자체가 바뀌면 브라우저가 서비스워커도 새로 받아옵니다.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    Promise.all([
      self.clients.claim(),
      // 혹시 예전 버전에서 만들어둔 캐시가 있다면 전부 삭제
      caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
    ])
  );
});

self.addEventListener('fetch', (event) => {
  // 페이지 이동(HTML) 요청은 캐시를 아예 건너뛰고 항상 네트워크에서 새로 받아옵니다.
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request, { cache: 'no-store' }));
  }
  // 그 외 요청은 브라우저 기본 동작을 사용합니다 (가로채지 않음).
});
