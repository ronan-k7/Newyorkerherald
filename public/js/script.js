function updateTime() {
    var el = document.getElementById('time');
    if (el) {
        el.textContent = new Date().toLocaleTimeString();
    }
}
setInterval(updateTime, 1000);
updateTime();

/* Menu Toggle */
document.addEventListener('DOMContentLoaded', function () {
    var dropdown   = document.getElementById('dropdownMenu');
    var desktopBtn = document.getElementById('menuToggle');
    var mobileBtn  = document.getElementById('mobileMenuToggle');

    if (desktopBtn && dropdown) {
        desktopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
    }

    if (mobileBtn && dropdown) {
        mobileBtn.addEventListener('click', function () {
            dropdown.classList.toggle('active');
        });
    }

    /* Close dropdown when clicking outside */
    document.addEventListener('click', function (e) {
        if (dropdown && !dropdown.contains(e.target) &&
            desktopBtn && !desktopBtn.contains(e.target) &&
            mobileBtn  && !mobileBtn.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});
