const movies = document.querySelector('.movies');
const setaDireita = document.querySelector('.btn-next');
const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.btn-prev');
const subtitle = document.querySelector('.subtitle');
const highlightVideo = document.querySelector('.highlight__video');
const highlightInfo = document.querySelector('.highlight__info');
const highlightTitle = document.querySelector('.highlight__title');
const highlightRating = document.querySelector('.highlight__rating');
const highlightGenres = document.querySelector('.highlight__genres');
const highlightLaunch = document.querySelector('.highlight__launch');
const highlightDescription = document.querySelector('.highlight__description');
const highlightVideoLink = document.querySelector('.highlight__video-link')
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const modalTitle = document.querySelector('.modal__title');
const modalImg = document.querySelector('.modal__img');
const modalDescription = document.querySelector('.modal__description');
const modalGenres = document.querySelector('.modal__genres');
const modalAverage = document.querySelector('.modal__average');
const input = document.querySelector('.input');
const pagina = document.querySelector('body');
const btnTheme = document.querySelector('.btn-theme');

pagina.setAttribute("tema", 'claro');

function mudarTema() {
    if (pagina.getAttribute('tema') === 'claro') {
        btnTheme.src = './assets/light-mode.svg';
        pagina.style.backgroundColor = '#ffffff';
        input.style.border = '1px solid #979797';
        input.style.color = '#979797';
        input.style.backgroundColor = '#ffffff';
        subtitle.style.color = '#000000';
        highlightInfo.style.backgroundColor = '#ffffff'
        highlightLaunch.style.color = 'rgba(0, 0, 0, 0.7)';
        highlightGenres.style.color = 'rgba(0, 0, 0, 0.7)';
        highlightDescription.style.color = '#000000';
        btnNext.src = './assets/seta-direita-preta.svg';
        btnPrev.src = './assets/seta-esquerda-preta.svg';
    }
    else if (pagina.getAttribute('tema') === 'escuro') {
        btnTheme.src = './assets/dark-mode.svg';
        pagina.style.backgroundColor = '#242424';
        input.style.border = '1px solid #FFFFFF';
        input.style.color = '#FFFFFF';
        input.style.backgroundColor = '#242424';
        subtitle.style.color = '#ffffff';
        highlightInfo.style.backgroundColor = '#454545'
        highlightLaunch.style.color = 'rgba(255, 255, 255, 0.7)';
        highlightGenres.style.color = 'rgba(255, 255, 255, 0.7)';
        highlightDescription.style.color = '#FFFFFF';
        btnNext.src = './assets/seta-direita-branca.svg';
        btnPrev.src = './assets/seta-esquerda-branca.svg';
    }
}


btnTheme.addEventListener('click', function(event) {
    if (pagina.getAttribute('tema') === 'claro') {
        pagina.setAttribute("tema", 'escuro');
    }
    else {
        pagina.setAttribute("tema", 'claro');
    }

    mudarTema()
})

let inicioDaLista = 0;

preencherLista(inicioDaLista);

input.addEventListener('keydown', function (event) {

    if (event.key !== 'Enter') {
        return
    }

    if (input.value !== "") {
        let inicioContador = inicioDaLista;
        movies.innerHTML = "";
    
        for (i = 0 ; i < 5 ; i++) {
            const movieBox = document.createElement('div');
            movieBox.classList.add('movie');
            
            movies.append(movieBox);
        }
        
        const movie = document.querySelectorAll('.movie');
        
        for (item of movie) {
            const info = document.createElement('div');
            info.classList.add('movie__info');
        
            item.append(info);
        }
        
        const movieInfo = document.querySelectorAll('.movie__info');
        
        for (item of movieInfo) {
            const movieTitle = document.createElement('span');
            movieTitle.classList.add('movie__title');
        
            const movieRating = document.createElement('span');
            movieRating.classList.add('movie__rating');
        
            item.append(movieTitle, movieRating);
        }
        
        const movieRating = document.querySelectorAll('.movie__rating');
        

        fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=${input.value}`).then(function (resposta) {
        const promiseBody = resposta.json();
        let contador = inicioContador;

        
        
        promiseBody.then(function (body) {
            console.log(body);
            for (item of movie) {
                item.style.backgroundImage = `url(${body.results[contador].poster_path})`
                item.setAttribute('id', body.results[contador].id);
                contador++;
            }
            
        });


        const movieTitle = document.querySelectorAll('.movie__title');

        promiseBody.then(function (body) {

            contador = inicioContador;
            for (item of movieTitle) {

                item.textContent = `${body.results[contador].title}`
                contador++;
            }

        });


        promiseBody.then(function (body) {

            contador = inicioContador;
            for (item of movieRating) {

                item.textContent = `${body.results[contador].vote_average}`
                contador++;
            }

            for (item of movieRating) {
                const star = document.createElement('img');
                star.src = "./assets/estrela.svg";
            
                item.append(star);
            }
        });

        abrirModal()
        });
    }
    else {
        preencherLista(inicioDaLista);
    }
});

fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR').then(function (resposta) {
    const promiseBody = resposta.json();
    
    promiseBody.then(function (body) {
        highlightVideo.style.backgroundImage = `url(${body.backdrop_path})`
    });

    promiseBody.then(function (body) {
        highlightTitle.textContent = `${body.title}`
    });

    promiseBody.then(function (body) {
        highlightRating.textContent = `${body.vote_average}`
    });
    
    promiseBody.then(function (body) {
        const arrayGeneros = [];
        
        for (genero of body.genres) {
            arrayGeneros.push(genero.name);
        }
        
        const generos = arrayGeneros.join(', ');
        
        highlightGenres.textContent = `${generos}`;
    });
    
    promiseBody.then(function (body) {
        
        const ano = body.release_date.substr(0, 4);
        const dia = body.release_date.substr(8, 2);
        let mes = body.release_date.substr(5, 2);
        switch (mes) {
            case "01": mes = "janeiro"; break;
            case "02": mes = "fevereiro"; break;
            case "03": mes = "março"; break;
            case "04": mes = "abril"; break;
            case "05": mes = "maio"; break;
            case "06": mes = "junho"; break;
            case "07": mes = "julho"; break;
            case "08": mes = "agosto"; break;
            case "09": mes = "setembro"; break;
            case "10": mes = "outubro"; break;
            case "11": mes = "novembro"; break;
            case "12": mes = "dezembro"; break;
        }
        const data = dia + " de " + mes + " de " + ano;
        highlightLaunch.textContent = data
    });
    
    promiseBody.then(function (body) {
        highlightDescription.textContent = `${body.overview}`
    });

    
});

fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR').then(function (resposta) {
    const promiseBody = resposta.json();
    
    promiseBody.then(function (body) {
        highlightVideoLink.href = `https://www.youtube.com/watch?v=${body.results[0].key}`
    });
});

