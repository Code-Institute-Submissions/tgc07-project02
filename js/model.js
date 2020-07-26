// // DEFINE GLOBAL VARIABLES
// Fetch Food Standards Agency data, store in array
const fhrsDataPromiseArray = [
    fetch("data/fhrs501-lbbd.json").then(response => response.json()),
    fetch("data/fhrs502-barnet.json").then(response => response.json()),
    fetch("data/fhrs503-bexley.json").then(response => response.json()),
    fetch("data/fhrs504-brent.json").then(response => response.json()),
    fetch("data/fhrs505-bromley.json").then(response => response.json()),
    fetch("data/fhrs506-camden.json").then(response => response.json()),
    fetch("data/fhrs507-croydon.json").then(response => response.json()),
    fetch("data/fhrs508-cityoflondon.json").then(response => response.json()),
    fetch("data/fhrs509-ealing.json").then(response => response.json()),
    fetch("data/fhrs510-enfield.json").then(response => response.json()),
    fetch("data/fhrs511-royalgreenwich.json").then(response => response.json()),
    fetch("data/fhrs512-hackney.json").then(response => response.json()),
    fetch("data/fhrs513-lbhf.json").then(response => response.json()),
    fetch("data/fhrs514-haringey.json").then(response => response.json()),
    fetch("data/fhrs515-harrow.json").then(response => response.json()),
    fetch("data/fhrs516-havering.json").then(response => response.json()),
    fetch("data/fhrs517-hillingdon.json").then(response => response.json()),
    fetch("data/fhrs518-hounslow.json").then(response => response.json()),
    fetch("data/fhrs519-islington.json").then(response => response.json()),
    fetch("data/fhrs520-rbkc.json").then(response => response.json()),
    fetch("data/fhrs521-kingston.json").then(response => response.json()),
    fetch("data/fhrs522-lambeth.json").then(response => response.json()),
    fetch("data/fhrs523-lewisham.json").then(response => response.json()),
    fetch("data/fhrs524-merton.json").then(response => response.json()),
    fetch("data/fhrs525-newham.json").then(response => response.json()),
    fetch("data/fhrs526-redbridge.json").then(response => response.json()),
    fetch("data/fhrs527-richmond.json").then(response => response.json()),
    fetch("data/fhrs528-southwark.json").then(response => response.json()),
    fetch("data/fhrs529-sutton.json").then(response => response.json()),
    fetch("data/fhrs530-towerhamlets.json").then(response => response.json()),
    fetch("data/fhrs531-walthamforest.json").then(response => response.json()),
    fetch("data/fhrs532-wandsworth.json").then(response => response.json()),
    fetch("data/fhrs533-westminster.json").then(response => response.json()),
    ];

// Array to hold all Food Standards Agency data
let allData = [];

// Array to store latlng of where user clicks on map
let poi = [];

// Marker cluster and group objects
let markerGroup = L.featureGroup(); // Used if search results <= 1000
let markerCluster = L.markerClusterGroup(); // Used if search results > 1000

// Array to store all markers generated from search results
let markersArray = [];

// // DEFINE FUNCTIONS
// Get all JSON responses and stores in "allData" array
function loadData(promiseArray) {
    Promise.all(promiseArray).then(data => {
        for (let i of data) {
            allData.push(i.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail);
        };
    });
};

// Query data set for restaurants that match business name query
function getBizByName(name, hygieneRating) {
    let searchResults = [];
    let modName = name.replace(/^\s+|\s+$/g, '').toUpperCase();
    for (let region of allData) {
        for (let biz of region) {
            if (biz.hasOwnProperty("BusinessName")) {
                if (hygieneRating==="any") {
                    if (biz.BusinessName.toUpperCase().includes(modName)) {
                        searchResults.push(biz);
                    };
                } else {
                    if (biz.BusinessName.toUpperCase().includes(modName) && biz.RatingValue===hygieneRating) {
                        searchResults.push(biz);
                    };
                };
            };
        };
    }; return searchResults;
};

