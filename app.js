'use strict';

const apiKey = '836767454663626';
const apiUrl = 'https://www.superheroapi.com/api.php/' + apiKey + '/';

async function fetchHeroInfo(id) {
    try {
        const response = await fetch(apiUrl + id);
        if (!response.ok) {
            throw new Error(`Erro na solicitação para o herói ${id}`);
        }
        const data = await response.json();

        // Crie um elemento de imagem
        const heroImage = document.createElement("img");
        heroImage.src = data.image.url;
        heroImage.alt = "Hero Image";
        heroImage.classList.add("hero-image");

        // Defina o ID do herói como um atributo de dados
        heroImage.setAttribute("data-hero-id", id);

        document.getElementById("botao-imagem").addEventListener("click", function () {
            const searchName = document.getElementById("search-input").value;
        
            // Fazer uma requisição para a API com o nome pesquisado
            fetch(`https://www.superheroapi.com/api.php/836767454663626/search/${searchName}`)
                .then(response => response.json())
                .then(data => {
                    displayResults(data.results);
                })
                .catch(error => {
                    console.error("Ocorreu um erro na busca:", error);
                });
        });
        
        // Função para exibir os resultados da pesquisa
        function displayResults(results) {
            const resultsDiv = document.getElementById("personagens");
            resultsDiv.innerHTML = ""; // Limpa os resultados anteriores
        
            if (results.length === 0) {
                resultsDiv.textContent = "Nenhum resultado encontrado.";
                return;
            }
        
            results.forEach(result => {
                const resultDiv = document.createElement("div");
                resultDiv.innerHTML = `
                    <h2>${result.name}</h2>
                    <img class="imgSearch"  src="${result.image.url}" alt="${result.name}">
                    <p>Nome Completo: ${result.biography["full-name"]}</p>`;
                resultsDiv.appendChild(resultDiv);
            });
        }
        

        // Adicione um evento de clique a cada imagem
        heroImage.addEventListener("click", function() {
            // Atualize a div "info_personagens" com informações do herói
            const infoPersonagens = document.getElementById("info_personagens");
            infoPersonagens.innerHTML = ''; // Limpe o conteúdo anterior

            // Adicione a imagem maior à div "info_personagens"
            const heroImageLarge = document.createElement("img");
            heroImageLarge.classList.add('borda')
            heroImageLarge.src = data.image.url;
            heroImageLarge.alt = "Hero Image Large";
            infoPersonagens.appendChild(heroImageLarge);

            // Adicione as informações do herói à div "info_personagens"
            const heroInfo = document.createElement("div");
            heroInfo.classList.add("hero-info"); // Adicione uma classe para estilização
            heroInfo.innerHTML = `
                <h1 class="hero-name">${data.name}</h1>
                <h2 class="section-title">Powerstats:</h2>
                <ul class="powerstats-list">
                    <li class="powerstat-item">Intelligence: ${data.powerstats.intelligence}</li>
                    <li class="powerstat-item">Strength: ${data.powerstats.strength}</li>
                    <li class="powerstat-item">Speed: ${data.powerstats.speed}</li>
                    <li class="powerstat-item">Durability: ${data.powerstats.durability}</li>
                    <li class="powerstat-item">Power: ${data.powerstats.power}</li>
                    <li class="powerstat-item">Combat: ${data.powerstats.combat}</li>
                </ul>
                <h2 class="section-title">Biography:</h2>
                <ul class="powerstats-list">
                    <li class="powerstat-item">Publisher: ${data.biography.publisher}</li>
                    <li class="powerstat-item">Alignment: ${data.biography.alignment}</li>
                </ul>
                <h2 class="section-title">Appearance:</h2>
                <ul class="powerstats-list">
                    <li class="powerstat-item">Gender: ${data.appearance.gender}</li>
                </ul>
            `;
            infoPersonagens.appendChild(heroInfo);
        });

        // Adicione os elementos à div "personagens"
        const personagens = document.getElementById("personagens");
        personagens.appendChild(heroImage);
    } catch (error) {
        console.error(error.message);
    }
}

// Função para carregar todas as informações dos heróis de 1 a 731 de forma assíncrona
async function loadAllHeroInfo() {
    for (let id = 1; id <= 731; id++) {
        await fetchHeroInfo(id);
    }
}

document.getElementById("heroeslayout").addEventListener("click", () => {
    fetchCharacters("good");
});

document.getElementById("villainslayout").addEventListener("click", () => {
    fetchCharacters("bad");
});

document.getElementById("antiheroeslayout").addEventListener("click", () => {
    fetchCharacters("neutral");
});

function fetchCharacters(alignment) {
    // Limpe a div de personagens antes de exibir os novos personagens
    const personagensDiv = document.getElementById("personagens");
    personagensDiv.innerHTML = "";

    // Faça uma solicitação à API para obter informações sobre os personagens com o alinhamento desejado
    fetch(`https://www.superheroapi.com/api.php/836767454663626/search/${alignment}`)
        .then(response => response.json())
        .then(data => {
            // Exiba os personagens encontrados
            data.results.forEach(character => {
                displayCharacter(character);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar personagens: " + error);
        });
}

function displayCharacter(character) {
    const personagensDiv = document.getElementById("personagens");

    // Crie um elemento de imagem para o personagem
    const characterImage = document.createElement("img");
   
    characterImage.src = character.image.url;
    characterImage.alt = character.name;
    characterImage.classList.add("hero-image");

    // Adicione um evento de clique para mostrar informações detalhadas
    characterImage.addEventListener("click", () => {
        displayCharacterInfo(character);
    });

    // Adicione a imagem do personagem à div de personagens
    personagensDiv.appendChild(characterImage);
}

function displayCharacterInfo(character) {
    const infoPersonagens = document.getElementById("info_personagens");
    infoPersonagens.innerHTML = ""; // Limpe as informações anteriores

    // Crie elementos para exibir informações detalhadas
    const characterName = document.createElement("h1");
    characterName.textContent = character.name;

    // Adicione outros detalhes do personagem aqui

    // Adicione os elementos à div de informações dos personagens
    infoPersonagens.appendChild(characterName);
}

loadAllHeroInfo();
