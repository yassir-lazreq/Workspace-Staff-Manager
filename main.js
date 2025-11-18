const addBtn = document.getElementById("ajouter");
const addContainer = document.getElementById("addContainer");
const modalOverlay = document.querySelector(".modal-overlay");
const formulaire = document.getElementById("formulaire");
const addExperianceBtn = document.getElementById("addExperianceBtn");

let experienceCount = 1;
let employeeArray = [];

addBtn.addEventListener('click',() =>{
    addContainer.className = "add-container";
})
modalOverlay.addEventListener('click',() =>{
    addContainer.className = "hidden";
})

formulaire.addEventListener('submit',(e) =>{
    e.preventDefault();
    const nom = document.getElementById("nom").value;
    const role = document.getElementById("role").value;
    const email = document.getElementById("email").value;
    const telephone = document.getElementById("telephone").value;
    const img = document.getElementById("img").files[0];
    const experience = document.getElementById("Experience").value;
    const post = document.getElementById("post").value;
    const periode = document.getElementById("periode").value;
    const department = null;

    const employee = {
        nom: nom,
        role: role,
        email: email,
        telephone: telephone,
        img: img,
        experience: experience,
        post: post,
        periode: periode,
        department: department
    }
    employeeArray.push({
        employee
    });

    addContainer.className = "hidden";
    console.log(employeeArray);
    formulaire.reset();
});
