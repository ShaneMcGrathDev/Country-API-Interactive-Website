# Country-API-Interactive-Website

# Purpose of this code:

### This code produces a website of information about countries of the world such as population.

### Most of the HTML is dynamically written using JavaScript to iterate through country data from an external API.

### The external API source is: 'https://restcountries.com/v3.1/all'.

### A modal page is included which allows users to select and store favorites selected from the main page.

### Each displayed country dataset is generated with JavaScript as an HTML card with a button to "add to favorites".

### The population for the main page of country data and the special "favorites" page is calculated and displayed using the "display population" button

## Helpful Project Terminology

- **Asynchronous functions:** In computer programming, asynchronous operation means that a process operates independently of other processes, whereas synchronous operation means that the process runs only as a result of some other process being completed or handed off
- **APIs** are mechanisms that enable two software components to communicate with each other using a set of definitions and protocols. For example, the weather bureau’s software system contains daily weather data. The weather app on your phone “talks” to this system via APIs and shows you daily weather updates on your phone.
 - **API** stands for Application Programming Interface. In the context of APIs, the word Application refers to any software with a distinct function. Interface can be thought of as a contract of service between two applications. This contract defines how the two communicate with each other using requests and responses. Their API documentation contains information on how developers are to structure those requests and responses.
- **REST APIs** These are the most popular and flexible APIs found on the web today. The client sends requests to the server as data. The server uses this client input to start internal functions and returns output data back to the client. Let’s look at REST APIs in more detail below.

## Main sections of the JavaScript code

1. General variable declarations, 18 variables total
2. Variables to access the DOM and establish connection to the limited HTML code
3. User click events which are functions that manipulate the style of the modal element
4. The async function "getCountries" which establishes access to the external API
5. (Line 61) The async function "renderCountries()" which performs multiple actions:
6.(Lines 63-)retrieves the country data from the external API
Sort functionality to re-arrange display of the countries
7. Calls the "generateHTML()" function to dynamically produce the displayed countries on the main page 
8. Calls the "generateModalHTML()" function to dynamically produce displayed countries for the modal page based on the users favorites
9. Stores the Sorting functions for the main and modal pages
10. Stores the "displayPopulation()" arrow function which is used to display a total population using 
external API data for the main page and the favorites page
11. The "prepareCountryPageArray" function
12. The "prepareModalPageArray"  function
13. The "filterMainPage()" function
14. The "generateHTML()" function
15. The "generateModalHTML()" function


## Explanation of the "generateHTML()" function

The purpose of this function is to dynamically product HTML using JavaScript
The JavaScript retrieves API country data to populate page information
The JavaScript uses a for each loop to iterate through an array of country object data
The object data is retrieved by iterating through each object index and assigning the datapoints to HTML elements
The website then displays the HTML on the page as 1 card per country
Each card includes an "Add to favorites" button binded with an event listener



    <div id="cards" class="card-wrapper" class="box-wrap">
    </div>

    <!-- The Modal -->
    <div id="myModal" class="modal">

        <!-- Modal content -->
        <div class="modal-content">
            <span class="close">&times;</span>
            <h1 class="modal-header">Favorite Country Collection <span class="material-icons-outlined" id="sortLogo"
                    onclick="sortModal()">sort</span></h1>
            <div id="favoriteCards" class="modalBody">
        </div>
    </div>

        <script src="main.js" async defer></script>
</body>

    if (startIndex == null) {
        generateHTML(filteredUsersMain, htmlIdMain);
        generateModalHTML(filteredUsersModal, modalIdMain);
    } else {
        generateHTML(filteredUsersMain, htmlIdMain);
    }
}
