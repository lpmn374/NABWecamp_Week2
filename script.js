const fromCurrency = document.querySelector("#from-select");
const toCurrency = document.querySelector("to-select");


// Get exchange rate from fromCurrency to toCurrency
async function getRate(fromCurrency, toCurrency) {
    const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`);
    const data = await response.json();

    const exchangeRate = data?.[fromCurrency]?.[toCurrency];

    console.log(exchangeRate);      // Test

    return exchangeRate;
}

getRate('aud', 'vnd');      // Test function

// Get final currency

const amount = document.getElementById('enter-amount');
async function calculateExchange(amount) {
    const exchangeRate = await getRate(fromCurrency, toCurrency);
    console.log(amount * exchangeRate);
    return amount * exchangeRate;
}


//Xử lý click event
Gamepad

const exchangeButton = document.getElementById('get-exchange');
exchangeButton.addEventListener('click', () => {
    calculateExchange(amount);
    
})