document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('checkbox');
    const themeStyle = document.getElementById('theme-style');
    const cookieConsentPopup = document.getElementById('cookie-consent-popup');
    const cookieAcceptBtn = document.getElementById('cookie-accept');
    const cookieRejectBtn = document.getElementById('cookie-reject');
    const pathPrefix = window.location.pathname.includes('/html/') || window.location.pathname.includes('/blog/') ? '../' : '';

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Strict; Secure";
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
    if (getCookie('cookie_consent') === 'yes' && savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('dark'); // Default theme
    }

    // Show cookie consent popup
    function showCookieConsent() {
        cookieConsentPopup.style.display = 'block';
    }

    // Hide cookie consent popup
    function hideCookieConsent() {
        cookieConsentPopup.style.display = 'none';
    }

    // Event listener for accept button
    cookieAcceptBtn.addEventListener('click', () => {
        setCookie('cookie_consent', 'yes', 365);
        applyTheme('light');
        setCookie('theme', 'light', 365);
        hideCookieConsent();
    });

    // Event listener for reject button
    cookieRejectBtn.addEventListener('click', () => {
        applyTheme('dark');
        hideCookieConsent();
    });

    // Add event listener to the theme switch
    if (themeSwitch) {
        themeSwitch.addEventListener('change', () => {
            if (themeSwitch.checked) {
                if (getCookie('cookie_consent') === 'yes') {
                    applyTheme('light');
                    setCookie('theme', 'light', 365);
                } else {
                    showCookieConsent();
                }
            } else {
                applyTheme('dark');
                if (getCookie('cookie_consent') === 'yes') {
                    setCookie('theme', 'dark', 365);
                }
            }
        });
    }
});