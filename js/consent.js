(function () {
    'use strict';

    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/; SameSite=Strict; Secure';
    }

    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
        }
        return null;
    }

    // Consent is valid if persistent cookie exists OR session-level flag set
    // (session flag covers cookie-less visitors within the same tab session)
    function hasConsent() {
        return getCookie('tnc_accepted') === 'true' ||
               sessionStorage.getItem('tnc_session') === 'true';
    }

    function grantConsent() {
        sessionStorage.setItem('tnc_session', 'true');
        if (getCookie('cookie_consent') !== null) {
            setCookie('tnc_accepted', 'true', 365);
        }
    }

    // ── Pages without consent UI (blog, html/ pages) ──────────────────────────
    // These pages just redirect to index for consent, then come back.
    // Policy pages are exempt — they must be readable before consent.
    const overlay = document.getElementById('consent-overlay');
    const isPolicyPage = window.location.pathname.includes('/policy/');

    if (!overlay && !isPolicyPage) {
        if (!hasConsent()) {
            document.body.classList.add('consent-pending');
            const inSubDir = window.location.pathname.includes('/html/') ||
                             window.location.pathname.includes('/blog/');
            const prefix = inSubDir ? '../' : '';
            window.location.replace(
                prefix + 'index.html?return=' + encodeURIComponent(window.location.href)
            );
        }
        return;
    }

    // ── Index (or any page that hosts the consent UI) ─────────────────────────
    const urlParams = new URLSearchParams(window.location.search);
    // If ?theme= is in the URL the user previously declined cookies — skip cookie popup
    const cookiesDeclinedViaUrl = urlParams.get('theme') !== null;

    const cookiePopup = document.getElementById('cookie-consent-popup');
    const tncPopup    = document.getElementById('tnc-consent-popup');
    const cookieAcceptBtn = document.getElementById('cookie-accept');
    const cookieRejectBtn = document.getElementById('cookie-reject');
    const tncAcceptBtn    = document.getElementById('tnc-accept');
    const tncRejectBtn    = document.getElementById('tnc-reject');

    function blockContent() {
        document.body.classList.add('consent-pending');
    }

    function unblockContent() {
        document.body.classList.remove('consent-pending');
        if (overlay) overlay.classList.remove('active');
        if (cookiePopup) cookiePopup.style.display = 'none';
        if (tncPopup)    tncPopup.style.display    = 'none';
    }

    function updateLinksWithThemeParams(theme) {
        document.querySelectorAll('a[href]').forEach(link => {
            try {
                if (!link.hostname || link.hostname === window.location.hostname) {
                    const url = new URL(link.href, window.location.origin);
                    url.searchParams.set('theme', theme);
                    link.href = url.toString();
                }
            } catch (e) {}
        });
    }

    function startConsentFlow() {
        if (hasConsent()) {
            unblockContent();
            // Redirect back to the page that triggered this consent check
            const returnUrl = urlParams.get('return');
            if (returnUrl) window.location.replace(returnUrl);
            return;
        }

        blockContent();
        if (overlay) overlay.classList.add('active');

        // Show T&C immediately if cookies are already accepted, or were declined via URL param
        if (getCookie('cookie_consent') !== null || cookiesDeclinedViaUrl) {
            if (tncPopup) tncPopup.style.display = 'block';
        } else {
            if (cookiePopup) cookiePopup.style.display = 'block';
        }
    }

    if (cookieAcceptBtn) {
        cookieAcceptBtn.addEventListener('click', () => {
            setCookie('cookie_consent', 'true', 365);
            if (!getCookie('theme')) setCookie('theme', 'dark', 365);
            if (cookiePopup) cookiePopup.style.display = 'none';
            if (tncPopup)    tncPopup.style.display    = 'block';
        });
    }

    if (cookieRejectBtn) {
        cookieRejectBtn.addEventListener('click', () => {
            if (cookiePopup) cookiePopup.style.display = 'none';
            // Encode the rejection in the URL so the cookie popup is skipped on
            // subsequent page loads this session (theme.js will read this param too)
            const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
            const url = new URL(window.location);
            url.searchParams.set('theme', currentTheme);
            history.replaceState({}, '', url.toString());
            updateLinksWithThemeParams(currentTheme);
            if (tncPopup) tncPopup.style.display = 'block';
        });
    }

    if (tncAcceptBtn) {
        tncAcceptBtn.addEventListener('click', () => {
            grantConsent();
            const returnUrl = urlParams.get('return');
            if (returnUrl) {
                window.location.replace(returnUrl);
                return;
            }
            unblockContent();
        });
    }

    if (tncRejectBtn) {
        tncRejectBtn.addEventListener('click', () => {
            const inSubDir = window.location.pathname.includes('/html/') ||
                             window.location.pathname.includes('/blog/');
            window.location.href = (inSubDir ? '../' : '') + 'policy/rejected.html';
        });
    }

    // Block immediately if consent not yet granted
    if (!hasConsent()) blockContent();

    // Trigger consent flow once the loader animation completes
    let loaderFired = false;
    document.addEventListener('loaderComplete', () => {
        loaderFired = true;
        startConsentFlow();
    });

    // Fallback in case there is no loader on this page
    window.addEventListener('load', () => {
        setTimeout(() => { if (!loaderFired) startConsentFlow(); }, 1100);
    });
})();