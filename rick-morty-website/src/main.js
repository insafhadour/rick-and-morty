import './style.css';

const API ='https://rickandmortyapi.com/api/character';
const loadingScreen = document.getElementById('loading-screen');

let chars = [];
let favorites = JSON.parse(localStorage.getItem('favs')) || [];

function el(id) {
    return document.getElementById(id);
}

//data ophalen van de API
async function load() {
    try {
        const [res1, res2, res3] = await Promise.all ([
            fetch(`${API}?page=1`),
            fetch(`${API}?page=2`),
            fetch(`${API}?page=3`)
        ]);

        const [data1, data2, data3] = await Promise.all ([
            res1.json(),
            res2.json(),
            res3.json()
        ]);

        chars = [...data1.results, ...data2.results, ...data3.results];

        render(chars);
        updateStats();

    } catch (err) {
        el('characters-grid').innerHTML = '<p style="text-align:center;color:#ff6b6b">Error...</p>';
    } finally {
        loadingScreen.style.opacity = '0';
        setTimeout(() => (loadingScreen.style.display = 'none'), 500);
    }
}

//characters weergeven als kaarten
function render(list) {
   if (list.length === 0) {
    el('characters-grid').innerHTML = 
    '<p style="text-align:center;color:#9ca3af;grid-column:1/-1">No characters found...</p>';
    return;
   }
   const html = list.map(c => {
    const isFav = favorites.includes(c.id);
    const statusClass = `status-${c.status.toLowerCase()}`;

    return `
    <div class="character-card" onclick="openDetail(${c.id})">
    <img class="character-image" src="${c.image}" alt="${c.name}">
    <button class="favorite-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFav(${c.id})">
        <i class="fas fa-star"></i>
     </button>   
     <div class="character-info">
        <h3 class="character-name">${c.name}</h3>
        <span class="status-badge ${statusClass}">${c.status}</span>
        </div>
    </div>`;
   }).join('');

   el('characters-grid').innerHTML = html;
   observeCards();
}

// observer API : animatie voor kaarten als ze in beeld komen
function observeCards() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity ='1';
                entry.target.style.transform ='translateY(0)';

                observer.unobserve(entry.target);
            }
        });
    },{ threshold: 0.1 });

    document.querySelectorAll('.character-card').forEach(card => {
        observer.observe(card);
    });

}


    function updateStats() {
        const alive = chars.filter(c => c.status === 'Alive').length;
        const dead = chars.filter(c => c.status === 'Dead').length;

        el('total-characters').textContent = chars.length;
        el('alive-count').textContent = alive;
        el('dead-count').textContent = dead;
    }


function applyFilters() {
    const status = el('status-filters').value;
    const species = el('species-filter').value;
    const gender = el('gender-filter').value;
    const sort = el('sort-select').value;
    const search = el('search-input').value.toLowerCase();

    let results = chars.filter(c => {
        return (
            (!status || c.status === status) &&
            (!species || c.species === species) &&
            (!gender || c.gender === gender) &&
            (!search || c.name.toLowerCase().includes(search) ||
                        c.species.toLowerCase().includes(search))
        );
    });
    results.sort((a,b) => a[sort].localeCompare(b[sort]));

    render(results);
}

//favorieten opslaan in LocalStorage
function toggleFav(id) {
    const index = favorites.indexOf(id);
    if (index !== -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(id)
    }
    localStorage.setItem('favs', JSON.stringify(favorites));
    el('favorites-count').textContent = favorites.length;
    render(chars);
    renderFavoritesList();
}
window.toggleFav = toggleFav;

function renderFavoritesList() {
    const list = el('favorites-list');
    if (favorites.length === 0) {
        list.innerHTML = '<p style="color:#9ca3af;text-align:center">No characters in your Survival Kit yet!</p>';
        return;
    }
    const favChars = chars.filter(c => favorites.includes(c.id));
    list.innerHTML = favChars.map(c => `
        <div class="favorite-item">
        <img src="${c.image}" alt="${c.name}">
        <div class="favorite-item-info">
            <h4>${c.name}</h4>
            <small>${c.species} · ${c.status}</small>
            </div> 
            <button class="remove-favorite"onclick="toggleFav(${c.id})">
                <i class="fas fa-trash"></i> Remove 
            </button>
            </div>
        `).join('');
}

