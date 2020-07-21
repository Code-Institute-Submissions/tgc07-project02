// // DEFINE FUNCTIONS
// Get search category
function getSearchCategory() {
    return document.querySelector("#search-category").value;
};

function getSearchInput() {
    return document.querySelector("#search-box").value;
};

window.addEventListener("load", (event) => {
    // console.log(event);
    // console.log(this);
    document.querySelector("#search-btn").addEventListener("click", () => {
        let searchCategory = getSearchCategory();
        let searchInput = getSearchInput();
        if (searchCategory==="business-name") {
            console.log("business name selected");
            console.log(searchInput);
            // getBizByName(searchInput);
        } else if (searchCategory==="address") {
            console.log("address selected");
            console.log(searchInput);
            // getBizByAddress(searchInput);
        } else if (searchCategory==="postcode") {
            console.log("postcode selected");
            console.log(searchInput);
            // getBizByPostCode(searchInput);
        };
    });
});