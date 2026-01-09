const totalSpots = document.querySelector('#total-spots');
const available = document.querySelector('#available');
// const occupied = document.querySelector('#occupied');
const showBtn = document.querySelectorAll('.show-btn');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const close = document.querySelector('.close-modal');
const plateNumber = document.querySelector('.input');
const addForm = document.querySelector('.form-card')
const vehicleType = document.querySelector('.vehicle-type')



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
    const TOTAL_SPOTS = 10;
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
    const plate = plateNumber.value.trim();
    const type = vehicleType.value;

    if (!plate) return alert('u should add plate number!');

    let parkedVehicles = JSON.parse(localStorage.getItem('parkedVehicles')) || [];
    let parkingSpots = JSON.parse(localStorage.getItem('parkingSpots')) || [];
    console.log(parkedVehicles);
    const exist = parkedVehicles.find(v => v.plateNumber === plate)
    if (exist) {
        return alert('This vehicle is already parked');
    }

    const freeSpot = parkingSpots.find(e => e.occupied == false);
    if (!freeSpot) {
        alert('the parking is full')
    }
    const now = new Date()
    const vehicle = parkedVehicles.push({
        plateNumber: plate,
        type: type,
        exitTime: null,
        entryTime: now.getTime(),
        enterTime: now.toLocaleTimeString(),
        spotNumber: freeSpot.number
    });

    freeSpot.occupied = true;
    localStorage.setItem('parkingSpots', JSON.stringify(parkingSpots));

    parkedVehicles.push(vehicle)

    localStorage.setItem('parkedVehicles', JSON.stringify(parkedVehicles));
    localStorage.setItem('parkingSpots', JSON.stringify(parkingSpots));
    plateNumber.value = "";
    alert(`Vehicle ${plate} parked in slot ${freeSpot.number}`);
    
});

