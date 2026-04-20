function detectVerticalTabs() {
    return (window.outerWidth - window.innerWidth) > 30;
}

function applyVerticalTabsMode() {
    document.body.classList.toggle('vertical-tabs-mode', detectVerticalTabs());
}

document.addEventListener('DOMContentLoaded', applyVerticalTabsMode);
window.addEventListener('resize', applyVerticalTabsMode);
