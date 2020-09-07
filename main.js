function initialize() {
    loadSlot(document.getElementById('bio'));
    loadSlot(document.getElementById('career'));
    loadSlot(document.getElementById('project'));
    loadSlot(document.getElementById('etc'));
    loadSlot(document.getElementById('link'));
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


/**
 * When buttons on navigation bar clicked
 */
function navButton_OnClick(elem) {

}
