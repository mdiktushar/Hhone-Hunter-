const loadPhones = async (value, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${value}`;
  const Response = await fetch(url);
  const data = await Response.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phone-container");
  phonesContainer.textContent = "";
  //   display 10 phones only
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  //No Phone found
  const noPhone = document.getElementById("no-phone").classList;
  !phones.length ? noPhone.remove("d-none") : noPhone.add("d-none");

  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="" />
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">
                ${phone.slug}
            </p>
            <h6>Brane: ${phone.brand}</h6>
            </div>
        </div>
        `;
    phonesContainer.appendChild(phoneDiv);
  });
  toggleSpinner(false);
  console.log(phones);
};


const processSearch = dataLimit => {
    // start loader
    toggleSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById("btn-search").addEventListener("click", () => {
 processSearch(10)
});

const toggleSpinner = (isLoading) => {
  const loader = document.getElementById("loader");
  isLoading
    ? loader.classList.remove("d-none")
    : loader.classList.add("d-none");
};

document.getElementById('btn-show-all').addEventListener('click', () => {
  processSearch()
})