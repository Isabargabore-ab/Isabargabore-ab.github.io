document.getElementById("explore-btn").addEventListener("click", function() {
    var aboutSection = document.getElementById("about");

    if (aboutSection.style.display === "none" || aboutSection.style.display === "") {
        aboutSection.style.display = "block";
        setTimeout(() => { aboutSection.style.opacity = "1"; }, 10);
    } else {
        aboutSection.style.opacity = "0";
        setTimeout(() => { aboutSection.style.display = "none"; }, 500);
    }
});
