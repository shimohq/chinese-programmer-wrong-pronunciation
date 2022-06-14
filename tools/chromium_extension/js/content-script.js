(async () => {
  let app = await import(chrome.runtime.getURL("js/app/init.js"));
  app.init();
})();
