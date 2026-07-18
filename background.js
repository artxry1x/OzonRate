chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ currency: 'RUB', rate: 1 });
});