function openDetail(id) {
    const c = chars.find(ch => ch.id === id);
    const statusClass = `status-${c.status.toLowerCase()}`;
    
    document.getElementById('detail-modal').innerHTML = `
    <div class="modal-content">
    <button class="close-btn" onclick="closeDetail()">
    <i class="fas fa-times"></i>
    </button>
    <img src="${c.image}" alt="${c.name}" style="width:100%;border-radius:15px;margin-bottom:1rem">
    <h2 style="color:var(--primary);margin-bottom:1rem">${c.name}</h2>
    <div class="character-details">
    <span class="status-badge ${statusClass}">${c.status}</span>
    <span>${c.species}</span>
    <span>${c.gender}</span>
    <span>${c.location.name}</span>
    <span>${c.episode.length} episodes</span>
    <span>${c.origin.name}</span>
    </div>
    </div>
    `;
    document.getElementById('detail-modal').classList.add('active');
}

function closeDetail() {
    document.getElementById('detail-modal').classList.remove('active');
}
window.openDetail = openDetail;
window.closeDetail = closeDetail;


document.addEventListener('DOMContentLoaded', () => {
    el('search-input').addEventListener('input', (e) => { 
    const val = e.target.value.toLowerCase();
    const errorMsg = el('search-error');
    if (val.length === 1) {
        el('search-input').style.borderColor = '#ff6b6b';
        errorMsg.style.display = 'block';
    } else {
        el('search-input').style.borderColor = '';
        errorMsg.style.display = 'none';
    }
    if (val.length === 0 || val.length >= 2) {
        const results = chars.filter(c =>
            c.name.toLowerCase().includes(val) ||
            c.species.toLowerCase().includes(val) ||
            c.status.toLowerCase().includes(val)
        );
        render(results);
    }
});


['status-filters', 'species-filter', 'gender-filter', 'sort-select'].forEach(id => {
    el(id).addEventListener('change', applyFilters);
});

el('alive-count').closest('.stat-card').addEventListener('click', () => {
    el('status-filters').value = 'Alive';
    applyFilters();
});

el('dead-count').closest('.stat-card').addEventListener('click', () => {
    el('status-filters').value = 'Dead';
    applyFilters();
});

el('total-characters').parentElement.addEventListener('click', () => {
    el('status-filters').value ='';
    applyFilters();
});

el('clear-filters').addEventListener('click', () => {
    el('status-filters').value ='';
    el('species-filter').value = '';
    el('gender-filter').value = '';
    el('sort-select').value = 'name';
    el('search-input').value = '';
    render(chars);
});
    

el('survival-kit-btn').addEventListener('click', () => {
    renderFavoritesList();
    el('survival-kit-modal').classList.add('active');
});

el('close-modal').addEventListener('click', () => {
    el('survival-kit-modal').classList.remove('active');
});

el('survival-kit-modal').addEventListener('click',(e) => {
    if (e.target === el('survival-kit-modal')) {
        el('survival-kit-modal').classList.remove('active');
    }
});

el('theme-toggle').addEventListener('click', () => {
    document.body.toggleAttribute('data-theme');
    const icon = el('theme-toggle').querySelector('i');
    icon.className = document.body.hasAttribute('data-theme')
    ? 'fas fa-sun'
    : 'fas fa-moon';
    localStorage.setItem('theme', document.body.hasAttribute('data-theme') ? 'dark' : 'light');
});

if (localStorage.getItem('theme') === 'light') {
    document.body.setAttribute('data-theme', '');
    el('theme-toggle').querySelector('i').className = 'fas fa-sun';
}

el('favorites-count').textContent = favorites.length;

load();

});

        