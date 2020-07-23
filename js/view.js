// Map starting coordinates and base setup
let startPoint = [51.5, -0.1];
let map = L.map('map').setView(startPoint, 12);

// Setup tile layers andd add to map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

// Add zoom control at bottom left of map
new L.Control.Zoom({ position: 'bottomleft' }).addTo(map);

function addMarkersToMap(searchResultsArray) {
    markerCluster.clearLayers();
    let parentElement = document.querySelector(".search-results-container");
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
            if (biz.hasOwnProperty("RatingValue")) {ratingValue = biz.RatingValue;};
            if (biz.hasOwnProperty("RatingDate")) {ratingDate = biz.RatingDate;};
            if (biz.hasOwnProperty("LocalAuthorityEmailAddress")) {authorityEmail = biz.LocalAuthorityEmailAddress;};

            // Map markers
            let newMarker = L.marker(latlngArray);
            newMarker.addTo(markerCluster);
            let popupContent = `<p class="popup-text name">Name: ${bizName}</p> `;
            // let popupAddress = "Address: " + address;
            // if (biz.hasOwnProperty("AddressLine1")) {popupAddress += biz.AddressLine1;};
            // if (biz.hasOwnProperty("AddressLine2")) {popupAddress += `, ${biz.AddressLine2}`;};
            // if (biz.hasOwnProperty("AddressLine3")) {popupAddress += `, ${biz.AddressLine3}`;};
            // if (biz.hasOwnProperty("AddressLine4")) {popupAddress += `, ${biz.AddressLine4}`;};
            // if (biz.hasOwnProperty("PostCode")) {popupAddress += `, ${biz.PostCode}`;};
            popupContent += `<p class="popup-text address">Address: ${address}</p> `;
            if (biz.hasOwnProperty("RatingValue")) {popupContent += `<p class="popup-text rating-value">Food hygiene rating: ${ratingValue}</p> `;};
            if (biz.hasOwnProperty("RatingDate")) {popupContent += `<p class="popup-text rating-date">Rating date (YYYY-MM-DD): ${ratingDate}</p> `;};
            if (biz.hasOwnProperty("LocalAuthorityEmailAddress")) {popupContent += `<p class="popup-text authority-email">Local authority email: ${authorityEmail}</p> `;};
            newMarker.bindPopup(popupContent);

            // Search results details
            let newContainer = document.createElement("div");
            newContainer.id = biz.FHRSID;
            newContainer.className = "search-result";
            newContainer.innerHTML = `
            <h3>${bizName}</h3>
            <ul>
                <li>Address: ${address}</li>
                <li>Food hygiene rating: ${ratingValue}</li>
                <li>Rating date: ${ratingDate}</li>
                <li>Local authority email: ${authorityEmail}</li>
            </ul>
            `;
            parentElement.appendChild(newContainer);
        };
    };
    markerCluster.addTo(map);
};