const allMovie = document.querySelectorAll('.movie');

function abrirModal() {
    const allMovie = document.querySelectorAll('.movie');
    allMovie.forEach(element => {
        element.addEventListener('click', function (event) {
            modal.classList.remove('hidden');
    
            const id = element.getAttribute('id');
            
            fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${id}?language=pt-BR`).then(function (resposta) {
                const promiseBody = resposta.json();
                
                promiseBody.then(function (body) {
                    modalTitle.textContent = body.title;
                });
    
                promiseBody.then(function (body) {
                    modalImg.src = body.backdrop_path;
                });
    
                promiseBody.then(function (body) {
                    modalDescription.textContent = body.overview;
                });
    
                promiseBody.then(function (body) {
                    modalAverage.textContent = body.vote_average;
                });
    
                promiseBody.then(function (body) {
                    for (item of body.genres) {
                        const genre = document.createElement('span');
                        genre.textContent = item.name;
                        genre.classList.add('modal__genre');
    
                        modalGenres.append(genre);
                    }
                });
            });
        });
    });
}


modalClose.addEventListener('click', function (event) {
    modal.classList.add('hidden');
    modalGenres.innerHTML = "";
});

modal.addEventListener('click', function (event) {
    modal.classList.add('hidden');
    modalGenres.innerHTML = "";
});

btnPrev.addEventListener('click', function (event) {
    if (inicioDaLista > 0) {
        inicioDaLista -= 5;
    }
    else {
        inicioDaLista = 15;
    }
    preencherLista(inicioDaLista);
});

btnNext.addEventListener('click', function (event) {
    if (inicioDaLista < 15) {
        inicioDaLista += 5;
    }
    else {
        inicioDaLista = 0;
    }
    preencherLista(inicioDaLista);
});


function preencherLista(inicioContador) {
    movies.innerHTML = "";
    
    for (i = 0 ; i < 5 ; i++) {
        const movieBox = document.createElement('div');
        movieBox.classList.add('movie');
        
        movies.append(movieBox);
    }
    
    const movie = document.querySelectorAll('.movie');
    
    for (item of movie) {
        const info = document.createElement('div');
        info.classList.add('movie__info');
    
        item.append(info);
    }
    
    const movieInfo = document.querySelectorAll('.movie__info');
    
    for (item of movieInfo) {
        const movieTitle = document.createElement('span');
        movieTitle.classList.add('movie__title');
    
        const movieRating = document.createElement('span');
        movieRating.classList.add('movie__rating');
    
        item.append(movieTitle, movieRating);
    }
    
    const movieRating = document.querySelectorAll('.movie__rating');
    
    

    fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false').then(function (resposta) {
    const promiseBody = resposta.json();
    let contador = inicioContador;

    
    
    promiseBody.then(function (body) {
        
        for (item of movie) {
            item.style.backgroundImage = `url(${body.results[contador].poster_path})`
            item.setAttribute('id', body.results[contador].id);
            contador++;
        }
        
    });


    const movieTitle = document.querySelectorAll('.movie__title');

    promiseBody.then(function (body) {

        contador = inicioContador;
        for (item of movieTitle) {

            item.textContent = `${body.results[contador].title}`
            contador++;
        }

    });


    promiseBody.then(function (body) {

        contador = inicioContador;
        for (item of movieRating) {

            item.textContent = `${body.results[contador].vote_average}`
            contador++;
        }

        for (item of movieRating) {
            const star = document.createElement('img');
            star.src = "./assets/estrela.svg";
        
            item.append(star);
        }


    });

    abrirModal()
    });


}





