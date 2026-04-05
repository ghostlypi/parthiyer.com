document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('checkbox');
    const themeStyle = document.getElementById('theme-style');
    const pathPrefix = (window.location.pathname.includes('/html/') ||
                        window.location.pathname.includes('/blog/') ||
                        window.location.pathname.includes('/policy/')) ? '../' : '';

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
            document.body.classList.add('light-mode');
            if (themeSwitch) themeSwitch.checked = true;
        } else {
            themeStyle.href = '';
            document.body.classList.remove('light-mode');
            if (themeSwitch) themeSwitch.checked = false;
        }
    }

    function updateLinksWithThemeParams(theme) {
        document.querySelectorAll('a[href]').forEach(link => {
            try {
                if (link.hostname === window.location.hostname || !link.hostname) {
                    const url = new URL(link.href, window.location.origin);
                    url.searchParams.set('theme', theme === 'light' ? 'light' : 'dark');
                    link.href = url.toString();
                }
            } catch (e) {
                console.error("Could not update link: " + link.href, e);
            }
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const themeFromUrl = urlParams.get('theme');
    // Cookies are usable if the user accepted cookie consent (new flag) or has legacy theme cookie
    const hasCookieConsent = getCookie('cookie_consent') !== null || getCookie('theme') !== null;
    let currentTheme = 'dark';

    if (hasCookieConsent) {
        currentTheme = getCookie('theme') || 'dark';
    } else if (themeFromUrl) {
        currentTheme = themeFromUrl;
    }

    applyTheme(currentTheme);

    if (!hasCookieConsent) {
        updateLinksWithThemeParams(currentTheme);
    }

    if (themeSwitch) {
        themeSwitch.addEventListener('change', () => {
            const newTheme = themeSwitch.checked ? 'light' : 'dark';

            if (getCookie('cookie_consent') !== null || getCookie('theme') !== null) {
                applyTheme(newTheme);
                setCookie('theme', newTheme, 365);
            } else {
                applyTheme(newTheme);
                const url = new URL(window.location);
                url.searchParams.set('theme', newTheme);
                history.replaceState({}, '', url.toString());
                updateLinksWithThemeParams(newTheme);
            }
        });
    }
});