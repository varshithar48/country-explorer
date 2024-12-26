const filterIcon = document.querySelector(".filter__icon");
const filterOptions = document.querySelector(".filter__options");

filterIcon.addEventListener("click", () => {
  filterOptions.classList.toggle("active");
});

const loadingIndicator = document.querySelector(".loading_indicator");

// Fetches the data from the API
const getAPI = async (url) => {
  try {
    loadingIndicator.classList.add("show");
    const response = await fetch(url);
    const data = await response.json();
    loadingIndicator.classList.remove("show");
    return data;
  } catch (error) {
    console.log(error);
   // alert(error.message);
    throw error;
  }
};

const countries = document.querySelector(".countries");


const countryMarkup = (items) => {
  const { flags, name, population, continents, capital } = items;
  
  const fragment = document.createDocumentFragment();


  const countryElement = document.createElement("div");
  countryElement.classList.add(
    "countries__col",
    "row",
    "box-shadow",
    "fd--col"
  );

  
  const linkElement = document.createElement("a");
  linkElement.href = "details.html";

  
  linkElement.addEventListener("click", () => {
    localStorage.setItem("name", name.common);
  });


  const imageElement = document.createElement("img");
  imageElement.src = flags.png;
  imageElement.alt = flags.alt;
  imageElement.loading = "lazy";
  imageElement.classList.add("flag");


  const informationElement = document.createElement("div");
  informationElement.classList.add("information", "background--lm-elements");

  
  if (localStorage.getItem("theme") === "dark") {
    informationElement.classList.add("background--dm-elements");
  } else {
    informationElement.classList.add("background--lm-elements");
  }

  // Create the country name element
  const nameElement = document.createElement("h2");
  nameElement.classList.add("text--large", "text--800", "color--lm-clr");
  nameElement.textContent = name.common;

  // Add theme classes based on the current theme
  if (localStorage.getItem("theme") === "dark") {
    nameElement.classList.add("color--dm-clr");
  } else {
    nameElement.classList.add("color--lm-clr");
  }

  // Create the population element
  const populationElement = document.createElement("p");
  populationElement.classList.add(
    "population",
    "text--mid",
    "text--600",
    "color--lm-clr"
  );
  populationElement.innerHTML = `Population: <span class="text--300">${population}</span>`;

  // Add theme classes based on the current theme
  if (localStorage.getItem("theme") === "dark") {
    populationElement.classList.add("color--dm-clr");
  } else {
    populationElement.classList.add("color--lm-clr");
  }

  // Create the region element
  const regionElement = document.createElement("p");
  regionElement.classList.add(
    "region",
    "text--mid",
    "text--600",
    "color--lm-clr"
  );
  regionElement.innerHTML = `Region: <span class="text--300">${continents[0]}</span>`;

  // Add theme classes based on the current theme
  if (localStorage.getItem("theme") === "dark") {
    regionElement.classList.add("color--dm-clr");
  } else {
    regionElement.classList.add("color--lm-clr");
  }

  // Create the capital element
  const capitalElement = document.createElement("p");
  capitalElement.classList.add(
    "capital",
    "text--mid",
    "text--600",
    "color--lm-clr"
  );
  capitalElement.innerHTML = `Capital: <span class="text--300">${capital}</span>`;

  // Add theme classes based on the current theme
  if (localStorage.getItem("theme") === "dark") {
    capitalElement.classList.add("color--dm-clr");
  } else {
    capitalElement.classList.add("color--lm-clr");
  }

  // Append elements to their respective parents
  informationElement.appendChild(nameElement);
  informationElement.appendChild(populationElement);
  informationElement.appendChild(regionElement);
  informationElement.appendChild(capitalElement);

  linkElement.appendChild(imageElement);
  linkElement.appendChild(informationElement);

  countryElement.appendChild(linkElement);

  // Append the country element to the document fragment
  fragment.appendChild(countryElement);

  // Append the fragment to the countries container
  countries.appendChild(fragment);
};

// Display countries from the API
const displayCountries = async () => {
  const data = await getAPI("https://restcountries.com/v3.1/all");
  data.forEach((items) => {
    countryMarkup(items);
  });
};

displayCountries();

const SearchInput = document.querySelector(".search__input");

// Searches countries according to name
const searchCountries = async (searchVal) => {
  const data = await getAPI(`https://restcountries.com/v3.1/name/${searchVal}`);
  countries.innerHTML = "";
  data.forEach((items) => {
    countryMarkup(items);
  });
};

let debounceTimer;
SearchInput.addEventListener("input", () => {
  // Clear the previous timer
  clearTimeout(debounceTimer);

  // Set a new timer to delay the API call
  debounceTimer = setTimeout(() => {
    if (SearchInput.value !== "") {
      searchCountries(SearchInput.value);
      filterSelectText.textContent = "Filter by region";
    } else {
      countries.innerHTML = "";
      displayCountries();
    }
  }, 300);
});

const filterSelectText = document.querySelector(".filter__select__text");

// Filters countries according to region
const filterCountries = async (filterVal) => {
  const data = await getAPI(
    `https://restcountries.com/v3.1/region/${filterVal}`
  );
  countries.innerHTML = "";
  data.forEach((items) => {
    countryMarkup(items);
  });
};

filterOptions.addEventListener("click", (e) => {
  const target = e.target;
  if (target.matches("li")) {
    filterSelectText.textContent = target.textContent;
    filterCountries(target.textContent);
    filterOptions.classList.remove("active");
  }
});

const switchBtn = document.querySelector(".switch");

const switchTheme = () => {
  const body = document.querySelector("body");

  const lightModeBg = document.querySelectorAll(".background--lm-bg");
  lightModeBg.forEach((items) => items.classList.toggle("background--dm-bg"));

  const lightModeElementsBg = document.querySelectorAll(
    ".background--lm-elements"
  );
  lightModeElementsBg.forEach((items) =>
    items.classList.toggle("background--dm-elements")
  );

  const lightModeClrText = document.querySelectorAll(".color--lm-clr");
  lightModeClrText.forEach((items) => items.classList.toggle("color--dm-clr"));

  if (body.classList.contains("background--dm-bg")) {
    setTheme("dark");
  } else {
    setTheme("light");
  }
};

switchBtn.addEventListener("click", switchTheme);

function setTheme(theme) {
  localStorage.setItem("theme", theme);
}

function checkTheme() {
  const theme = localStorage.getItem("theme");
  if (theme == "dark") {
    switchTheme();
  }
}

checkTheme();