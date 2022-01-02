const KEY = '0dfd77cf23ff4e86a2b0a2b599e3574b';
citySearchInput = document.querySelector('.citySearchInput');
const searchButton = document.querySelector('.searchButton')
const symboDiv = document.querySelector('.symboDiv');
symboDiv.style.display = "none"
const mainDiv = document.querySelector('.mainDiv')
const dayOneDiv = document.querySelector('.dayOneDiv')
const carouselinner = document.querySelector('.carousel-inner');
const carouselslide = document.querySelector('.carousel slide w-50 p-3')
const next = document.querySelector('.carousel-control-next-icon')
const prev = document.querySelector('.carousel-control-prev-icon')
const h2 = document.querySelector("#message");
searchButton.addEventListener('click', function (event) {
    const symboDiv = document.querySelector('.symboDiv');
    symboDiv.style.display = "none"
    const city = citySearchInput.value;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${KEY}&lang=sv`
    event.preventDefault()
    symboDiv.style.display = "flex";
    animation.play();

    removeAllt();
    fetch(url)

        .then(function (response) {
            symboDiv.style.display = "none"

            if (response.status >= 200 && response.status < 300) {
                return response.json();



            } else {
                throw "Something went wrong. :( Try again!";
            }

        })
        .then(function (data) {
            prev.style.display = 'flex'
            next.style.display = 'flex'

            for (let i = 0; i < 6; i++) {
                const arrayOfData = data.data[i];
                let cityName = document.createElement('h5')
                    cityName.innerText=`Väderet i   "${city}"`;
                let daysDiv = document.createElement('div');
                daysDiv.classList.add('carousel-item');
                let Temperatur = document.createElement('h3');
                Temperatur.innerText = 'Temperatur ' + arrayOfData.temp;
                let Vindhastighet = document.createElement('h4');
                Vindhastighet.innerText = 'Vindhastighet ' + arrayOfData.wind_spd;
                let Luftfuktighet = document.createElement('h5');
                Luftfuktighet.innerText = 'Luftfuktighet :' + arrayOfData.rh;
                const weatherIcon = document.createElement('img');
                weatherIcon.classList.add('d-block', 'w-50');
                weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${arrayOfData.weather.icon}.png`
                let discriptions = document.createElement('p');
                discriptions.innerText = arrayOfData.weather.description;
                discriptions.style.fontWeight = 'bold'
                const date = document.createElement('h5');
                date.innerText = arrayOfData.datetime;
                if (i === 0) {
                    dayOneDiv.appendChild(cityName)
                    dayOneDiv.appendChild(weatherIcon);
                    dayOneDiv.appendChild(Temperatur);
                    dayOneDiv.appendChild(Vindhastighet);
                    dayOneDiv.appendChild(Luftfuktighet);
                    dayOneDiv.appendChild(discriptions)
                    dayOneDiv.appendChild(date)
                }
                else {
                    carouselinner.appendChild(daysDiv);
                    daysDiv.appendChild(weatherIcon);

                    daysDiv.appendChild(Temperatur);

                    daysDiv.appendChild(discriptions)
                    daysDiv.appendChild(date)
                }
                if (i === 1) {
                    daysDiv.classList.add('active');
                }
            }
        })
        .catch(function (error) {

            setMessage("Something went wrong. 🙄 Try again!");
        });

})

function setMessage(message) {
    h2.style.display = "block";
    h2.innerText = message;
}

function removeAllt() {
    const delet = document.querySelectorAll(".mainDiv *");
    const delet2 = document.querySelectorAll('.dayOneDiv *');
    const delet3 = document.querySelectorAll('.carousel-inner *');
    for (let i = 0; i < delet.length; i++) {
        delet[i].remove();
    }
    for (let i = 0; i < delet2.length; i++) {
        delet2[i].remove();
    }
    for (let i = 0; i < delet3.length; i++) {
        delet3[i].remove();

    }
    h2.innerText = ' '

}
const animation = anime({
    targets: '.symboDiv div',
    translateX: [20, 90],
    translateY: [20, 120],
    easing: 'steps(5)',
    scale: function (el, i, l) {
        return (l - i), 15;
    },
    delay: anime.stagger(100, { from: 'center' }),
    rotate: function () { return anime.random(-360, 360); },
    borderRadius: function () { return ['50%', anime.random(10, 35) + '%']; },
    loop: true
});

