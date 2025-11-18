const addBtn = document.getElementById("ajouter");
const addContainer = document.getElementById("addContainer");
const modalOverlay = document.querySelector(".modal-overlay");
const formulaire = document.getElementById("formulaire");
const addExperianceBtn = document.getElementById("addExperianceBtn");
const unassinedList = document.getElementById("unassined");

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
    newEntreprise.classList.add("input-experience", "entreprise");
    newEntreprise.placeholder = "Entreprise";

    const newPost = document.createElement("input");
    newPost.classList.add("input-experience", "poste");
    newPost.placeholder = "Poste";

    const newDuree = document.createElement("input");
    newDuree.classList.add("input-experience", "duree");
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

    const experienceRows = document.querySelectorAll(".experiences-div");

    experienceRows.forEach(row => {
        const entrepriseInput = row.querySelector(".entreprise");
        const posteInput = row.querySelector(".poste");
        const dureeInput = row.querySelector(".duree");

        if (
            entrepriseInput.value.trim() === "" &&
            posteInput.value.trim() === "" &&
            dureeInput.value.trim() === ""
        ) {
            return;
        }

        const experience = {
            entreprise: entrepriseInput.value,
            poste: posteInput.value,
            duree: dureeInput.value
        };

        experiencesArray.push(experience);
    });

    const department = null;

    const employee = {
        nom: nom,
        role: role,
        email: email,
        telephone: telephone,
        img: img,
        experiences: experiencesArray,
        department: department
    }
    employeeArray.push(employee);

    addContainer.className = "hidden";
    formulaire.reset();
    console.log(employeeArray);
    renderUnassinedEmployees(employee);
});


function renderUnassinedEmployees(employee) {
    const employeediv = document.createElement("div");
    employeediv.classList.add("employee-div");
    unassinedList.appendChild(employeediv);

    const empProfile = document.createElement("img");
    empProfile.src = URL.createObjectURL(employee.img);
    empProfile.alt = "Profile Picture";
    empProfile.classList.add("employee-profile");
    employeediv.appendChild(empProfile);

    const empInfoDiv = document.createElement("div");
    empInfoDiv.classList.add("employee-info");
    employeediv.appendChild(empInfoDiv);

    const empName = document.createElement("h3");
    empName.textContent = employee.nom;
    empInfoDiv.appendChild(empName);

    const empRole = document.createElement("p");
    empRole.textContent = employee.role;
    empInfoDiv.appendChild(empRole);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener('click', () => {
        unassinedList.removeChild(employeediv);
        employeeArray = employeeArray.filter(emp => emp !== employee);
        console.log(employeeArray);
    });
    employeediv.appendChild(deleteBtn);
}

