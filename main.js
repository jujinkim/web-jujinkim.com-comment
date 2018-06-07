
/**
 * Shrink Navigation menu
 */
function shrinkNav() {
    let nav = document.getElementById("nav");
    nav.classList.remove("full");
    nav.getElementsByTagName("ul")[0].offsetHeight;
    nav.classList.add("shrink");
}

/**
 * Expand Navigation menu
 */
function expandNav() {
    let nav = document.getElementById("nav");
    nav.classList.remove("shrink");
    nav.getElementsByTagName("ul")[0].offsetHeight;
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
function openWindow(elem) {
    let window = document.getElementById("main");
    window.classList.remove("close");
    window.classList.add("open");

    //get page url
    let xhttp = new XMLHttpRequest();

    switch(elem.id) {
        case 'navBio' :
            xhttp.open('GET', 'pages/bio.html', false);
        break;
        case 'navCareer' :
            xhttp.open('GET', 'pages/career.html', false);
        break;
        case 'navExp' :
            xhttp.open('GET', 'pages/exp.html', false);
        break;
        case 'navPrj' :
            xhttp.open('GET', 'pages/project.html', false);
        break;
        case 'navLink' :
            xhttp.open('GET', 'pages/link.html', false);
        break;
    }

    //push page when loaded
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState === 4) {
            window.innerhtml = xhttp.responseText;
        }
    }
    
    //load page
    xhttp.send();
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
function navButton_OnClick(elem) {
    openWindow(elem);
    shrinkNav();
}