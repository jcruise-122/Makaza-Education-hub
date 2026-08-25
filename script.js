here// ===============================
// Past Papers Website - script.js
// ===============================

// Wait until the page has loaded
document.addEventListener("DOMContentLoaded", function () {

    // -------------------------------
    // Search functionality
    // -------------------------------
    const searchInput = document.getElementById("searchInput");
    const papers = document.querySelectorAll(".paper-card");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const searchTerm = searchInput.value.toLowerCase().trim();

            papers.forEach(function (paper) {
                const text = paper.textContent.toLowerCase();

                if (text.includes(searchTerm)) {
                    paper.style.display = "";
                } else {
                    paper.style.display = "none";
                }
            });
        });
    }


    // -------------------------------
    // Country filter
    // -------------------------------
    const countryFilter = document.getElementById("countryFilter");

    if (countryFilter) {
        countryFilter.addEventListener("change", function () {
            const selectedCountry = countryFilter.value.toLowerCase();

            papers.forEach(function (paper) {
                const country = paper.dataset.country
                    ? paper.dataset.country.toLowerCase()
                    : "";

                if (selectedCountry === "all" || country === selectedCountry) {
                    paper.style.display = "";
                } else {
                    paper.style.display = "none";
                }
            });
        });
    }


    // -------------------------------
    // Subject filter
    // -------------------------------
    const subjectFilter = document.getElementById("subjectFilter");

    if (subjectFilter) {
        subjectFilter.addEventListener("change", function () {
            const selectedSubject = subjectFilter.value.toLowerCase();

            papers.forEach(function (paper) {
                const subject = paper.dataset.subject
                    ? paper.dataset.subject.toLowerCase()
                    : "";

                if (
                    selectedSubject === "all" ||
                    subject === selectedSubject
                ) {
                    paper.style.display = "";
                } else {
                    paper.style.display = "none";
                }
            });
        });
    }


    // -------------------------------
    // Paid explanations
    // -------------------------------
    const paidButtons = document.querySelectorAll(".paid-answer");

    paidButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            alert(
                "The explained answer costs K1.00. " +
                "Payment can be made using MTN Mobile Money, " +
                "Airtel Money, Zamtel Money or supported bank options."
            );
        });
    });


    // -------------------------------
    // Mobile menu
    // -------------------------------
    const menuButton = document.getElementById("menuButton");
    const navigation = document.getElementById("navigation");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", function () {
            navigation.classList.toggle("show");
        });
    }


    // -------------------------------
    // Back to top button
    // -------------------------------
    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                backToTop.style.display = "block";
            } else {
                backToTop.style.display = "none";
            }
        });

        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // -------------------------------
    // Current year in footer
    // -------------------------------
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});
