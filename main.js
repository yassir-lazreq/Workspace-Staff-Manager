const addBtn = document.getElementById("ajouter");
const addContainer = document.getElementById("addContainer");
const modalOverlay = document.querySelector(".modal-overlay");



addBtn.addEventListener('click',() =>{
    addContainer.className = "add-container";
})
modalOverlay.addEventListener('click',() =>{
    addContainer.className = "hidden";
})