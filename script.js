const totalSpots = document.querySelector('#total-spots');
const available = document.querySelector('#available');
// const occupied = document.querySelector('#occupied');
const showBtn = document.querySelectorAll('.show-btn');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const close = document.querySelector('.close-modal');
const palteNumber = document.querySelector('.input');
const addForm = document.querySelector('.form-card')



let parkingSpots = [];
// ============= display and hide modal =============
const openModal = function () {
    console.log('show btn');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

for (let i = 0; i < showBtn.length; i++) {
    showBtn[i].addEventListener('click', openModal);
}
const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

function init() {
    const TOTAL_SPOTS = 20;
    totalSpots.textContent = TOTAL_SPOTS;
    if (!localStorage.getItem('parkingSpots')) {
        parkingSpots = [];
        for (let i = 1; i <= TOTAL_SPOTS; i++) {
            parkingSpots.push({
                number: i,
                occupied: false,
            });
        }
        localStorage.setItem('parkingSpots', JSON.stringify(parkingSpots));
    } else parkingSpots = JSON.parse(localStorage.getItem('parkingSpots'));
}
init()

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const plate = palteNumber.value.trim();

    if (!plate) return alert('u should add plate number!');

    let parkedVehicles = JSON.parse(localStorage.getItem('parkedVehicles')) || [];
    let parkingSpots = JSON.parse(localStorage.getItem('parkingSpots')) || [];
})