// // DEFINE GLOBAL VARIABLES
// Fetch Food Standards Agency data
const fhrs501 = fetch("data/fhrs501-lbbd.json").then(response => response.json());
const fhrs502 = fetch("data/fhrs502-barnet.json").then(response => response.json());
const fhrs503 = fetch("data/fhrs503-bexley.json").then(response => response.json());
const fhrs504 = fetch("data/fhrs504-brent.json").then(response => response.json());
const fhrs505 = fetch("data/fhrs505-bromley.json").then(response => response.json());
const fhrs506 = fetch("data/fhrs506-camden.json").then(response => response.json());
const fhrs507 = fetch("data/fhrs507-croydon.json").then(response => response.json());
const fhrs508 = fetch("data/fhrs508-cityoflondon.json").then(response => response.json());
const fhrs509 = fetch("data/fhrs509-ealing.json").then(response => response.json());
const fhrs510 = fetch("data/fhrs510-enfield.json").then(response => response.json());
const fhrs511 = fetch("data/fhrs511-royalgreenwich.json").then(response => response.json());
const fhrs512 = fetch("data/fhrs512-hackney.json").then(response => response.json());
const fhrs513 = fetch("data/fhrs513-lbhf.json").then(response => response.json());
const fhrs514 = fetch("data/fhrs514-haringey.json").then(response => response.json());
const fhrs515 = fetch("data/fhrs515-harrow.json").then(response => response.json());
const fhrs516 = fetch("data/fhrs516-havering.json").then(response => response.json());
const fhrs517 = fetch("data/fhrs517-hillingdon.json").then(response => response.json());
const fhrs518 = fetch("data/fhrs518-hounslow.json").then(response => response.json());
const fhrs519 = fetch("data/fhrs519-islington.json").then(response => response.json());
const fhrs520 = fetch("data/fhrs520-rbkc.json").then(response => response.json());
const fhrs521 = fetch("data/fhrs521-kingston.json").then(response => response.json());
const fhrs522 = fetch("data/fhrs522-lambeth.json").then(response => response.json());
const fhrs523 = fetch("data/fhrs523-lewisham.json").then(response => response.json());
const fhrs524 = fetch("data/fhrs524-merton.json").then(response => response.json());
const fhrs525 = fetch("data/fhrs525-newham.json").then(response => response.json());
const fhrs526 = fetch("data/fhrs526-redbridge.json").then(response => response.json());
const fhrs527 = fetch("data/fhrs527-richmond.json").then(response => response.json());
const fhrs528 = fetch("data/fhrs528-southwark.json").then(response => response.json());
const fhrs529 = fetch("data/fhrs529-sutton.json").then(response => response.json());
const fhrs530 = fetch("data/fhrs530-towerhamlets.json").then(response => response.json());
const fhrs531 = fetch("data/fhrs531-walthamforest.json").then(response => response.json());
const fhrs532 = fetch("data/fhrs532-wandsworth.json").then(response => response.json());
const fhrs533 = fetch("data/fhrs533-westminster.json").then(response => response.json());

// Array to hold all Food Standards Agency data
let allData = [];

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
function getBizByName(name) {
    let searchResults = [];
    let modName = name.replace(/^\s+|\s+$/g, '').toUpperCase();
    for (let region of allData) {
        for (let biz of region) {
            if (biz.hasOwnProperty("BusinessName")) {
                if (biz.BusinessName.toUpperCase().includes(modName)) {
                    searchResults.push(biz);
                };
            };
        };
    }; return searchResults;
};

// Query data set for restaurants that match postcode query
function getBizByPostCode(postcode) {
    let searchResults = [];
    let modPostCode = postcode.replace(/^\s+|\s+$/g, '').toUpperCase();
    for (let region of allData) {
        for (let biz of region) {
            if (biz.hasOwnProperty("PostCode")) {
                if (biz.PostCode.toUpperCase().startsWith(modPostCode)) {
                    searchResults.push(biz);
                };
            };
        };
    }; return searchResults;
};

// Query data set for restaurants that match address query
function getBizByAddress(address) {
    let searchResults = [];
    let modAddress = address.replace(/^\s+|\s+$/g, '').toUpperCase();
    for (let region of allData) {
        for (let biz of region) {
            if (biz.hasOwnProperty("AddressLine1")) {
                if (biz.AddressLine1.toUpperCase().includes(modAddress)) {
                    searchResults.push(biz);
                };
            };
            if (biz.hasOwnProperty("AddressLine2")) {
                if (biz.AddressLine2.toUpperCase().includes(modAddress)) {
                    searchResults.push(biz);
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

// // CALL FUNCTIONS
// Call "loadData" function with array of promises as parameter
loadData([
    fhrs501,fhrs502,fhrs503,fhrs504,fhrs505,fhrs506,fhrs507,fhrs508,fhrs509,fhrs510,
    fhrs511,fhrs512,fhrs513,fhrs514,fhrs515,fhrs516,fhrs517,fhrs518,fhrs519,fhrs520,
    fhrs521,fhrs522,fhrs523,fhrs524,fhrs525,fhrs526,fhrs527,fhrs528,fhrs529,fhrs530,
    fhrs531,fhrs532,fhrs533,]);
