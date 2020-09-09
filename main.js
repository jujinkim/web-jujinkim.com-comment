function initialize() {
    loadSlot(document.getElementById('bio'));
    loadSlot(document.getElementById('career'));
    loadSlot(document.getElementById('project'));
    loadSlot(document.getElementById('etc'));
    loadSlot(document.getElementById('link'));

    setThemeByTime();
}

function loadSlot(elem) {
    //get page url
    let xhttp = new XMLHttpRequest();
    switch(elem.id) {
        case 'bio' :
            xhttp.open('GET', 'pages/bio.html', true);
        break;
        case 'career' :
            xhttp.open('GET', 'pages/career.html', true);
        break;
        case 'etc' :
            xhttp.open('GET', 'pages/etc.html', true);
        break;
        case 'project' :
            xhttp.open('GET', 'pages/project.html', true);
        break;
        case 'link' :
            xhttp.open('GET', 'pages/link.html', true);
        break;
    }

    //push page when loaded
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState === 4) {
            elem.innerHTML = xhttp.responseText;
        }
        //hide loading
        // let loading = document.getElementById("loading");
        // loading.classList.remove("show");
        // loading.classList.add("hide");
    }
    
    //load page
    xhttp.send();
}

function setThemeByTime() {
    const hour = new Date().getHours;

    if (hour >= 7 && hour <= 19) {
        // Day, Light
        document.body.classList.add("light");
    } else {
        // Night, Dark
        document.body.classList.add("dark");
    }
}

/**
 * When buttons on navigation bar clicked
 */
function navButton_OnClick(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

/**
 * When the document is scrolled
 */
let navElem;
window.onscroll = function() {
    if (document.body.clientWidth < 1024) {
        // ignore mobile
        return;
    }

    if (navElem == null) {
        navElem = document.getElementById("nav");
    }

    let scrollTop = window.scrollY;
    navElem.style.marginTop = scrollTop + 20 + 'px';
}
