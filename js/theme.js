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

    function updateLinksWithThemeParams(theme) {
        document.querySelectorAll('a[href]').forEach(link => {
            try {
                if (link.hostname === window.location.hostname || !link.hostname) {
                    const url = new URL(link.href, window.location.origin);
                    
                    if (theme === 'light') {
                        url.searchParams.set('theme', 'light');
                    } else {
                        url.searchParams.set('theme', 'dark');
                    }
                    
                    link.href = url.toString();
                }
            } catch (e) {
                console.error("Could not update link: " + link.href, e);
            }
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const themeFromUrl = urlParams.get('theme');
    const consentFromUrl = urlParams.get('cookie_consent');
    const hasCookieConsent = getCookie('theme') !== null;
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

    function showCookieConsent() {
        if (!hasCookieConsent && urlParams.get('cookie_consent') !== 'rejected') {
            cookieConsentPopup.style.display = 'block';
        }
    }

    function hideCookieConsent() {
        cookieConsentPopup.style.display = 'none';
    }

    cookieAcceptBtn.addEventListener('click', () => {
        setCookie('theme', 'light', 365);
        applyTheme('light');
        hideCookieConsent();
        
        const url = new URL(window.location);
        url.searchParams.delete('theme');
        url.searchParams.delete('cookie_consent');
        history.replaceState({}, '', url.toString());
    });

    cookieRejectBtn.addEventListener('click', () => {
        hideCookieConsent();
        applyTheme('light');
        const url = new URL(window.location);
        url.searchParams.set('theme', 'light');
        history.replaceState({}, '', url.toString());
        updateLinksWithThemeParams('light');
    });

    if (themeSwitch) {
        themeSwitch.addEventListener('change', () => {
            const newTheme = themeSwitch.checked ? 'light' : 'dark';
            const consentRejected = new URLSearchParams(window.location.search).get('theme') !== null;

            if (getCookie('theme') !== null) {
                applyTheme(newTheme);
                setCookie('theme', newTheme, 365);
            } else {
                if (newTheme === 'light' && !consentRejected) {
                    themeSwitch.checked = false;
                    showCookieConsent();
                } else {
                    applyTheme(newTheme);
                    const url = new URL(window.location);
                    if (newTheme === 'light') {
                        url.searchParams.set('theme', 'light');
                    } else {
                        url.searchParams.set('theme', 'dark');
                    }
                    history.replaceState({}, '', url.toString());
                    updateLinksWithThemeParams(newTheme);
                }
            }
        });
    }
});