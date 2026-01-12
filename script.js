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


const spot = document.querySelector('.spot')

let parkingSpots = [];
// ============= display and hide modal =============
const openMoodal = function () {
    console.log('show btn');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

for (let i = 0; i < showBtn.length; i++) {
    showBtn[i].addEventListener('click', openMoodal);
}
const closeMoodal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
overlay.addEventListener('click', closeMoodal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeMoodal();
    }
});

function init() {
    displaySpots();
    const TOTAL_SPOTS = 8;
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
    displaySpots();
}
init();
const type = vehicleType.value;
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const plate = plateNumber.value.trim();
    const type = vehicleType.value;

    if (!plate) return alert('u should add plate number!');

    let parkedVehicles = JSON.parse(localStorage.getItem('parkedVehicles')) || [];
    let parkingSpots = JSON.parse(localStorage.getItem('parkingSpots')) || [];
    const exist = parkedVehicles.find(v => v.plateNumber === plate);
    if (exist) {
        return alert('This vehicle is already parked');
    }

    const freeSpot = parkingSpots.find(e => e.occupied == false);
    if (!freeSpot) {
        alert('the parking is full')
    }

    let spotNumber = 0;
    const now = new Date()
    const vehicle = parkedVehicles.push({
        spotNumber: spotNumber++,
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

    displaySpots();
    // console.log(parkedVehicles);

});


function displaySpots() {
    let parkingSpots = JSON.parse(localStorage.getItem('parkingSpots')) || [];
    const spotsCon = document.querySelector('#spots-con');
    spotsCon.innerHTML = "";
    parkingSpots.slice(0, 8).forEach(element => {
        if (element.occupied == false) {
            spotsCon.insertAdjacentHTML(
                "beforeend",
                `<button 
     class="spot free show-modal"
     data-number="${element.number}"
     data-occupied="${element.occupied}"
   >
     <p>A${element.number}</p>
   </button>`
            );

        } else {
            spotsCon.insertAdjacentHTML(
                "beforeend",
                `<button 
     class="spot occupied show-modal"
     data-number="${element.number}"
     data-occupied="${element.occupied}"
   >
     <p>A${element.number}</p>
   </button>`
            );

        }
    });
}

// ============= display and hide modal =============
const openModal = function () {
    // console.log('show btn');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

const spotsCon = document.querySelector('#spots-con');

const plateNumberModal = document.querySelector('.plate-number-modal');
const spotNumberModal = document.querySelector('.spot-number');
const entryTimeModal = document.querySelector('.entry-time-modal');
const priceModal = document.querySelector('.price-modal');
const durationModal = document.querySelector('.duration');
const typemodal = document.querySelector('.type');

spotsCon.addEventListener('click', function (e) {
    const btn = e.target.closest('.show-modal');
    if (!btn) return;

    const spotNumber = parseInt(btn.dataset.number);
    const isOccupied = btn.dataset.occupied;
    console.log(spotNumber);
    openModal();

    spotNumberModal.textContent = `#${spotNumber}`;


    if (isOccupied == "true") {
        let parkedVehicles = JSON.parse(localStorage.getItem('parkedVehicles')) || [];
        const getInfo = parkedVehicles.find(v => v.spotNumber === spotNumber);
        // plateNumberModal.textContent = getPlate.plateNumber

        if (getInfo) {
            plateNumberModal.textContent = getInfo.plateNumber
            entryTimeModal.textContent = getInfo.enterTime
            typemodal.textContent = getInfo.type
            // console.log(getInfo.enterTime);
            const now = new Date();
            const totalTimeS = now.getTime() - getInfo.entryTime;
            const totalTimeM = Math.floor(totalTimeS / 60000);
            const price = (0.08 * totalTimeM).toFixed(2);
            // console.log(price);
            priceModal.textContent = `${price} MAD`;

            const totalDuration = Math.floor(totalTimeM / 60);
            if (totalDuration == 0) {
                durationModal.textContent = `${totalTimeM} min `;
            } else
                durationModal.textContent = `${totalDuration} H `;
        }
    } else {
        plateNumberModal.textContent = '-';
        entryTimeModal.textContent = '-';
        durationModal.textContent = '-';
        typemodal.textContent = '-';
        priceModal.textContent = `0 MAD`;
    }
    openModal();
});

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// const ttttt = parkedVehicles.find(v=>v.spotNumber === 1);
//         const getInfo = parkedVehicles.find(v=>v.number === number);
//         // plateNumberModal.textContent = getPlate.plateNumber

//      console.log(getInfo)

let parkedVehicles = JSON.parse(localStorage.getItem('parkedVehicles')) || [];

const payBtn = document.querySelector('.pay-btn');

payBtn.addEventListener('click', () => {

    const history = JSON.parse(localStorage.getItem('sethistory')) || []
    const historyItem = history.push({
        plateNumber: plateNumberModal.textContent,
        type: typemodal.textContent,
        entryTime: entryTimeModal.textContent,
        price: priceModal.textContent,
        exitTime: new Date().toLocaleTimeString(),
        spotNumber: spotNumberModal.textContent,
    });
    localStorage.setItem('sethistory', JSON.stringify(history));
    let parkingSpots = JSON.parse(localStorage.getItem('parkingSpots')) || [];


    plateNumberModal.textContent = '-'
    entryTimeModal.textContent = '-'
    durationModal.textContent = '-'
    priceModal.textContent = `0 MAD`
    const getSpotNumber = parseInt(spotNumberModal.textContent.replace('#', ''));
    const spot = parkingSpots.find(element => element.number == getSpotNumber);
    if (spot) { spot.occupied = false }

    localStorage.setItem('parkedVehicles', JSON.stringify(parkedVehicles));
    localStorage.setItem('parkingSpots', JSON.stringify(parkingSpots));

    closeModal();
    location.reload();
});

function history() {
    const history = JSON.parse(localStorage.getItem('sethistory')) || []
    console.log(history);
    console.log(history.exitTime);
    let parkingSpots = JSON.parse(localStorage.getItem('parkingSpots')) || [];
    const historyCon = document.querySelector("#tbody-history")
    // let nullTme = parkedVehicles.find(element => element.exitTime = null );
    historyCon.innerHTML = "";
if (history.length === 0) {
    historyCon.innerHTML = `
        <tr>
            <td colspan="5" id="test">
                Aucun retard enregistré
            </td>
        </tr>
    `;
}

    else {
        history.forEach(element => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
         <tr>
                <td>${element.plateNumber}</td>
                <td>${element.type}</td>
                <td>${element.entryTime}</td>
                <td>${element.entryTime}</td>
                <td>${element.exitTime}</td>
                <td>${element.price}</td>
              </tr>
        `
            historyCon.appendChild(tr)
        });
    }

}
history();
