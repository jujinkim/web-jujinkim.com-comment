
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

    //show loading
    let loading = document.getElementById("loading");
    loading.classList.remove("hide");
    loading.classList.add("show");

    //get page url
    let xhttp = new XMLHttpRequest();
    switch(elem.id) {
        case 'navBio' :
            xhttp.open('GET', 'pages/bio.html', true);
        break;
        case 'navCareer' :
            xhttp.open('GET', 'pages/career.html', true);
        break;
        case 'navExp' :
            xhttp.open('GET', 'pages/exp.html', true);
        break;
        case 'navPrj' :
            xhttp.open('GET', 'pages/project.html', true);
        break;
        case 'navLink' :
            xhttp.open('GET', 'pages/link.html', true);
        break;
    }

    //push page when loaded
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState === 4) {
            document.getElementById('mainArticle').innerHTML = xhttp.responseText;
        }
        //hide loading
        let loading = document.getElementById("loading");
        loading.classList.remove("show");
        loading.classList.add("hide");
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

/**
 * Tobble comments
 */
function toggleComment() {
    let wrapper = document.getElementById("comment_wrapper");
    if(wrapper.classList.contains("open")) {
        wrapper.classList.replace("open", "close");
    } else if (wrapper.classList.contains("close")) {
        wrapper.classList.replace("close", "open");
    }
}

/**
 * Initialize
 */
function initialize() {
    drawBackground();
    initDotMovingBG();
}