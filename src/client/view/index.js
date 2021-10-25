document.addEventListener("DOMContentLoaded", () => {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"), 0);
    if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach(burgerElement => {
            burgerElement.addEventListener("click", () => {
                const target = burgerElement.dataset.target;
                const $target = document.getElementById(target);
                burgerElement.classList.toggle("is-active");
                $target.classList.toggle("is-active");
            });
        });
    }
});