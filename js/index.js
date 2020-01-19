$(document).ready(function(){
    var cards = $("#cards");
    var languageHeader = $("#languageHeader");
    var language = 'Java'; // Default
    var page = '1' // Default

    // Gets URL data and append to HTML
    function getCards(githubURL){
        $.getJSON(githubURL, function(data) {
            var gitItems = data.items;
            $.each(gitItems, function(i,git){
                cards.append("<div class='col mb-4'><div class='card'><img src=" + git.owner.avatar_url +
                " class='card-img-top' alt='Curitiba'><div class='card-body'><h5 class='card-title'>"
                + git.name + "</h5><p class='card-text'>Number of Stars: " + git.stargazers_count + 
                "<br>Number of Forks: " + git.forks + "</p></div></div></div>");
            })
            $("#loading").addClass("d-none");
            $("#loading").removeClass("d-flex");
            $("#page"+page).addClass("active");
            $("#pages").removeClass("invisible");
        });
    };

    // Event for programming language switching
    $("#dropdown a").click(function(e){
        e.preventDefault();
        $("#page"+page).removeClass("active");
        language = $(this).text();
        page = '1';
        cards.empty();
        languageHeader.empty();
        languageHeader.append('Most starred ' + language + ' repositories of GitHub')
        $("#loading").removeClass("d-none");
        $("#loading").addClass("d-flex");
        $("#pages").addClass("invisible");
        getCards('https://api.github.com/search/repositories?q=language:'+language+'&sort=stars&page='+page+'')
    });

    // Event for page switching
    $("#pagination a").click(function(e){
        e.preventDefault();
        $("#page"+page).removeClass("active");
        page = $(this).text();
        cards.empty();
        $("#loading").removeClass("d-none");
        $("#loading").addClass("d-flex");
        $("#pages").addClass("invisible");
        getCards('https://api.github.com/search/repositories?q=language:'+language+'&sort=stars&page='+page+'')
    });

    // Defaults
    getCards('https://api.github.com/search/repositories?q=language:Java&sort=stars&page=1');
    languageHeader.append('Most starred Java repositories of GitHub')
    $("#page1").addClass("active");
});