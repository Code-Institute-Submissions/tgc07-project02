// // DEFINE FUNCTIONS
// Get inputted business name
function getInputBizName() {
    return document.querySelector("#search-business").value;
};

// Get inputted address
function getInputAddress() {
    return document.querySelector("#search-address").value;
};

// Get inputted postcode
function getInputPostcode() {
    return document.querySelector("#search-postcode").value;
};

// Get selected hygiene rating
function getInputHygieneRating() {
    return document.querySelector("#select-hygiene-rating").value;
};

// Call "loadData" function with array of promises as parameter
loadData(fhrsDataPromiseArray);

// Wait until window fully loaded, then enable user search
window.addEventListener("load", () => {
    document.querySelector("#search-btn").addEventListener("click", (event) => {
        
        // Prevent default submit behaviour
        event.preventDefault();
        
        // Screen sizes 640px and smaller, then auto-minimise navbar when search button clicked
        if (window.matchMedia('(max-width: 640px)').matches) minimiseNavBar();
        
        // Retrieve user input info
        let bizName = getInputBizName();
        let address = getInputAddress();
        let postcode = getInputPostcode();
        let hygieneRating = getInputHygieneRating();

        // If input fields are not empty, then perform search
        if (bizName==="" && address==="" && postcode==="") {
            alert("Please enter search criteria");
        } else {
            let searchResults = compoundSearch(bizName, address, postcode, hygieneRating);
            console.log(searchResults);

            // Display search results in results panel and add markers to map (defined in view.js)
            displaySearchResults(searchResults.businessesResults);
            document.querySelector("#search-results-container").style.display = "initial";
            hideInfoContainer();

            // Create chart and display off-screen
            window.matchMedia('(max-width: 1280px)').matches ? displayChart(searchResults.chartHygieneRatingsData, 'horizontalBar') : displayChart(searchResults.chartHygieneRatingsData, 'bar');
        };
    });

    // Page layout controls
    document.querySelector("#minimise-nav").addEventListener("click", minimiseNavBar);
    document.querySelector("#maximise-nav").addEventListener("click", maximiseNavBar);
    document.querySelector("#search-icon").addEventListener("click", () => {
        maximiseNavBar();
        hideInfoContainer();
    });
    document.querySelector("#map-icon-1").addEventListener("click", () => {
        minimiseNavBar();
        hideSearchResults();
        hideChart();
        hideInfoContainer();
    });
    document.querySelector("#map-icon-2").addEventListener("click", () => {
        minimiseNavBar();
        hideSearchResults();
        hideChart();
        hideInfoContainer();
    });
    document.querySelector("#results-icon-1").addEventListener("click", () => {
        hideChart();
        hideInfoContainer();
        showSearchResults();
        // toggleSearchResults();
        // let resultsContainer = document.querySelector("#search-results-container");
        // if (resultsContainer.innerText==="") {
        //     newTitle = document.createElement("h2");
        //     newTitle.innerText = "0 search results";
        //     resultsContainer.appendChild(newTitle);
        // };
    });
    document.querySelector("#results-icon-2").addEventListener("click", () => {
        hideChart();
        hideInfoContainer();
        showSearchResults();
        // toggleSearchResults();
        // let resultsContainer = document.querySelector("#search-results-container");
        // if (resultsContainer.innerText==="") {
        //     newTitle = document.createElement("h2");
        //     newTitle.innerText = "0 search results";
        //     resultsContainer.appendChild(newTitle);
        // };
    });
    document.querySelector("#chart-icon-1").addEventListener("click", () => {
        // chartDisplayed state variable declared in view.js
        // chartDisplayed ? hideChart() : showChart();
        showChart();
    });
    document.querySelector("#chart-icon-2").addEventListener("click", () => {
        // chartDisplayed state variable declared in view.js
        // chartDisplayed ? hideChart() : showChart();
        showChart();
    });
    document.querySelector("#close-chart").addEventListener("click", hideChart);
    document.querySelector("#info-icon-1").addEventListener("click", () => {
        // infoDisplayed state variable declared in view.js
        // infoDisplayed ? hideInfoContainer() : showInfoContainer();
        hideChart();
        showInfoContainer();
    });
    document.querySelector("#info-icon-2").addEventListener("click", () => {
        // infoDisplayed state variable declared in view.js
        // infoDisplayed ? hideInfoContainer() : showInfoContainer();
        hideChart();
        showInfoContainer();
    });
    document.querySelector("#close-info").addEventListener("click", hideInfoContainer);

});