document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('checkbox');
    const themeStyle = document.getElementById('theme-style');
    const pathPrefix = window.location.pathname.includes('/html/') || window.location.pathname.includes('/blog/') ? '../' : '';

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax; Secure";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function applyTheme(theme) {
        if (theme === 'light') {
            themeStyle.href = pathPrefix + 'css/light-mode.css';
            if (themeSwitch) themeSwitch.checked = true;
        } else {
            themeStyle.href = '';
            if (themeSwitch) themeSwitch.checked = false;
        }
    }

    // Apply theme on page load
    const savedTheme = getCookie('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('dark'); // Default theme
    }

    // Add event listener to the theme switch
    if (themeSwitch) {
        themeSwitch.addEventListener('change', () => {
            if (themeSwitch.checked) {
                applyTheme('light');
                setCookie('theme', 'light', 365);
            } else {
                applyTheme('dark');
                setCookie('theme', 'dark', 365);
            }
        });
    }
});