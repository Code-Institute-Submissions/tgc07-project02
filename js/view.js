// Map starting coordinates and base setup
let startPoint = [51.5, -0.1];
let map = L.map('map').setView(startPoint, 12);

// Setup tile layers andd add to map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 22,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' // Demo access token
}).addTo(map);

// Locate marker and open marker's popup
function locateMarker(FHRSID){
    for (let marker in markersArray) {
        if (markersArray[marker].options.alt == FHRSID){
            markersArray[marker].openPopup();
        };
    };
};

// Display search results with markers and results panel
function displaySearchResults(searchResultsArray) {
    markerGroup.clearLayers(); // Clear featureGroup layers
    markerCluster.clearLayers(); // Clear cluster layers
    markersArray = []; // Clear markers array tracker of previous search results (variable defined in model.js)
    showSearchResults();
    // document.querySelector("#main").style.gridTemplateColumns = "1fr 3fr"; // 2 columns to display search results and map side by side
    let parentElement = document.querySelector("#search-results-container");
    parentElement.innerText = "";
    // parentElement.getElementsByClassName.display = "initial";
    newTitle = document.createElement("h2");
    newTitle.innerText = searchResultsArray.length===1 ? "1 search result" : `${searchResultsArray.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} search results`;
    parentElement.appendChild(newTitle);
    for (let biz of searchResultsArray) {
        if (biz.Geocode!=="") {
            // Info on each business
            let latlngArray = [biz.Geocode.Latitude, biz.Geocode.Longitude];
            let bizName = "";
            let address = "";
            let ratingValue = "";
            let ratingDate = "";
            let authorityEmail = "";
            if (biz.hasOwnProperty("BusinessName")) {bizName = biz.BusinessName;};
            if (biz.hasOwnProperty("AddressLine1")) {address += biz.AddressLine1 + ", ";};
            if (biz.hasOwnProperty("AddressLine2")) {address += biz.AddressLine2 + ", ";};
            if (biz.hasOwnProperty("AddressLine3")) {address += biz.AddressLine3 + ", ";};
            if (biz.hasOwnProperty("AddressLine4")) {address += biz.AddressLine4 + ", ";};
            if (biz.hasOwnProperty("PostCode")) {address += biz.PostCode;};
            if (biz.hasOwnProperty("RatingValue")) {
                biz.RatingValue==="AwaitingInspection" ? ratingValue = "Awaiting inspection" : ratingValue = biz.RatingValue;
            };
            if (biz.hasOwnProperty("RatingDate")) {
                typeof(biz.RatingDate)==="string" ? ratingDate = biz.RatingDate : ratingDate = "N.A.";
            };
            if (biz.hasOwnProperty("LocalAuthorityEmailAddress")) {authorityEmail = `<a href="mailto:${biz.LocalAuthorityEmailAddress}">${biz.LocalAuthorityEmailAddress}</a>`;};

            // Map markers
            let newMarker = L.marker(latlngArray, {title:`${biz.BusinessName}`, alt:`${biz.FHRSID}`}); // Create new map marker
            searchResultsArray.length<=1000 ? newMarker.addTo(markerGroup) : newMarker.addTo(markerCluster); // If search results <= 1000 use featureGroup, else use cluster
            let popupContent = `<h3 class="popup-text name">${bizName}</h3> `;
            popupContent += `<p class="popup-text address">${address}</p> `;
            // if (biz.hasOwnProperty("RatingValue")) {popupContent += `<p class="popup-text rating-value">Food hygiene rating: ${ratingValue}</p> `;};
            if (biz.hasOwnProperty("RatingValue")) {popupContent += `<img src="img/${biz.RatingValue}.jpg" alt="FHRS"> `;};
            if (biz.hasOwnProperty("RatingDate")) {popupContent += `<p class="popup-text rating-date">Rating date: ${ratingDate}</p> `;};
            if (biz.hasOwnProperty("LocalAuthorityEmailAddress")) {popupContent += `<p class="popup-text authority-email">Local authority email: ${authorityEmail}</p> `;};
            newMarker.bindPopup(popupContent);
            markersArray.push(newMarker); // Array to track markers

            // Search results details
            let newContainer = document.createElement("div");
            newContainer.id = biz.FHRSID;
            newContainer.className = "search-result";
            newContainer.innerHTML = `
            <h3>${bizName}</h3>
            <p>${address}</p>
            <img src="img/${biz.RatingValue}.jpg" alt="FHRS">
            <ul>
                <li>Rating date: ${ratingDate}</li>
                <li>Local authority email: ${authorityEmail}</li>
            </ul>
            `;
            newContainer.addEventListener("click", function() {
                map.panTo(latlngArray);
                locateMarker(this.id);
            });
            parentElement.appendChild(newContainer);
        };
    };
    // Add marker layer to map and fit map to bounds of markers
    if (searchResultsArray.length===0) {
        console.warn("No search results");
    } else if (searchResultsArray.length>0 && searchResultsArray.length<=1000) {
        markerGroup.addTo(map);
        map.fitBounds(markerGroup.getBounds(), {maxZoom:16});
    } else if (searchResultsArray.length>1000) {
        markerCluster.addTo(map);
        map.fitBounds(markerCluster.getBounds(), {maxZoom:16});
    };
};

