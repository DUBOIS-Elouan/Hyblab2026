document.querySelectorAll("#GenZ_filters button").forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("active");
    });
});