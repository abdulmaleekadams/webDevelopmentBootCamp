const data = {
  loading: true,
  countryList: null,
  countryCodeMapping: {},
};

// DOM Element

const countriesList = document.querySelector('#countriesList'),
  selectedField = document.getElementById('selectField'),
  selectedText = document.getElementById('selectText'),
  list = document.getElementById('list'),
  options = document.querySelectorAll('.options'),
  arrowIcon = document.getElementById('arrow'),
  searchInput = document.getElementById('search'),
  mode = document.querySelector('#mode');

async function getCountries() {
  const countryApiURL =
    'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,cca3';
  try {
    const response = await fetch(countryApiURL);
    if (!response.ok) {
      throw new Error('Network response is not ok');
    }
    data.countryList = await response.json();
    data.loading = false;
  } catch (error) {
    console.error('Error laoding JSON: ', error);
    data.loading = false;
  } finally {
    if (data.loading) {
      console.log('Loading');
      document.querySelector('main').innerHTML = '<h2>Loading</h2>';
    } else {
      renderCountriesList(data.countryList);
      enableEVenlistener();
      checkCountry();
      data.countryList.forEach((country) => {
        const countryCode = country.cca3;
        const countryName = country.name.common;
        data.countryCodeMapping[countryCode] = countryName;
      });
    }
  }
}

function createCountryList(parent, countriesData) {
  if (countriesData !== null) {
    countriesData.map((country, idx) => {
      const { name, flags, population, region, capital } = country;
      parent.insertAdjacentHTML(
        'beforeend',
        `<section class="bd-rd card country" id="${idx}">
    <img src="${flags.svg}" alt="${name.common} flag" />
    
    <h2>${name.common}</h2>
    <h3>Population: <span>${population.toLocaleString()}</span></h3>
    <h3>Region: <span>${region}</span></h3>
    <h3>Capital: <span>${capital}</span></h3>
    
    </section>`
      );
    });
  }
}

function enableEVenlistener() {
  document
    .querySelectorAll('.options')
    .forEach((option) => option.addEventListener('click', filterCountry));

  searchInput.addEventListener('keyup', searchCountry);
  searchInput.addEventListener('keydown', searchCountry);
  searchInput.addEventListener('click', searchCountry);

  document.querySelectorAll('.country').forEach((country) => {
    country.addEventListener('click', getDetail);
  });
}

function searchCountry(e) {
  list.classList.add('hide');
  let searchInput = e.target.value.trim().toLowerCase();
  if (searchInput !== '') {
    countriesList.innerHTML = '';
    const searchQuery = data.countryList.filter((country) => {
      let countryName = country.name.common.toLowerCase();
      return countryName.includes(searchInput);
    });
    window.scrollTo(0, 0);
    createCountryList(countriesList, searchQuery);
    checkCountry();
    document.querySelectorAll('.country').forEach((country) => {
      country.addEventListener('click', getDetail);
    });
  }
}

function renderCountriesList(countries) {
  let regions = [...new Set(data.countryList.map((country) => country.region))];
  regions.map((region, idx) => {
    list.insertAdjacentHTML(
      'beforeend',
      `<li class="options">
              <p>${region}</p>
            </li>`
    );
  });
  createCountryList(countriesList, countries);
}

// Filter country list by region
function filterCountry(e) {
  arrowIcon.classList.toggle('rotate');
  list.classList.toggle('hide');
  selectedText.innerText = e.target.innerText;

  const filterData = data.countryList.filter((country) => {
    return country.region === e.target.innerText;
  });
  countriesList.innerHTML = '';
  window.scrollTo(0, 0);
  createCountryList(countriesList, filterData);
  checkCountry();
  document.querySelectorAll('.country').forEach((country) => {
    country.addEventListener('click', getDetail);
  });
}

// Toggle Region List visibility
selectedField.addEventListener('click', (e) => {
  list.classList.toggle('hide');
  arrowIcon.classList.toggle('rotate');
});

document.addEventListener('click', (e) => {
  if (!list.contains(e.target) && e.target !== selectedField) {
    list.classList.add('hide');
    arrowIcon.classList.remove('rotate');
  }
});

// Country UI Animation
function checkCountry() {
  const countriesCard = document.querySelectorAll('.country');
  const triggerBottom = (window.innerHeight / 10) * 9;

  countriesCard.forEach((country) => {
    const countryTop = country.getBoundingClientRect().top;
    if (countryTop < triggerBottom) {
      country.classList.add('show');
    }
  });
}

// toggle mode
function toggleMode() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.toggle('light');
  } else {
    document.body.classList.toggle('dark');
  }
}

// get specific country detail
function getDetail(e) {
  let details = [];
  const parentEl = e.target.parentElement;
  const countryName = parentEl.querySelector('h2').innerText;

  getCountryDetails(countryName, details);

  document.querySelector('main').classList.add('hideCountryList');
}

// request specific country detail
async function getCountryDetails(countryName, dataResponse) {
  let loading = true;
  const url = `https://restcountries.com/v3.1/name/${countryName}?fields=name,currencies,capital,languages,population,flags,subregion,region,tld,borders`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response is not ok');
    }
    dataResponse = await response.json();
    loading = false;
  } catch (error) {
    console.error('Error laoding JSON: ', error);
    loading = false;
  } finally {
    if (loading) {
      console.log('Loading');
    } else {
      rendergetCountryDetails(dataResponse);
    }
  }
}

function rendergetCountryDetails(country) {
  countriesList;
  const {
    flags,
    name,
    tld,
    currencies,
    capital,
    region,
    subregion,
    languages,
    population,
    borders,
  } = country[0];

  const nativeNamesKey = Object.keys(name.nativeName);
  const lastKeyValue = nativeNamesKey[nativeNamesKey.length - 1];
  const nativeName = name.nativeName[lastKeyValue].common;

  const currAbbr = Object.keys(currencies);

  document.querySelector('main').insertAdjacentHTML(
    'beforeend',
    `<section class='containerPadding countryDetail'>
    <button class="card" id='back'>Back</button>

    <section class='details flex'>
    <img src='${flags.svg}' alt='${flags.alt}'/>

    <section class="flex text">
    <h2>${name.common}</h2>

    <section class='flex fields'>
    <section>
    <p><b>Native Name:</b> ${nativeName}</p>
    <p><b>Population:</b> ${population.toLocaleString()}</p>
    <p><b>Region:</b> ${region}</p>
    <p><b>Sub Region:</b> ${subregion}</p>
    <p><b>Capital:</b> ${capital}</p>
    </section>

    <section >
    <p><b>Top Level Domain:</b> ${tld}</p>
    <p><b>Currencies:</b> ${currencies[currAbbr[0]].name}</p>
    <p><b>Languages:</b> ${Object.values(languages)
      .map((language) => language)
      .join(',')}</p>
    </section>
    </section>

    <section class='borders'>
    <p class='flex'><b>
    Border Countries:
    </b>
    ${borders
      .map(
        (border) =>
          `<span class='card'>${data.countryCodeMapping[border]}</span>`
      )
      .join('')}
    </p>
    </section>
    </section>

    </section>

    </section>`
  );

  document.querySelector('#back').addEventListener('click', goToAllCountries);
}

function goToAllCountries() {
  const countryDetails = document.querySelector('.countryDetail');
  setTimeout(
    () => document.querySelector('main').classList.remove('hideCountryList'),
    1000
  );
  document.querySelector('main').removeChild(countryDetails);
}

getCountries();
mode.addEventListener('click', toggleMode);
window.addEventListener('scroll', checkCountry);
// https://restcountries.com/v3.1/alpha/fra?fields=name
