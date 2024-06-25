let searchedTransactionData;
let conditionSortDate = true;
// selector
const btnLoadData = document.querySelector("#btn-load-data");
const searchInput = document.querySelector("#search-input");
const heroSection = document.querySelector("#hero-section");
const transactionsDOM = document.querySelector("#transactions-center");
const btnSortDate = document.querySelector("#chevron-date");
const btnSortPrice = document.querySelector("#chevron-price");
// event
btnLoadData.addEventListener("click", () => {
  axios
    .get("http://localhost:3000/transactions")
    .then((res) => {
      console.log(res.data);

      btnLoadData.classList.add("hidden");
      searchInput.classList.remove("hidden");
      heroSection.classList.remove("hidden");
      renderTransactions(res.data);
    })
    .catch((err) => console.log(err));
});

searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);

  axios
    .get(`http://localhost:3000/transactions?refId_like=${e.target.value}`)
    .then((res) => {
      console.log(res.data);
      searchedTransactionData = res.data;
      renderTransactions(res.data);
    })
    .catch((err) => console.log(err));
});

btnSortDate.addEventListener("click", () => {
  axios
    .get(
      `http://localhost:3000/transactions?_sort=date&_order=${
        conditionSortDate === true ? "asc" : "desc"
      }`,
    )
    .then((res) => {
      console.log(res.data);
      searchedTransactionData = res.data;
      renderTransactions(res.data);
    })
    .catch((err) => console.log(err));
  if (conditionSortDate) {
    btnSortDate.classList.remove("out");
    btnSortDate.classList.add("over");
  } else {
    btnSortDate.classList.add("out");
    btnSortDate.classList.remove("over");
  }
  conditionSortDate = !conditionSortDate;
});

btnSortPrice.addEventListener("click", () => {
  axios
    .get(
      `http://localhost:3000/transactions?_sort=price&_order=${
        conditionSortDate === true ? "asc" : "desc"
      }`,
    )
    .then((res) => {
      console.log(res.data);
      searchedTransactionData = res.data;
      renderTransactions(res.data);
    })
    .catch((err) => console.log(err));
  if (conditionSortDate) {
    btnSortPrice.classList.remove("out");
    btnSortPrice.classList.add("over");
  } else {
    btnSortPrice.classList.add("out");
    btnSortPrice.classList.remove("over");
  }
  conditionSortDate = !conditionSortDate;
});

// function

function renderTransactions(transactions) {
  transactionsDOM.innerHTML = "";
  transactions.forEach((item) => {
    const transactionTr = document.createElement("tr");
    transactionTr.classList.add("border-t");
    transactionTr.classList.add("text-center");
    console.log(new Date(item.date));
    transactionTr.innerHTML = `
        <td class="p-5">${item.id}</td>
                <td class="${item.type === "افزایش اعتبار" ? "green" : "red"}" >${
      item.type
    }</td>
                <td>${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td>${item.refId}</td>
                <td>${new Date(item.date).toLocaleDateString("fa-IR")} ساعت  ${new Date(
      item.date,
    ).toLocaleTimeString("fa-IR", {
      timeZone: "Asia/Tehran",
      hour: "2-digit",
      minute: "2-digit",
    })}</td>
        `;
    transactionsDOM.appendChild(transactionTr);
  });
}
