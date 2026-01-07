const totalSpots = document.querySelector('#total-spots');
const available = document.querySelector('#available');
const occupied = document.querySelector('#occupied');
const showBtn = document.querySelector(".show-btn");
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const close = document.querySelector('.close-modal');
const input = document.querySelector('.input');
totalSpots.textContent = '10';

// ============= display and hide modal =============
showBtn.addEventListener('click', function(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
});
const closeModal = function(){
   modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown',(e)=>{
    if(e.key === 'Escape' && !modal.classList.contains('hidden')){
        closeModal();
    }
});

function addVehicle() {
    
}