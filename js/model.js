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

// // DEFINE FUNCTIONS
// Get all JSON responses and stores in "allData" array
function loadData(promiseArray) {
    Promise.all(promiseArray).then(data => {
        for (let i of data) {
            allData.push(i.FHRSEstablishment.EstablishmentCollection.EstablishmentDetail);
        };
    });
};

// Search by business name and/or address and/or postcode and/or hygiene rating
function compoundSearch(bizNameSearch, addressSearch, postcodeSearch, hygieneRatingSearch) {
    let businessesResults = [];
    let chartHygieneRatingsData = [0,0,0,0,0,0];
    function tallyHygieneRatings(hygieneRatingActual) {
        // Ignore "Exempt" and "AwaitingInspection" results
        if (hygieneRatingActual==="0") {chartHygieneRatingsData[0]+=1}
        else if (hygieneRatingActual==="1") {chartHygieneRatingsData[1]+=1}
        else if (hygieneRatingActual==="2") {chartHygieneRatingsData[2]+=1}
        else if (hygieneRatingActual==="3") {chartHygieneRatingsData[3]+=1}
        else if (hygieneRatingActual==="4") {chartHygieneRatingsData[4]+=1}
        else if (hygieneRatingActual==="5") {chartHygieneRatingsData[5]+=1};
    };
    let modName = bizNameSearch.replace(/^\s+|\s+$/g, '').toUpperCase();
    let modAddress = addressSearch.replace(/^\s+|\s+$/g, '').toUpperCase();
    let modPostCode = postcodeSearch.replace(/^\s+|\s+$/g, '').toUpperCase();
    for (let region of allData) {
        for (let biz of region) {
            if (modName==="" && modAddress==="" && modPostCode==="") {
                // If all search fields are empty
                return alert("Please enter search criteria");
            } else if (modName==="" && modAddress==="") {
                // If business name && address fields are empty
                if (biz.hasOwnProperty("PostCode")) {
                    if (hygieneRatingSearch==="any") {
                        if (biz.PostCode.toUpperCase().startsWith(modPostCode)) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    } else {
                        if (biz.PostCode.toUpperCase().startsWith(modPostCode) && biz.RatingValue===hygieneRatingSearch) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    };
                };
            } else if (modName==="" && modPostCode==="") {
                // If business name && postcode fields are empty
                if (biz.hasOwnProperty("AddressLine1")) {
                    if (hygieneRatingSearch==="any") {
                        if (biz.AddressLine1.toUpperCase().includes(modAddress)) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    } else {
                        if (biz.AddressLine1.toUpperCase().includes(modAddress) && biz.RatingValue===hygieneRatingSearch) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    };
                };
                if (biz.hasOwnProperty("AddressLine2")) {
                    if (hygieneRatingSearch==="any") {
                        if (biz.AddressLine2.toUpperCase().includes(modAddress)) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    } else {
                        if (biz.AddressLine2.toUpperCase().includes(modAddress) && biz.RatingValue===hygieneRatingSearch) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    };
                };
                if (biz.hasOwnProperty("AddressLine3")) {
                    if (hygieneRatingSearch==="any") {
                        if (biz.AddressLine3.toUpperCase().includes(modAddress)) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    } else {
                        if (biz.AddressLine3.toUpperCase().includes(modAddress) && biz.RatingValue===hygieneRatingSearch) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    };
                };
            } else if (modPostCode==="" && modAddress==="") {
                // If postcode && address fields are empty
                if (biz.hasOwnProperty("BusinessName")) {
                    if (hygieneRatingSearch==="any") {
                        if (biz.BusinessName.toUpperCase().includes(modName)) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    } else {
                        if (biz.BusinessName.toUpperCase().includes(modName) && biz.RatingValue===hygieneRatingSearch) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    };
                };
            } else if (modName==="") {
                if (biz.hasOwnProperty("AddressLine1") && biz.hasOwnProperty("PostCode")) {
                    // If only business name field is empty
                    if (hygieneRatingSearch==="any") {
                        if (biz.AddressLine1.toUpperCase().includes(modAddress) && biz.PostCode.toUpperCase().startsWith(modPostCode)) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    } else {
                        if (biz.AddressLine1.toUpperCase().includes(modAddress) && biz.PostCode.toUpperCase().startsWith(modPostCode) && biz.RatingValue===hygieneRatingSearch) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    };
                };
                if (biz.hasOwnProperty("AddressLine2") && biz.hasOwnProperty("PostCode")) {
                    if (hygieneRatingSearch==="any") {
                        if (biz.AddressLine2.toUpperCase().includes(modAddress) && biz.PostCode.toUpperCase().startsWith(modPostCode)) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    } else {
                        if (biz.AddressLine2.toUpperCase().includes(modAddress) && biz.PostCode.toUpperCase().startsWith(modPostCode) && biz.RatingValue===hygieneRatingSearch) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    };
                };
                if (biz.hasOwnProperty("AddressLine3") && biz.hasOwnProperty("PostCode")) {
                    if (hygieneRatingSearch==="any") {
                        if (biz.AddressLine3.toUpperCase().includes(modAddress) && biz.PostCode.toUpperCase().startsWith(modPostCode)) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    } else {
                        if (biz.AddressLine3.toUpperCase().includes(modAddress) && biz.PostCode.toUpperCase().startsWith(modPostCode) && biz.RatingValue===hygieneRatingSearch) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    };
                };
            } else if (modAddress==="") {
                // If only address field is empty
                if (biz.hasOwnProperty("PostCode") && biz.hasOwnProperty("BusinessName")) {
                    if (hygieneRatingSearch==="any") {
                        if (biz.PostCode.toUpperCase().startsWith(modPostCode) && biz.BusinessName.toUpperCase().includes(modName)) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    } else {
                        if (biz.PostCode.toUpperCase().startsWith(modPostCode) && biz.BusinessName.toUpperCase().includes(modName) && biz.RatingValue===hygieneRatingSearch) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    };
                };
            } else if (modPostCode==="") {
                // If only postcode field is empty
                if (biz.hasOwnProperty("AddressLine1") && biz.hasOwnProperty("BusinessName")) {
                    if (hygieneRatingSearch==="any") {
                        if (biz.AddressLine1.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName)) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    } else {
                        if (biz.AddressLine1.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName) && biz.RatingValue===hygieneRatingSearch) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    };
                };
                if (biz.hasOwnProperty("AddressLine2") && biz.hasOwnProperty("BusinessName")) {
                    if (hygieneRatingSearch==="any") {
                        if (biz.AddressLine2.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName)) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    } else {
                        if (biz.AddressLine2.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName) && biz.RatingValue===hygieneRatingSearch) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    };
                };
                if (biz.hasOwnProperty("AddressLine3") && biz.hasOwnProperty("BusinessName")) {
                    if (hygieneRatingSearch==="any") {
                        if (biz.AddressLine3.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName)) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    } else {
                        if (biz.AddressLine3.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName) && biz.RatingValue===hygieneRatingSearch) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    };
                };
            } else if (modName!=="" && modAddress!=="" && modPostCode!=="") {
                // If all search fields are used
                if (biz.hasOwnProperty("AddressLine1") && biz.hasOwnProperty("BusinessName") && biz.hasOwnProperty("PostCode")) {
                    if (hygieneRatingSearch==="any") {
                        if (biz.AddressLine1.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName) && biz.PostCode.toUpperCase().startsWith(modPostCode)) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    } else {
                        if (biz.AddressLine1.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName) && biz.PostCode.toUpperCase().startsWith(modPostCode) && biz.RatingValue===hygieneRatingSearch) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    };
                };
                if (biz.hasOwnProperty("AddressLine2") && biz.hasOwnProperty("BusinessName") && biz.hasOwnProperty("PostCode")) {
                    if (hygieneRatingSearch==="any") {
                        if (biz.AddressLine2.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName) && biz.PostCode.toUpperCase().startsWith(modPostCode)) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    } else {
                        if (biz.AddressLine2.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName) && biz.PostCode.toUpperCase().startsWith(modPostCode) && biz.RatingValue===hygieneRatingSearch) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    };
                };
                if (biz.hasOwnProperty("AddressLine3") && biz.hasOwnProperty("BusinessName") && biz.hasOwnProperty("PostCode")) {
                    if (hygieneRatingSearch==="any") {
                        if (biz.AddressLine3.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName) && biz.PostCode.toUpperCase().startsWith(modPostCode)) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    } else {
                        if (biz.AddressLine3.toUpperCase().includes(modAddress) && biz.BusinessName.toUpperCase().includes(modName) && biz.PostCode.toUpperCase().startsWith(modPostCode) && biz.RatingValue===hygieneRatingSearch) {
                            businessesResults.push(biz);
                            tallyHygieneRatings(biz.RatingValue);
                        };
                    };
                };
            };
        };
    };
    return {businessesResults, chartHygieneRatingsData, bizNameSearch, addressSearch, postcodeSearch, hygieneRatingSearch};
};
