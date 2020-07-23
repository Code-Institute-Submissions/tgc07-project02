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

// Wait until window fully loaded, then enable user search
window.addEventListener("load", (event) => {
    // console.log(event);
    // console.log(this);
    document.querySelector("#search-btn").addEventListener("click", () => {
        // let searchCategory = getSearchCategory();
        // let searchInput = getSearchInput();
        // let searchHygieneRating = getHygieneRatingUserSelect();
        // let searchResults = [];
        // if (searchCategory==="business-name") {
        //     searchResults = getBizByName(searchInput, searchHygieneRating);
        //     console.log(searchResults);
        // } else if (searchCategory==="address") {
        //     searchResults = getBizByAddress(searchInput, searchHygieneRating);
        //     console.log(searchResults);
        // } else if (searchCategory==="postcode") {
        //     searchResults = getBizByPostCode(searchInput, searchHygieneRating);
        //     console.log(searchResults);
        // };
        let bizName = getInputBizName();
        let address = getInputAddress();
        let postcode = getInputPostcode();
        let hygieneRating = getInputHygieneRating();
        let searchResults = [];
        searchResults = compoundSearch(bizName, address, postcode, hygieneRating);
        console.log(searchResults);
    });
});