chrome.storage.local.get(['currency'], (result) => {
  const current = result.currency || 'RUB';
  const btn = document.getElementById(current);
  if (btn) btn.classList.add('active');
});

document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    const currency = btn.id;
    let rate = 1;
    if (currency === 'EUR') rate = 0.011;
    if (currency === 'USD') rate = 0.012;
    chrome.storage.local.set({ currency, rate }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) chrome.tabs.reload(tabs[0].id);
        window.close();
      });
    });
  });
});