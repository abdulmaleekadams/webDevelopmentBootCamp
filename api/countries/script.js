const data = {
  loading: true,
  countryList: null,
};

// DOM Element

const countriesList = document.querySelector('#countriesList'),
  selectedField = document.getElementById('selectField'),
  selectedText = document.getElementById('selectText'),
  list = document.getElementById('list'),
  options = document.querySelectorAll('.options'),
  arrowIcon = document.getElementById('arrow'),
  mode = document.querySelector('#mode');

const countryApiURL =
  'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population';
async function getCountries(url) {
  try {
    const response = await fetch(url);
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
      document.querySelector('main').innerHTML = '<h2>Loading</h2>';
    }
    renderCountriesList(data.countryList);
    enableEVenlistener();
    checkCountry();
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
    <section class="about">
    <h2>${name.common}</h2>
    <h3>Population: <span>${population}</span></h3>
    <h3>Region: <span>${region}</span></h3>
    <h3>Capital: <span>${capital}</span></h3>
    </section>
    </section>`
      );
    });
  }
}

function enableEVenlistener() {
  document
    .querySelectorAll('.options')
    .forEach((option) => option.addEventListener('click', filterCountry));
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

function filterCountry(e) {
  list.classList.toggle('hide');
  arrowIcon.classList.toggle('rotate');
  selectedText.innerText = e.target.innerText;

  const filterData = data.countryList.filter((country) => {
    return country.region === e.target.innerText;
  });

  countriesList.innerHTML = '';
  window.scrollTo(0, 0);
  createCountryList(countriesList, filterData);
  checkCountry();
}

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

function toggleMode() {
  if (window.matchMedia('(prefers-color-scheme: dark)')) {
    document.body.classList.toggle('light');
  } else {
    document.body.classList.toggle('dark');
  }
}

options.forEach((option) => {
  option.addEventListener('click', (e) => {
    selectedText.innerHTML = e.target.textContent;
    list.classList.toggle('hide');
    arrowIcon.classList.toggle('rotate');
  });
});

selectedField.addEventListener('click', () => {
  list.classList.toggle('hide');
  arrowIcon.classList.toggle('rotate');
});

mode.addEventListener('click', toggleMode);
getCountries(countryApiURL);
window.addEventListener('scroll', checkCountry);
