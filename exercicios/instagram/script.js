document.getElementById('feedIndex').addEventListener('click', function() {
    alert('Feed Index clicado! Aqui você pode adicionar funcionalidades futuras.');
});

// Função para buscar o Fear & Greed Index
async function fetchFearGreedIndex() {
    try {
        const response = await fetch('https://api.alternative.me/fng/?limit=1');
        const data = await response.json();
        const fearGreedValue = data.data[0].value;
        const fearGreedClassification = data.data[0].value_classification;

        document.getElementById('fearGreedValue').innerText = `${fearGreedValue} - ${fearGreedClassification}`;
        document.getElementById('fearGreedImage').src = fearGreedClassification === 'Greed' ? 
            'https://example.com/greed-image.png' : 
            'https://example.com/fear-image.png'; // Substitua por URLs de imagens reais
    } catch (error) {
        document.getElementById('fearGreedValue').innerText = 'Erro ao carregar dados';
    }
}

// Função para buscar as 10 principais criptomoedas
async function fetchTopCryptos() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();

        const cryptoList = document.getElementById('cryptoList');
        cryptoList.innerHTML = '';

        data.forEach(crypto => {
            const listItem = document.createElement('tr');
            listItem.innerHTML = `<td>${crypto.name} (${crypto.symbol.toUpperCase()})</td>
                                 <td><span class="red">$${crypto.current_price.toFixed(2)}</span></td>
                                 <td><span class="red">$${crypto.market_cap.toFixed(2)}</span></td>`;
            cryptoList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao carregar dados das criptomoedas:', error);
    }
}

// Chama as funções para carregar os dados
fetchFearGreedIndex();
fetchTopCryptos();


