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
let markerCluster = L.markerClusterGroup();
// Wait until window fully loaded, then enable user search
window.addEventListener("load", (event) => {
    // console.log(event);
    // console.log(this);
    document.querySelector("#search-btn").addEventListener("click", () => {
        let bizName = getInputBizName();
        let address = getInputAddress();
        let postcode = getInputPostcode();
        let hygieneRating = getInputHygieneRating();
        let searchResults = [];
        searchResults = compoundSearch(bizName, address, postcode, hygieneRating);
        console.log(searchResults);

        markerCluster.clearLayers();
        for (let biz of searchResults) {
            if (biz.Geocode!=="") {
                let latlngArray = [biz.Geocode.Latitude, biz.Geocode.Longitude];
                L.marker(latlngArray).addTo(markerCluster);
            };
        };
        markerCluster.addTo(map);
    });

    // Get latlng of user click; "poi" variable defined in model.js
    map.addEventListener("click", event => {
        poi.push(event.latlng.lat);
        poi.push(event.latlng.lng);
    });

});