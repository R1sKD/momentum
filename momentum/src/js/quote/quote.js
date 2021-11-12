const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotes(lang) {
  const quotes = `./js/quote/quotes[${lang}].json`;
  const res = await fetch(quotes);
  const data = await res.json();
  return data;
}

let quoteLang;
export async function showQuote(language) {
  quoteLang = language;
  const quotes = await getQuotes(language);
  let length = quotes.length;
  let index = getRandomNum(length);
  quote.textContent = quotes[index].text;
  author.textContent = quotes[index].author;
}
showQuote('en');

function getRandomNum(length) {
  return Math.floor(Math.random() * length);
}

changeQuote.addEventListener('click', () => showQuote(quoteLang));