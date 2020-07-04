function loadSlot(elem) {
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
        case 'navEtc' :
            xhttp.open('GET', 'pages/etc.html', true);
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
 * When buttons on navigation bar clicked
 */
function navButton_OnClick(elem) {

}
