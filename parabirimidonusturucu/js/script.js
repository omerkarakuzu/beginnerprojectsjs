const dropList = document.querySelectorAll(".drop-list select"),
  fromCurrency = document.querySelector(".from select"),
  toCurrency = document.querySelector(".to select"),
  getButton = document.querySelector("form button");
for (let i = 0; i < dropList.length; i++) {
  for (currency_code in country_code) {
    let selected;
    if (i == 0) {
      selected = currency_code == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = currency_code == "TRY" ? "selected" : "";
    }
    //console.log(currency_code);
    let optionTag = `
    
    <option value="${currency_code}" ${selected}>${currency_code}
    </option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}
function loadFlag(bayrak) {
  for (code in country_code) {
    if (code == bayrak.value) {
      let imgTag = bayrak.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${country_code[
        code
      ].toLowerCase()}.png`;
    }
  }
}

window.addEventListener("load", () => {
  getExchangeRate();
});

getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
  console.log("tiklandi");
});

const exchangeIcon = document.querySelector(".drop-list .icon");

exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
});

function getExchangeRate() {
  const amount = document.querySelector(".amount input");
  const exchangeRateTxt = document.querySelector(".exchange-rate");
  let amountVal = amount.value;
  // Kullanici deger girmezse varsayilan olarak 1 degerini veriyoruz.
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }
  exchangeRateTxt.innerHTML = "Hesaplanıyor...";
  let url = `https://v6.exchangerate-api.com/v6/3122c9b83c27bcdbdcf08ceb/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      //console.log(exchangeRate);
      let totalExchangeRate = (amountVal * exchangeRate).toFixed(3);
      //console.log(totalExchangeRate);
      exchangeRateTxt.innerHTML = `${amountVal} ${fromCurrency.value}  = ${totalExchangeRate} ${toCurrency.value}`;
    })
    .catch(() => {
      //Kullanici cevrimdisi ise vs.
      exchangeRateTxt.innerHTML = "Bi' şeyler ters gitti.";
    });
}
