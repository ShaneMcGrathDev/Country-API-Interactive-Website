var startIndex = 0;
var endIndex = 31;

const htmlIdMain = "cards";
const modalIdMain = "favoriteCards";

var filterArray = [];
var filterArrayFlag = [];
var mainPageArray = [];
var modalPageArray;
var filteredUsersMain;
var filteredUsersModal;

var population;
var modalPopulation;

var noDuplicateFlag;
var sortOrderMain = "default";
var sortOrderModal = "default";
var users;
var usersSource;
let countryUrl = 'https://restcountries.com/v3.1/all'


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

async function getCountries() {
    let url = 'https://restcountries.com/v3.1/all';
    try {
        res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderCountries() {
    
    usersSource = await getCountries();
    users = usersSource.slice(0, 30);
    noDuplicateFlag = [...new Set(filterArrayFlag)];
    filteredUsersMain = users.filter(country => !noDuplicateFlag.includes(country.flag));

    population = filteredUsersMain.reduce((accumulator, object) => {
        return accumulator + object.population;
    }, 0);

    if (sortOrderMain == "default") {
    } else if (sortOrderMain == "sortAtoZ") {
        filteredUsersMain.sort(sortAtoZ);
    } else if (sortOrderMain == "sortZtoA") {
        filteredUsersMain.sort(sortZtoA);
    }

    function sortAtoZ(a, b) {
        if (a.flag < b.flag) {
            return -1;
        } else if (a.flag > b.flag) {
            return 1;
        } else {
            return 0;
        }
    }

    function sortZtoA(a, b) {
        if (a.flag > b.flag) {
            return -1;
        } else if (a.flag < b.flag) {
            return 1;
        } else {
            return 0;
        }
    }

    filteredUsersModal = users.filter(country => noDuplicateFlag.includes(country.flag));

    modalPopulation = filteredUsersModal.reduce((accumulator, object) => {
        return accumulator + object.population;
    }, 0);

    if (sortOrderModal == "default") {
    } else if (sortOrderModal == "sortAtoZ") {
        filteredUsersModal.sort(sortAtoZ);
    } else if (sortOrderModal == "sortZtoA") {
        filteredUsersModal.sort(sortZtoA);
    }

    if (startIndex == null) {
        generateHTML(filteredUsersMain, htmlIdMain);
        generateModalHTML(filteredUsersModal, modalIdMain);
    } else {
        generateHTML(filteredUsersMain, htmlIdMain);
    }
}

const prepareCountryPageArray = (users, filteredUsersMain, startIndex, endIndex) => {
    if (startIndex == null) {
        return filteredUsersMain;
    } else {
        mainPageArray = users.slice(0, 31);
        return mainPageArray;
    }
}

const prepareModalPageArray = (filteredUsersModal) => {
    if (startIndex == null) {
        return filteredUsersModal;
    } else {
        modalPageArray = [];
        return modalPageArray;
    }
}

function filterMainPage(users) {
    mainPageArray = users.slice(0, 1);
    return mainPageArray;
};

const generateHTML = (ArraySelection, SpecificId) => {
    let html = '';
    ArraySelection.forEach(function (values, index) {
        let htmlSegment = `<div class="card">
    <h1 class="title">${values.name.common}</h1>
    <img class="images" src=${values.flags.svg} alt="image">
    <p><strong>Capital:</strong> ${values.capital}</p>
    <p class="population"><strong>Population:</strong> ${values.population.toLocaleString("en-US")}</p>
    <p class="continent"><strong>Continent:</strong> ${values.continents[0]}</p>
    <button
    class= "button" 
    id="addToFavorites"
    onclick="updateData(this)" 
     data-country-flag=${values.flag}
    data-index-number=${index}
    >Add to Favorites</button>
    </div>`;

        html += htmlSegment;

    });
    let container = document.getElementById(SpecificId);
    container.innerHTML = html;
}

const generateModalHTML = (ArraySelection, SpecificId) => {
    let html = '';
    ArraySelection.forEach(function (values, index) {
        let htmlSegment = `<div class="card" class="theCountryCard">
    <h1 class="title">${values.name.common}</h1>
    <img class="images" src=${values.flags.svg} alt="image">
    <p class="population"><strong>Capital:</strong> ${values.capital}</p>
    <p class="population"><strong>Population:</strong> ${values.population.toLocaleString("en-US")}</p>
    <p class="continent"><strong>Continent:</strong> ${values.continents[0]}</p>
    <button
    class= "button" 
    id="RemoveFromFavorites"
    onclick="updateModalData(this)" 
     data-country-flag=${values.flag}
    data-index-number=${index}
    >Remove from Favorites</button>
    </div>`;

        html += htmlSegment;

    });
    let container = document.getElementById(SpecificId);
    container.innerHTML = html;
}

renderCountries();     //Initial Render

const updateData = (buttonIndex) => {
    startIndex = null;
    var countryFlag = buttonIndex.getAttribute("data-country-flag");
   
    filterArrayFlag.push(countryFlag);
    renderCountries();
    alert("Added to Favorites!")
};

const updateModalData = (buttonIndex) => {
    startIndex = null;
    var countryFlag = buttonIndex.getAttribute("data-country-flag");

    filterArrayFlag = filterArrayFlag.filter(country => country != countryFlag);
    renderCountries();
    alert("Removed from Favorites!")
};


const sortMain = () => {
    if (sortOrderMain == "default") {
        sortOrderMain = "sortAtoZ";
        renderCountries();
    } else if (sortOrderMain == "sortAtoZ") {
        sortOrderMain = "sortZtoA";
        renderCountries();
    } else if (sortOrderMain == "sortZtoA")
        sortOrderMain = "sortAtoZ";
    renderCountries();
}

const sortModal = () => {
    if (sortOrderModal == "default") {
        sortOrderModal = "sortAtoZ";
        renderCountries();
    } else if (sortOrderModal == "sortAtoZ") {
        sortOrderModal = "sortZtoA";
        renderCountries();
    } else if (sortOrderModal == "sortZtoA")
        sortOrderModal = "sortAtoZ";
    renderCountries();
}


const displayPopulation = () => {

    alert(`Current Main Page Population: ${population.toLocaleString("en-US")} 
Current Favorites List Population: ${modalPopulation.toLocaleString("en-US")}`
    )
}