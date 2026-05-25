# Rick and Morty Explorer

## Projectbeschrijving :
Rick and Morty Multiverse Explorer is een webapplicatie gebouwd met JavaScript en Vite. De applicatie maakt gebruik van de Rick and Morty API om personages uit de serie op te halen en weer te geven. 
Gebruikers kunnen personages zoeken, filteren en sorteren op verschillende eigenschappen zoals status, soort en geslacht. Daarnaast kunnen favoriete personages opgeslagen worden via LocalStorage zodat deze behouden blijven tussen verschillende sessies.

## Functionaliteiten : 
- Meer dan 60 Rick and Morty characters bekijken via de API
- Op een character klikken om extra details te bekijken
- Zoeken op naam, soort of status
- Filteren op status, soort en gender
- Sorteren op naam, status of soort
- Characters toevoegen aan een persoonlijke Survival Kit (favorieten)
- Favorieten bewaren via LocalStorage
- Wisselen tussen donker en licht thema
- Klikbare statistieken voor alive/dead characters
- Geanimeerde character cards via IntersectionObserver API
- Responsive design voor desktop, tablet en mobiel
- Gebruiksvriendelijke interface met interactieve elementen

## Gebruikte API'S : 
- https://rickandmortyapi.com
- https://rickandmortyapi.com/api/character

## DOM Manipulatie : 
Vereiste :                            | Implementatie:
- Elementen selecteren                  `el()` functie : main.js regel 14
- Elementen manipuleren                 `innerHTML` kaarten : main.js regel 57
- Events koppelen                       `addEventListener` : main.js regel 

## JavaScript Concepten :
Vereiste :                            | Implementatie:
- Constanten                            `const API` : main.js regel 3
- Template literals                      HTML kaarten genereren : main.js regel 46
- Iteratie over arrays                   `.forEach()` filters :  main.js regel 148
- Array methodes                         `.filter()` `.map()` `.sort()` : main.js regel 80
- Arrow functions                         overal gebruikt : main.js regel 44
- Ternaire operator                      `isFav ? 'active' : ''` : main.js regel 44
- Callback functions                      event listeners : main.js regel 131
- Async & Await                           `async function load()` : main.js regel 16
- Observer API                            `IntersectionObserver` kaarten : main.js regel 63

## Data & API :
Vereiste :                            | Implementatie:
- Fetch                                 `fetch(API)` : main.js regel 18
- JSON                                  `res.json()` : main.js regel 23

## Opslag & Validatie :
Vereiste :                            | Implementatie:
- LocalStorage favorieten               `localStorage.setItem('favs')` : main.js regel 100
- LocalStorage thema                    `localStorage.setItem('theme')` : main.js regel 178
- Form validatie                         melding bij 1 karakter zoeken : main.js regel 134

## Styling & Layout :
Vereiste :                            | Implementatie:
- CSS Grid                              characters grid - style.css
- Flexbox                               header en filters - style.css
- Animaties                             hover en fade-in - style.css
- Responsive                            media queries - style.css
- Icoontjes                             Font Awesome - index.html

## Installatiehandeling : 
 - Clone de repository :
 git clone https://github.com/insafhadour/rick-and-morty
- Ga naar de map :
 cd rick-and-morty
- Start :
  npm run dev

## Screenshots :
![Startpagina](public/Schermafbeelding%202026-05-25%20012124.png)
![Night mode](public/Schermafbeelding%202026-05-25%20013447.png)
![Character](public/Schermafbeelding%202026-05-25%20031921.png)



## Gebruikte bronnen : 
- Rick and Morty API: https://rickandmortyapi.com
- Font Awesome: https://fontawesome.com
- Vite: https://vitejs.dev
- AI chatlog : Claude voor : - debugging van JavaScript fouten - hulp bij de implementatie van filters - hulp bij de IntersectionObserver API - structuur en organisatie van de code - verbetering van CSS animaties





  