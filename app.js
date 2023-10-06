'use strict'

const apiKey = '836767454663626';
    const apiUrl = 'https://www.superheroapi.com/api.php/' + apiKey + '/';

    const Input = $('#input');
    const Button = $('#botao');
    const personagens = $('#personagens');

    function searchHero(searchTerm) {
        const heroUrl = apiUrl + 'search/' + searchTerm;
        $.getJSON(heroUrl, function(data) {
            if (data.response === 'success') {
                data.results.forEach(function(hero) {
                    createHeroCard(hero);
                });
            } else {
                console.log('No superheroes found for search term: ' + searchTerm);
            }
        });
    }

    Button.click(function() {
        personagens.empty(); // Limpa as cartas anteriores
        const searchTerm = Input.val();
        if (searchTerm !== '') {
            searchHero(searchTerm);
        }
    });

    for (let i = 1; i <= 731; i++) {
        searchHero(i.toString());
    };