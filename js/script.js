const selectBoxes = document.querySelectorAll(".select-box");
const form = document.querySelector("form");
const amountInput = document.querySelector(".enter-amount");
const convertedAmountInput = document.querySelector(".converted-amount");
const fromSelect = document.querySelector("#from-select");
const toSelect = document.querySelector("#to-select");
const swapButton = document.querySelector(".icon i");

selectBoxes.forEach((box) => {
  const flag = box.querySelector(".flag-icon");
  const select = box.querySelector("select");

  const updateFlag = () => {
    const selectedOption = select.options[select.selectedIndex];
    flag.src = selectedOption.dataset.flag;
    flag.alt = `${selectedOption.value} flag`;
  };

  select.addEventListener("change", updateFlag);
  updateFlag();
});

async function getRate(fromCurrency, toCurrency) {
  const urls = [
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`,
    `https://latest.currency-api.pages.dev/v1/currencies/${fromCurrency}.json`,
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      const exchangeRate = data?.[fromCurrency]?.[toCurrency];

      if (exchangeRate) {
        return exchangeRate;
      }
    } catch (error) {
      continue;
    }
  }

  throw new Error("Exchange rate is unavailable.");
}

function formatMoney(amount, currency) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: currency === "vnd" ? 0 : 2,
  }).format(amount);
}

async function calculateExchange() {
  const amount = Number(amountInput.value);
  const fromCurrency = fromSelect.value;
  const toCurrency = toSelect.value;

  if (!amountInput.value || Number.isNaN(amount) || amount < 0) {
    convertedAmountInput.value = "Please enter a valid amount";
    return;
  }

  convertedAmountInput.value = "Loading...";

  try {
    const exchangeRate = await getRate(fromCurrency, toCurrency);
    const convertedAmount = amount * exchangeRate;
    convertedAmountInput.value = `${formatMoney(convertedAmount, toCurrency)} ${toCurrency.toUpperCase()}`;
  } catch (error) {
    convertedAmountInput.value = "Rate unavailable";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  calculateExchange();
});

swapButton.addEventListener("click", () => {
  const fromValue = fromSelect.value;

  fromSelect.value = toSelect.value;
  toSelect.value = fromValue;

  fromSelect.dispatchEvent(new Event("change"));
  toSelect.dispatchEvent(new Event("change"));
  calculateExchange();
});
