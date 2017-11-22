objectFitImages();

var newsQuery = function() {

    var section = document.getElementById('js-news-list');

    var requestURL = 'https://services.postimees.ee/rest/v1/articles?limit=5&language=et';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);

    request.responseType = 'json';
    request.send();

    request.onload = function() {
        var newsList = request.response;

        for (var i = 0; i < newsList.length; i++) {

            var obj = newsList[i];
            var headline = obj['headline'];
            var image = obj['thumbnail']['sources']['landscape']['large'];
            var id = obj['id'];
            var count = i + 1;

            for (var j = 0; j < obj.articleLead.length; j++) {
                var lead = obj.articleLead[j]['html'];
            }

            var newsItem = document.createElement('li');
            newsItem.className = 'news-list__item';
            newsItem.innerHTML =
                '<a class="news-list__link" href="https://www.postimees.ee/' + id + '" target="_blank">' +
                    '<div class="news-list__bg-gradient"></div>' +
                    '<img class="news-list__image" src="' + image + '" alt="Lorem ipsum" />' +
                    '<div class="news-list__summary">' +
                        '<h2 class="news-list__title">' + headline + '</h2>' +
                        lead +
                    '</div>' +
                    '<div class="news-list__nr-wrapper">' +
                        '<p class="news-list__nr">' + count + '</p>' +
                    '</div>' +
                '</a>';

            section.appendChild(newsItem);

        }

    }

}

newsQuery();