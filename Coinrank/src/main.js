let table = document.getElementById('table-body');
let total = document.getElementById('total');
let exchange = document.getElementById('exchange');
let market = document.getElementById('market');
let volume = document.getElementById('volume');
let timer = document.getElementById('time');
let searchBar = document.getElementById('inputField');



const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=200&offset=0';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f6e310a94amsh87ab5217587d5b6p14ebe6jsn41cac24be106',
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();

    let results = result.data;
    let coins = results.coins;
    let stats = results.stats;

    showStats(stats);
    showCrypto(coins);

} catch (error) {
	console.error(error);
};

function showCrypto(coinsData) {
    searchBar.addEventListener('keyup', (e) => {
        // let coins = coinsData.filter(coin => coin.name.toLowerCase().includes(e.target.value.toLowerCase()));
        
        const inputValue = e.target.value;

        let filteredCoins = coinsData.filter(coin => {
            return coin.name.toLowerCase().includes(inputValue);
        })
        showCrypto(filteredCoins);
    })
    return table.innerHTML = coinsData.map((y) => {
        let { rank, name, price, iconUrl, symbol, change, marketCap } = y;
        // console.log(typeof price);
        return `
            <tr class="coin-charts">
            <th scope="row">${rank}</th>
            <td>
                <div class="d-flex align-items-center tabs gap-2">
                    <img class="tabs" src="${iconUrl}" width="25">
                    <span class="tabs">${name}</span>
                </div>
            </td>
            <td>${symbol}</td>
            <td>$${parseFloat(price).toFixed(6) }</td>
            <td>${change}</td>
            <td>$${Math.round(marketCap).toLocaleString()}</td>
            </tr>
        `;
    }).join('');
};

function showStats(stats) {
    total.innerText = stats.totalCoins;
    exchange.innerText = stats.totalExchanges;
    market.innerText = stats.totalMarkets;
    volume.innerText = `$${Math.floor(stats.total24hVolume).toLocaleString()}`;
}

let coinData = [];

function showTime() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date().getDay();
    const day = days[d];
    const newDate = new Date().toLocaleString();
    timer.innerHTML = `<span class="text-white">Today:</span><p class="time-now">${day}, ${newDate}</p>`;
}
showTime();
// console.log(coinData);

searchBar.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const coinName = searchBar.value;
        
        filteredCoins = coinData.filter((coin) => {
            return coin.name.toLowerCase().includes(coinName.toLowerCase());
        })
    }
}) 

