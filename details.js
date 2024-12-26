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
    alert(error.message);
    throw error;
  }
};

const showDetails = async () => {
  let detail = document.querySelector(".detail");
  let name = localStorage.getItem("name");
  const data = await getAPI(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
  console.log(data);
  const fragment = document.createDocumentFragment();
  data.forEach((items) => {
    const {
      flags,
      name,
      population,
      region,
      subregion,
      capital,
      tld,
      currencies,
      languages,
      borders,
    } = items;
    const currenciesArr = [];
    const languagesArr = [];

    // Loop through currencies object and extract currency names
    for (const key in currencies) {
      if (currencies.hasOwnProperty(key) && currencies[key].name) {
        currenciesArr.push(currencies[key].name);
      }
    }

    // Loop through languages object and extract language names
    for (const key in languages) {
      if (languages.hasOwnProperty(key) && languages[key]) {
        languagesArr.push(languages[key]);
      }
    }

    // Create elements for country detail section
    const detailDiv = document.createElement("div");
    detailDiv.classList.add("detail__text");

    const img = document.createElement("img");
    img.src = flags.png;
    img.alt = flags.alt;

    const countryName = document.createElement("h2");
    countryName.classList.add(
      "country",
      "text--large",
      "text--800",
      "color--lm-clr"
    );
    countryName.textContent = name.common;

    // Add theme classes based on the current theme
    if (localStorage.getItem("theme") === "dark") {
      countryName.classList.add("color--dm-clr");
    } else {
      countryName.classList.add("color--lm-clr");
    }

    const detailTextTop = document.createElement("div");
    detailTextTop.classList.add("detail__text__top");

    const nativeName = document.createElement("p");
    nativeName.classList.add("native_name", "text--800", "color--lm-clr");
    nativeName.innerHTML = `Native Name: <span class="text--300">${name.official}</span>`;

    // Add theme classes based on the current theme
    if (localStorage.getItem("theme") === "dark") {
      nativeName.classList.add("color--dm-clr");
    } else {
      nativeName.classList.add("color--lm-clr");
    }

    const populationElem = document.createElement("p");
    populationElem.classList.add("population", "text--800", "color--lm-clr");
    populationElem.innerHTML = `Population: <span class="text--300">${population}</span>`;

    // Add theme classes based on the current theme
    if (localStorage.getItem("theme") === "dark") {
      populationElem.classList.add("color--dm-clr");
    } else {
      populationElem.classList.add("color--lm-clr");
    }

    const regionElem = document.createElement("p");
    regionElem.classList.add("region", "text--800", "color--lm-clr");
    regionElem.innerHTML = `Region: <span class="text--300">${region}</span>`;

    // Add theme classes based on the current theme
    if (localStorage.getItem("theme") === "dark") {
      regionElem.classList.add("color--dm-clr");
    } else {
      regionElem.classList.add("color--lm-clr");
    }

    const subRegionElem = document.createElement("p");
    subRegionElem.classList.add("sub_region", "text--800", "color--lm-clr");
    subRegionElem.innerHTML = `Sub Region: <span class="text--300">${subregion}</span>`;

    // Add theme classes based on the current theme
    if (localStorage.getItem("theme") === "dark") {
      subRegionElem.classList.add("color--dm-clr");
    } else {
      subRegionElem.classList.add("color--lm-clr");
    }
    const capitalElem = document.createElement("p");
    capitalElem.classList.add("capital", "text--800", "color--lm-clr");
    capitalElem.innerHTML = `Capital: <span class="text--300">${capital}</span>`;

    // Add theme classes based on the current theme
    if (localStorage.getItem("theme") === "dark") {
      capitalElem.classList.add("color--dm-clr");
    } else {
      capitalElem.classList.add("color--lm-clr");
    }
    const detailMid = document.createElement("div");
    detailMid.classList.add("detail__mid");

    const domainName = document.createElement("p");
    domainName.classList.add("domain_name", "text--800", "color--lm-clr");
    domainName.innerHTML = `Top Level Domain: <span class="text--300">${tld}</span>`;

    // Add theme classes based on the current theme
    if (localStorage.getItem("theme") === "dark") {
      domainName.classList.add("color--dm-clr");
    } else {
      domainName.classList.add("color--lm-clr");
    }

    const currenciesElem = document.createElement("p");
    currenciesElem.classList.add("currencies", "text--800", "color--lm-clr");
    currenciesElem.innerHTML = `Currencies: <span class="text--300">${currenciesArr.join(
      ", "
    )}</span>`;

    // Add theme classes based on the current theme
    if (localStorage.getItem("theme") === "dark") {
      currenciesElem.classList.add("color--dm-clr");
    } else {
      currenciesElem.classList.add("color--lm-clr");
    }

    const languagesElem = document.createElement("p");
    languagesElem.classList.add("Languages", "text--800", "color--lm-clr");
    languagesElem.innerHTML = `Languages: <span class="text--300">${languagesArr.join(
      ", "
    )}</span>`;

    // Add theme classes based on the current theme
    if (localStorage.getItem("theme") === "dark") {
      languagesElem.classList.add("color--dm-clr");
    } else {
      languagesElem.classList.add("color--lm-clr");
    }

    const detailBottom = document.createElement("div");
    detailBottom.classList.add("detail__bottom");

    const borderCountriesHeading = document.createElement("h3");
    borderCountriesHeading.classList.add(
      "text--800",
      "text--mid",
      "color--lm-clr"
    );
    borderCountriesHeading.textContent = "Border Countries:";

    // Add theme classes based on the current theme
    if (localStorage.getItem("theme") === "dark") {
      borderCountriesHeading.classList.add("color--dm-clr");
    } else {
      borderCountriesHeading.classList.add("color--lm-clr");
    }

    const borderContainer = document.createElement("div");
    borderContainer.classList.add("border", "row");

    // Loop through borders array and create border country elements
    if (borders) {
      borders.forEach((item) => {
        const borderCol = document.createElement("div");
        borderCol.classList.add(
          "border__col",
          "box-shadow",
          "background--lm-elements",
          "text--600",
          "color--lm-clr",
          "text--300"
        );
        borderCol.textContent = item;
        // Add theme classes based on the current theme
        if (localStorage.getItem("theme") === "dark") {
          borderCol.classList.add("color--dm-clr");
          borderCol.classList.add("background--dm-elements");
        } else {
          borderCol.classList.add("color--lm-clr");
          borderCol.classList.add("background--lm-elements");
        }
        borderContainer.appendChild(borderCol);
      });
    }

    // Append all created elements to their respective parent elements
    detailTextTop.appendChild(nativeName);
    detailTextTop.appendChild(populationElem);
    detailTextTop.appendChild(regionElem);
    detailTextTop.appendChild(subRegionElem);
    detailTextTop.appendChild(capitalElem);

    detailMid.appendChild(domainName);
    detailMid.appendChild(currenciesElem);
    detailMid.appendChild(languagesElem);

    detailBottom.appendChild(borderCountriesHeading);
    detailBottom.appendChild(borderContainer);

    detailDiv.appendChild(countryName);
    detailDiv.appendChild(detailTextTop);
    detailDiv.appendChild(detailMid);
    detailDiv.appendChild(detailBottom);

    fragment.appendChild(img);
    fragment.appendChild(detailDiv);
  });

  // Append the fragment to the detail element
  detail.appendChild(fragment);
};

showDetails();

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