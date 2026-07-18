async function convertPrices() {
  const storageData = await new Promise(r => chrome.storage.local.get(['currency', 'rate'], r));
  const { currency, rate } = storageData;
  if (currency === 'RUB') return;

  const symbol = currency === 'EUR' ? '€' : '$';
  
  const mainSelectors = ['.tsHeadline500Medium', '.tsHeadline600Large', '.tsHeadline400Small', '[data-testid="balance"]'];

  mainSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (el.innerText.includes('€') || el.innerText.includes('$')) return;
      const priceRUB = parseFloat(el.innerText.replace(',', '.').replace(/[^\d.]/g, ''));
      if (!isNaN(priceRUB) && priceRUB > 0) el.innerText = `${(priceRUB * rate).toFixed(2)} ${symbol}`;
    });
  });

  document.querySelectorAll('span, div').forEach(el => {
    if (el.innerText.includes('₽') && !el.querySelector('span, div') && el.innerText.length < 15 && !el.className.includes('tsHeadline')) {
      el.style.textDecoration = 'line-through';
      const priceRUB = parseFloat(el.innerText.replace(',', '.').replace(/[^\d.]/g, ''));
      if (!isNaN(priceRUB) && priceRUB > 0) el.innerText = `${(priceRUB * rate).toFixed(2)} ${symbol}`;
    }
  });
}

const observer = new MutationObserver(convertPrices);
observer.observe(document.body, { childList: true, subtree: true });
convertPrices();