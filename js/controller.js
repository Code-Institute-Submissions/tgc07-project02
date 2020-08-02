// // GLOBAL VARIABLES
// Chart view state variable
let chartDisplayed = false;

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
        event.preventDefault();
        let bizName = getInputBizName();
        let address = getInputAddress();
        let postcode = getInputPostcode();
        let hygieneRating = getInputHygieneRating();
        if (bizName==="" && address==="" && postcode==="") {
            alert("Please enter search criteria");
        } else {
            let searchResults = compoundSearch(bizName, address, postcode, hygieneRating);
            console.log(searchResults);

            // Displays search results in panel and adds markers to map (defined in view.js)
            displaySearchResults(searchResults.businessesResults);
            
            // To display search results in right-hand panel
            document.querySelector("#map-container").className = "with-results";
            document.querySelector("#search-results-container").style.display = "initial";

            displayChart(searchResults.chartHygieneRatingsData, 'bar');
        };
    });

    // Page layout controls
    document.querySelector("#minimise-nav").addEventListener("click", minimiseNavBar);
    document.querySelector("#maximise-nav").addEventListener("click", maximiseNavBar);
    document.querySelector("#search-icon").addEventListener("click", maximiseNavBar);
    document.querySelector("#map-icon-1").addEventListener("click", () => {
        minimiseNavBar();
        hideSearchResults();
        hideChart();
    });
    document.querySelector("#map-icon-2").addEventListener("click", () => {
        minimiseNavBar();
        hideSearchResults();
        hideChart();
    });
    document.querySelector("#results-icon-1").addEventListener("click", () => {
        hideChart();
        toggleSearchResults();
        let resultsContainer = document.querySelector("#search-results-container");
        if (resultsContainer.innerText==="") {
            newTitle = document.createElement("h2");
            newTitle.innerText = "0 search results";
            resultsContainer.appendChild(newTitle);
        };
    });
    document.querySelector("#results-icon-2").addEventListener("click", () => {
        hideChart();
        toggleSearchResults();
        let resultsContainer = document.querySelector("#search-results-container");
        if (resultsContainer.innerText==="") {
            newTitle = document.createElement("h2");
            newTitle.innerText = "0 search results";
            resultsContainer.appendChild(newTitle);
        };
    });
    document.querySelector("#chart-icon-1").addEventListener("click", () => {
        chartDisplayed ? hideChart() : showChart();
    });
    document.querySelector("#chart-icon-2").addEventListener("click", () => {
        chartDisplayed ? hideChart() : showChart();
    });
    document.querySelector("#close-chart").addEventListener("click", hideChart);

    // Get latlng of user click; "poi" variable defined in model.js
    // map.addEventListener("click", event => {
    //     poi = [];
    //     poi.push(event.latlng.lat);
    //     poi.push(event.latlng.lng);
    // });
});