function displayChart(chartData, chartType) {
    document.querySelector("#chart-container").style.backgroundColor = "white";
    let chartContainer = document.querySelector("#chart-container");
    chartContainer.innerText = "";
    let newChartElement = document.createElement("canvas");
    newChartElement.id = "chart";
    let chartContext = newChartElement.getContext('2d');
    let chart = new Chart(chartContext, {
        type: chartType,
        // data: {
        //     labels: ['Hygiene Rating – 0','Hygiene Rating – 1','Hygiene Rating – 2','Hygiene Rating – 3','Hygiene Rating – 4','Hygiene Rating – 5'],
        //     datasets: [{
        //         label: 'Number of Businesses',
        //         data: chartData,
        //         backgroundColor: ["rgba(139,0,0,0.5)", "rgba(255,165,0,0.5)", "rgba(255,255,51,0.5)", "rgba(75,0,130,0.3)", "rgba(16,50,79,0.5)", "rgba(10,64,58,0.5)"],
        //     }]
        // },
        data: {
            labels: ['FHR-0','FHR-1','FHR-2','FHR-3','FHR-4','FHR-5'],
            datasets: [{
                label: 'Urgent improvement required',
                backgroundColor: 'rgba(140,0,0,0.5)',
                data: [chartData[0],0,0,0,0,0]
            }, {
                label: 'Major improvement necessary',
                backgroundColor: 'rgba(255,165,0,0.5)',
                data: [0,chartData[1],0,0,0,0]
            }, {
                label: 'Some improvement necessary',
                backgroundColor: 'rgba(255,255,50,0.5)',
                data: [0,0,chartData[2],0,0,0]
            }, {
                label: 'Generally satisfactory',
                backgroundColor: 'rgba(50,0,100,0.4)',
                data: [0,0,0,chartData[3],0,0]
            }, {
                label: 'Good',
                backgroundColor: 'rgba(16,50,79,0.5)',
                data: [0,0,0,0,chartData[4],0]
            }, {
                label: 'Very good',
                backgroundColor: 'rgba(0,100,0,0.5)',
                data: [0,0,0,0,0,chartData[5]]
            }]
        },
        options: {
            title: {
                display: true,
                text: 'No. of Businesses',
                position: 'left',
                fontSize: 14,
                fontStyle: 'normal',
            },
            legend: {
                position: 'bottom'
            },
            layout: {
                padding: 50
            },
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
    chartContainer.appendChild(newChartElement);
};


// Web page layout functions
function minimiseNavBar() {
    document.querySelector("#nav").style.display = "none";
    document.querySelector("#nav-minimised").style.display = "initial";
};

function maximiseNavBar() {
    document.querySelector("#nav-minimised").style.display = "none";
    document.querySelector("#nav").style.display = "initial";
};

function hideSearchResults() {
    document.querySelector("#search-results-container").style.display = "none";
    document.querySelector("#main").style.gridTemplateColumns = "1fr";
};

function showSearchResults() {
    document.querySelector("#search-results-container").style.display = "initial";
    document.querySelector("#main").style.gridTemplateColumns = "1fr 3fr";
};

function toggleSearchResults() {
    let resultsContainer = document.querySelector("#search-results-container");
    if (resultsContainer.style.display === "none") {
        resultsContainer.style.display = "initial";
        document.querySelector("#main").style.gridTemplateColumns = "1fr 3fr";
    } else if (resultsContainer.style.display === "initial") {
        resultsContainer.style.display = "none";
        document.querySelector("#main").style.gridTemplateColumns = "1fr";
    };
};

function showChart() {
    if (!chartDisplayed) {
        chartDisplayed = true;
        let chartElement = document.querySelector("#chart-container");
        chartElement.animate([
            // keyframes
            { transform: 'translateX(0vw) scaleY(5%)' },
            { transform: 'translateX(150vw) scaleY(5%)' },
            { transform: 'translateX(150vw) scaleY(100%)' }
            ], { 
            // timing options
            duration: 1000,
            fill: "forwards"
        });
    };
};

function hideChart() {
    if (chartDisplayed) {
        chartDisplayed = false;
        let chartElement = document.querySelector("#chart-container");
        chartElement.animate([
            // keyframes
            { transform: 'translateX(150vw) scaleY(100%)' },
            { transform: 'translateX(150vw) scaleY(5%)' },
            { transform: 'translateX(0vw) scaleY(5%)' },
            { transform: 'translateX(0vw) scaleY(100%)' }
            ], { 
            // timing options
            duration: 1000,
            fill: "forwards"
        });
    };
};
