const BASE_URL = "https://api.exchangerate-api.com/v4/latest";

const dropDowns = document.querySelectorAll(".dropdown select");
const output = document.querySelector(".output");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector(".container button");
let amountInput = document.querySelector(".amount input");

for (let select of dropDowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "BDT") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}
const updateExchangeRate = async () => {

    let amountVal = amountInput.value;
    if (amountVal === "" || amountVal < 0) {
        amountVal = 1;
        amountInput.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value}`;

    let response = await fetch(URL);
    if (!response.ok) {
        alert("Error fetching exchange rates. Try again later.");
        return;
    }
    let data = await response.json();
    let rate = data.rates[toCurr.value];

    let finalAmt = amountVal * rate;
    output.innerText = `${amountVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
};
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});
amountInput.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter") {
        evt.preventDefault();
        updateExchangeRate();
    }
});
window.addEventListener("load", () => {
    updateExchangeRate();
});