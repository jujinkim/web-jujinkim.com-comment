
/**
 * Shrink Navigation menu
 */
function shrinkNav() {
    let nav = document.getElementById("nav");
    nav.classList.remove("full");
    nav.classList.add("shrink");
}

/**
 * Expand Navigation menu
 */
function expandNav() {
    let nav = document.getElementById("nav");
    nav.classList.remove("shrink");
    nav.classList.add("full");
}

/**
 * Close window
 */
function closeWindow() {
    let window = document.getElementById("main");
    window.classList.remove("open");
    window.classList.add("close");
}

/**
 * Open window
 */
function openWindow() {
    let window = document.getElementById("main");
    window.classList.remove("close");
    window.classList.add("open");
}

/**
 * When close window button clicked
 */
function closeWindow_OnClick() {
    closeWindow();
    expandNav();
}

/**
 * When button on navigation clicked
 */
function navButton_OnClick() {
    openWindow();
    shrinkNav();
}