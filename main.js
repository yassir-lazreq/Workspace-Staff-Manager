const addBtn = document.getElementById("ajouter");
const addContainer = document.getElementById("addContainer");
const modalOverlay = document.querySelector(".modal-overlay");
const formulaire = document.getElementById("formulaire");
const addExperianceBtn = document.getElementById("addExperianceBtn");

let experienceCount = 1;
let employeeArray = [];

addBtn.addEventListener('click', () => {
    addContainer.className = "add-container";
})
modalOverlay.addEventListener('click', () => {
    addContainer.className = "hidden";
})

addExperianceBtn.addEventListener('click', () => {
    experienceCount++;
    const experiencesDiv = document.querySelector(".list-des-experience");

    const newExperienceDiv = document.createElement("div");
    newExperienceDiv.classList = "experiences-div";
    experiencesDiv.appendChild(newExperienceDiv);

    const newEntreprise = document.createElement("input");
    newEntreprise.classList = "input-experience";
    newEntreprise.placeholder = "Entreprise";

    const newPost = document.createElement("input");
    newPost.classList = "input-experience";
    newPost.placeholder = "Poste";

    const newDuree = document.createElement("input");
    newDuree.classList = "input-experience";
    newDuree.placeholder = "Période (ex: 2020 - 2025)";

    newExperienceDiv.appendChild(newEntreprise);
    newExperienceDiv.appendChild(newPost);
    newExperienceDiv.appendChild(newDuree);
    console.log(newExperienceDiv)
})

formulaire.addEventListener('submit', (e) => {
    e.preventDefault();
    let experiencesArray = [];
    
    const nom = document.getElementById("nom").value;
    const role = document.getElementById("role").value;
    const email = document.getElementById("email").value;
    const telephone = document.getElementById("telephone").value;
    const img = document.getElementById("img").files[0];

    const experience = {
        entreprise: document.getElementById("Experience").value,
        poste: document.getElementById("Poste").value,
        duree: document.getElementById("Duree").value
    }
    experiencesArray.push(experience);

    const department = null;

    const employee = {
        nom: nom,
        role: role,
        email: email,
        telephone: telephone,
        img: img,
        experience: experiencesArray,
        department: department
    }
    employeeArray.push(employee);

    addContainer.className = "hidden";
    console.log(employeeArray);
    formulaire.reset();
});
