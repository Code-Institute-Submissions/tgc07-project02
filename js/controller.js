// // DEFINE FUNCTIONS
// Get search category
function getSearchCategory() {
    return document.querySelector("#search-category").value;
};

// Get user search input
function getSearchInput() {
    return document.querySelector("#search-box").value;
};

// Get selected hygiene rating
function getHygieneRatingUserSelect() {
    return document.querySelector("#hygiene-rating-user-select").value;
};

function getBusinessName() {
    return document.querySelector("#search-business").value;
};

function getAddress() {
    return document.querySelector("#search-address").value;
};

function getPostcode() {
    return document.querySelector("#search-postcode").value;
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
        let name = getBusinessName();
        let address = getAddress();
        let postcode = getPostcode();
        let hygieneRating = getHygieneRatingUserSelect();
        let searchResults = [];
        searchResults = compoundSearch(name, address, postcode, hygieneRating);
        console.log(searchResults);
    });
});