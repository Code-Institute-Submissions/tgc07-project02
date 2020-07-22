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

// Wait until window fully loaded, then enable user search
window.addEventListener("load", (event) => {
    // console.log(event);
    // console.log(this);
    document.querySelector("#search-btn").addEventListener("click", () => {
        let searchCategory = getSearchCategory();
        let searchInput = getSearchInput();
        let searchHygieneRating = getHygieneRatingUserSelect();
        if (searchCategory==="business-name") {
            let searchResults = getBizByName(searchInput, searchHygieneRating);
            console.log(searchResults);
        } else if (searchCategory==="address") {
            let searchResults = getBizByAddress(searchInput, searchHygieneRating);
            console.log(searchResults);
        } else if (searchCategory==="postcode") {
            let searchResults = getBizByPostCode(searchInput, searchHygieneRating);
            console.log(searchResults);
        };
    });
});