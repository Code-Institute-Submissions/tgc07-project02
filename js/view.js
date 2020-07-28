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

// Add zoom control at bottom left of map
new L.Control.Zoom({ position: 'bottomleft' }).addTo(map);

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
    let parentElement = document.querySelector("#search-results-container");
    parentElement.innerText = "";
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
            let popupContent = `<p class="popup-text name">Name: ${bizName}</p> `;
            popupContent += `<p class="popup-text address">Address: ${address}</p> `;
            if (biz.hasOwnProperty("RatingValue")) {popupContent += `<p class="popup-text rating-value">Food hygiene rating: ${ratingValue}</p> `;};
            if (biz.hasOwnProperty("RatingDate")) {popupContent += `<p class="popup-text rating-date">Rating date (YYYY-MM-DD): ${ratingDate}</p> `;};
            if (biz.hasOwnProperty("LocalAuthorityEmailAddress")) {popupContent += `<p class="popup-text authority-email">Local authority email: ${authorityEmail}</p> `;};
            newMarker.bindPopup(popupContent);
            markersArray.push(newMarker); // Array to track markers

            // Search results details
            let newContainer = document.createElement("div");
            newContainer.id = biz.FHRSID;
            newContainer.className = "search-result";
            newContainer.innerHTML = `
            <h2>${bizName}</h2>
            <img src="img/${biz.RatingValue}.jpg" alt="FHRS">
            <ul>
                <li>Address: ${address}</li>
                <li>Food hygiene rating: ${ratingValue}</li>
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

function displayBarChart(data) {
    let barChartContainer = document.querySelector("#chart-container-bar");
    barChartContainer.innerText = "";
    let newBarChartElement = document.createElement("canvas");
    newBarChartElement.id = "chart-bar";
    let barChartContext = newBarChartElement.getContext('2d');
    let barChart = new Chart(barChartContext, {
        type: 'bar',
        data: {
            labels: [0,1,2,3,4,5],
            datasets: [{
                label: 'Number of Businesses',
                data: data,
            }]
        },
    });
    barChartContainer.appendChild(newBarChartElement);
};

function displayPieChart(data) {
    let pieChartContainer = document.querySelector("#chart-container-pie");
    pieChartContainer.innerText = "";
    let newPieChartElement = document.createElement("canvas");
    newPieChartElement.id = "chart-pie";
    let pieChartContext = newPieChartElement.getContext('2d');
    let pieChart = new Chart(pieChartContext, {
        type: 'pie',
        data: {
            labels: [0,1,2,3,4,5],
            datasets: [{
                label: 'Number of Businesses',
                data: data,
            }]
        },
    });
    pieChartContainer.appendChild(newPieChartElement);
};
