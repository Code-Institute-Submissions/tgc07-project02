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
        alert("test search")
    });
});