// Query data set for restaurants that match postcode query
function getBizByPostCode(postcode, hygieneRating) {
    let searchResults = [];
    let modPostCode = postcode.replace(/^\s+|\s+$/g, '').toUpperCase();
    for (let region of allData) {
        for (let biz of region) {
            if (biz.hasOwnProperty("PostCode")) {
                if (hygieneRating==="any") {
                    if (biz.PostCode.toUpperCase().startsWith(modPostCode)) {
                        searchResults.push(biz);
                    };
                } else {
                    if (biz.PostCode.toUpperCase().startsWith(modPostCode) && biz.RatingValue===hygieneRating) {
                        searchResults.push(biz);
                    };
                };
            };
        };
    }; return searchResults;
};

// Query data set for restaurants that match address query
function getBizByAddress(address, hygieneRating) {
    let searchResults = [];
    let modAddress = address.replace(/^\s+|\s+$/g, '').toUpperCase();
    for (let region of allData) {
        for (let biz of region) {
            if (biz.hasOwnProperty("AddressLine1")) {
                if (hygieneRating==="any") {
                    if (biz.AddressLine1.toUpperCase().includes(modAddress)) {
                        searchResults.push(biz);
                    };
                } else {
                    if (biz.AddressLine1.toUpperCase().includes(modAddress) && biz.RatingValue===hygieneRating) {
                        searchResults.push(biz);
                    };
                };
            };
            if (biz.hasOwnProperty("AddressLine2")) {
                if (hygieneRating==="any") {
                    if (biz.AddressLine2.toUpperCase().includes(modAddress)) {
                        searchResults.push(biz);
                    };
                } else {
                    if (biz.AddressLine2.toUpperCase().includes(modAddress) && biz.RatingValue===hygieneRating) {
                        searchResults.push(biz);
                    };
                };
            };
            if (biz.hasOwnProperty("AddressLine3")) {
                if (hygieneRating==="any") {
                    if (biz.AddressLine3.toUpperCase().includes(modAddress)) {
                        searchResults.push(biz);
                    };
                } else {
                    if (biz.AddressLine3.toUpperCase().includes(modAddress) && biz.RatingValue===hygieneRating) {
                        searchResults.push(biz);
                    };
                };
            };
        };
    }; return searchResults;
};

// Filter postcode
function filterPostCode(postcode) {
    let postcodeFiltered = [];
    let modPostCode = postcode.replace(/^\s+|\s+$/g, '').toUpperCase();
    let url = `https://api.getthedata.com/postcode/${modPostCode}`;
    fetch(url).then(response => response.json()).then(jsonData => {
        if (jsonData.status==="match") {
            console.log(jsonData.data)
            if (jsonData.data.hasOwnProperty("postcode")) {
                postcodeFiltered.push(jsonData.data.postcode);
                let latitude = parseFloat(jsonData.data.latitude);
                let longitude = parseFloat(jsonData.data.longitude);
                postcodeFiltered.push([latitude,longitude]);
            } else if (jsonData.data.hasOwnProperty("postcode_sector")) {
                postcodeFiltered.push(jsonData.data.postcode_sector);
            } else if (jsonData.data.hasOwnProperty("postcode_district")) {
                postcodeFiltered.push(jsonData.data.postcode_district);
            } else if (jsonData.data.hasOwnProperty("postcode_area")) {
                postcodeFiltered.push(jsonData.data.postcode_area);
            };
        };
    }); return postcodeFiltered;
};

