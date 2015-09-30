var toggler = document.getElementById('main-nav__toggle');
toggler.onclick = function (e) {
    e.preventDefault();
    toggler.classList.toggle('main-nav__toggle--close');
}