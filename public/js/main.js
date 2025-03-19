document.querySelector(".close-btn").addEventListener("click", function() {
    document.querySelector(".add-college-container").classList.remove("show");
    document.querySelector(".blur").classList.remove("show");
});

document.getElementById("add-college-btn").addEventListener("click", function() {
    document.querySelector(".add-college-container").classList.add("show");
    document.querySelector(".blur").classList.add("show");
})