// Search by business name and/or address and/or postcode and/or hygiene rating
function compoundSearch(bizName, address, postcode, hygieneRating) {
    let searchResults = [];
    let modName = bizName.replace(/^\s+|\s+$/g, '').toUpperCase();
    let modAddress = address.replace(/^\s+|\s+$/g, '').toUpperCase();
    let modPostCode = postcode.replace(/^\s+|\s+$/g, '').toUpperCase();
    for (let region of allData) {
        for (let biz of region) {
            if (modName==="" && modAddress==="" && modPostCode==="") {
                // If all search fields are empty
                return alert("Please enter search criteria");
            } else if (modName==="" && modAddress==="") {
                // If business name && address fields are empty
                if (biz.hasOwnProperty("PostCode")) {
                    if (hygieneRating==="any") {
                        if (biz.PostCode.toUpperCase().startsWith(modPostCode)) {
                            searchResults.push(biz);
                        };
                    } else {
                        if (biz.PostCode.toUpperCase().startsWith(modPostCode) && biz.RatingValue===hygieneRating) {
                            searchResults.push(biz);
                        };
                    };
                };
            } else if (modName==="" && modPostCode==="") {
                // If business name && postcode fields are empty
                if (biz.hasOwnProperty("AddressLine1")) {
                    if (hygieneRating==="any") {
                        if (biz.AddressLine1.toUpperCase().includes(modAddress)) {
                            searchResults.push(biz);
                        };
                    } else {
                        if (biz.AddressLine1.toUpperCase().includes(modAddress) && biz.RatingValue===hygieneRating) {
                            searchResults.push(biz);
                        };
                    };
                };
                if (biz.hasOwnProperty("AddressLine2")) {
                    if (hygieneRating==="any") {
                        if (biz.AddressLine2.toUpperCase().includes(modAddress)) {
                            searchResults.push(biz);
                        };
                    } else {
                        if (biz.AddressLine2.toUpperCase().includes(modAddress) && biz.RatingValue===hygieneRating) {
                            searchResults.push(biz);
                        };
                    };
                };
                if (biz.hasOwnProperty("AddressLine3")) {
                    if (hygieneRating==="any") {
                        if (biz.AddressLine3.toUpperCase().includes(modAddress)) {
                            searchResults.push(biz);
                        };
                    } else {
                        if (biz.AddressLine3.toUpperCase().includes(modAddress) && biz.RatingValue===hygieneRating) {
                            searchResults.push(biz);
                        };
                    };
                };
            } else if (modPostCode==="" && modAddress==="") {
                // If postcode && address fields are empty
                if (biz.hasOwnProperty("BusinessName")) {
                    if (hygieneRating==="any") {
                        if (biz.BusinessName.toUpperCase().includes(modName)) {
                            searchResults.push(biz);
                        };
                    } else {
                        if (biz.BusinessName.toUpperCase().includes(modName) && biz.RatingValue===hygieneRating) {
                            searchResults.push(biz);
                        };
                    };
                };
            } else if (modName==="") {
                if (biz.hasOwnProperty("AddressLine1") && biz.hasOwnProperty("PostCode")) {
                    // If only business name field is empty
                    if (hygieneRating==="any") {
                        if (biz.AddressLine1.toUpperCase().includes(modAddress) && biz.PostCode.toUpperCase().startsWith(modPostCode)) {
                            searchResults.push(biz);
                        };
                    } else {
                        if (biz.AddressLine1.toUpperCase().includes(modAddress) && biz.PostCode.toUpperCase().startsWith(modPostCode) && biz.RatingValue===hygieneRating) {
                            searchResults.push(biz);
                        };
                    };
                };
                if (biz.hasOwnProperty("AddressLine2") && biz.hasOwnProperty("PostCode")) {
                    if (hygieneRating==="any") {
                        if (biz.AddressLine2.toUpperCase().includes(modAddress) && biz.PostCode.toUpperCase().startsWith(modPostCode)) {
                            searchResults.push(biz);
                        };
                    } else {
                        if (biz.AddressLine2.toUpperCase().includes(modAddress) && biz.PostCode.toUpperCase().startsWith(modPostCode) && biz.RatingValue===hygieneRating) {
                            searchResults.push(biz);
                        };
                    };
                };
                if (biz.hasOwnProperty("AddressLine3") && biz.hasOwnProperty("PostCode")) {
                    if (hygieneRating==="any") {
                        if (biz.AddressLine3.toUpperCase().includes(modAddress) && biz.PostCode.toUpperCase().startsWith(modPostCode)) {
                            searchResults.push(biz);
                        };
                    } else {
                        if (biz.AddressLine3.toUpperCase().includes(modAddress) && biz.PostCode.toUpperCase().startsWith(modPostCode) && biz.RatingValue===hygieneRating) {
                            searchResults.push(biz);
                        };
                    };
                };
            } else if (modAddress==="") {
                // If only address field is empty
                if (biz.hasOwnProperty("PostCode") && biz.hasOwnProperty("BusinessName")) {
                    if (hygieneRating==="any") {
                        if (biz.PostCode.toUpperCase().startsWith(modPostCode) && biz.BusinessName.toUpperCase().includes(modName)) {
                            searchResults.push(biz);
                        };
                    } else {
                        if (biz.PostCode.toUpperCase().startsWith(modPostCode) && biz.BusinessName.toUpperCase().includes(modName) && biz.RatingValue===hygieneRating) {
                            searchResults.push(biz);
                        };
                    };
                };
            } else if (modPostCode==="") {
                // If only postcode field is empty
                if (biz.hasOwnProperty("AddressLine1") && biz.hasOwnProperty("BusinessName")) {
                    if (hygieneRating==="any") {
                        if (biz.AddressLine1.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName)) {
                            searchResults.push(biz);
                        };
                    } else {
                        if (biz.AddressLine1.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName) && biz.RatingValue===hygieneRating) {
                            searchResults.push(biz);
                        };
                    };
                };
                if (biz.hasOwnProperty("AddressLine2") && biz.hasOwnProperty("BusinessName")) {
                    if (hygieneRating==="any") {
                        if (biz.AddressLine2.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName)) {
                            searchResults.push(biz);
                        };
                    } else {
                        if (biz.AddressLine2.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName) && biz.RatingValue===hygieneRating) {
                            searchResults.push(biz);
                        };
                    };
                };
                if (biz.hasOwnProperty("AddressLine3") && biz.hasOwnProperty("BusinessName")) {
                    if (hygieneRating==="any") {
                        if (biz.AddressLine3.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName)) {
                            searchResults.push(biz);
                        };
                    } else {
                        if (biz.AddressLine3.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName) && biz.RatingValue===hygieneRating) {
                            searchResults.push(biz);
                        };
                    };
                };
            } else if (modName!=="" && modAddress!=="" && modPostCode!=="") {
                // If all search fields are used
                if (biz.hasOwnProperty("AddressLine1") && biz.hasOwnProperty("BusinessName") && biz.hasOwnProperty("PostCode")) {
                    if (hygieneRating==="any") {
                        if (biz.AddressLine1.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName) && biz.PostCode.toUpperCase().startsWith(modPostCode)) {
                            searchResults.push(biz);
                        };
                    } else {
                        if (biz.AddressLine1.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName) && biz.PostCode.toUpperCase().startsWith(modPostCode) && biz.RatingValue===hygieneRating) {
                            searchResults.push(biz);
                        };
                    };
                };
                if (biz.hasOwnProperty("AddressLine2") && biz.hasOwnProperty("BusinessName") && biz.hasOwnProperty("PostCode")) {
                    if (hygieneRating==="any") {
                        if (biz.AddressLine2.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName) && biz.PostCode.toUpperCase().startsWith(modPostCode)) {
                            searchResults.push(biz);
                        };
                    } else {
                        if (biz.AddressLine2.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName) && biz.PostCode.toUpperCase().startsWith(modPostCode) && biz.RatingValue===hygieneRating) {
                            searchResults.push(biz);
                        };
                    };
                };
                if (biz.hasOwnProperty("AddressLine3") && biz.hasOwnProperty("BusinessName") && biz.hasOwnProperty("PostCode")) {
                    if (hygieneRating==="any") {
                        if (biz.AddressLine3.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName) && biz.PostCode.toUpperCase().startsWith(modPostCode)) {
                            searchResults.push(biz);
                        };
                    } else {
                        if (biz.AddressLine3.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName) && biz.PostCode.toUpperCase().startsWith(modPostCode) && biz.RatingValue===hygieneRating) {
                            searchResults.push(biz);
                        };
                    };
                };
            }; // check for any other permutations
        };
    } return searchResults;
};




// // CALL FUNCTIONS
// Call "loadData" function with array of promises as parameter
loadData(fhrsDataPromiseArray);
