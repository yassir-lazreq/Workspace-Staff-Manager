
// DOM Element Selections

const addBtn = document.getElementById("ajouter");
const addContainer = document.getElementById("addContainer");
const modalOverlay = document.querySelectorAll(".modal-overlay");
const formulaire = document.getElementById("formulaire");
const addExperianceBtn = document.getElementById("addExperianceBtn");
const unassinedList = document.getElementById("unassined");
const addEmployeeToDepartmentBtns = document.querySelectorAll(".icon-plus");
const employeeListContainer = document.getElementById("employeeList");
const departmentEmployeeList = document.getElementById("departmentEmployeeList");
const imgInput = document.getElementById("img");
const imgPreview = document.getElementById("preview");
const nomInput = document.getElementById("nom");
const roleSelect = document.getElementById("role");
const emailInput = document.getElementById("email");
const telephoneInput = document.getElementById("telephone");
const experiencesDiv = document.querySelector(".list-des-experience");

// Error message elements
const nomError = document.getElementById("nom-error");
const roleError = document.getElementById("role-error");
const emailError = document.getElementById("email-error");
const telephoneError = document.getElementById("telephone-error");
const imgError = document.getElementById("img-error");


// Application State

let experienceCount = 1;
let employeeArray = [];
let conferencesArray = [];
let receptionArray = [];
let serverRoomArray = [];
let securityRoomArray = [];
let staffRoomArray = [];
let archivesArray = [];


// Validation Functions

function validateNom() {
    const value = nomInput.value.trim();
    if (value === "") {
        setFieldError(nomInput, nomError, "Le nom est requis");
        return false;
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$/.test(value)) {
        setFieldError(nomInput, nomError, "Le nom doit contenir au moins 2 lettres");
        return false;
    } else {
        clearFieldError(nomInput, nomError);
        return true;
    }
}

function validateEmail() {
    const value = emailInput.value.trim();
    if (value === "") {
        setFieldError(emailInput, emailError, "L'email est requis");
        return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setFieldError(emailInput, emailError, "Format d'email invalide");
        return false;
    } else {
        clearFieldError(emailInput, emailError);
        return true;
    }
}

function validateTelephone() {
    const value = telephoneInput.value.trim();
    if (value === "") {
        setFieldError(telephoneInput, telephoneError, "Le téléphone est requis");
        return false;
    } else if (!/^\+?\d{8,15}$/.test(value)) {
        setFieldError(telephoneInput, telephoneError, "Format de téléphone invalide (8-15 chiffres)");
        return false;
    } else {
        clearFieldError(telephoneInput, telephoneError);
        return true;
    }
}

function validateRole() {
    if (!roleSelect.value) {
        setFieldError(roleSelect, roleError, "Veuillez sélectionner un rôle");
        return false;
    } else {
        clearFieldError(roleSelect, roleError);
        return true;
    }
}

function validateImg() {
    const file = imgInput.files[0];
    if (!file) {
        setFieldError(imgInput, imgError, "Une photo est requise");
        return false;
    } else if (!file.type.startsWith("image/")) {
        setFieldError(imgInput, imgError, "Le fichier doit être une image");
        return false;
    } else {
        clearFieldError(imgInput, imgError);
        return true;
    }
}

// UI / Rendering Functions

function setFieldError(input, errorElement, message) {
    input.classList.add("input-error");
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }
    input.focus();
}

function clearFieldError(input, errorElement) {
    input.classList.remove("input-error");
    if (errorElement) {
        errorElement.textContent = "";
        errorElement.style.display = "none";
    }
}

function clearImagePreview() {
    imgPreview.src = "";
}

function updateImagePreview() {
    const file = imgInput.files[0];
    if (file) {
        imgPreview.src = URL.createObjectURL(file);
    } else {
        clearImagePreview();
    }
}

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
        const index = employeeArray.indexOf(employee);
        if (index !== -1) {
            employeeArray.splice(index, 1);
        }
        console.log(employeeArray);
    });
    employeediv.appendChild(deleteBtn);
}

function addExperienceForm() {
    experienceCount++;

    const newExperienceDiv = document.createElement("div");
    newExperienceDiv.classList = "experiences-div";

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
    experiencesDiv.appendChild(newExperienceDiv);
}

function getDepartmentArray(departmentId) {
    switch (departmentId) {
        case "salleConference": return conferencesArray;
        case "reception": return receptionArray;
        case "salleServeur": return serverRoomArray;
        case "salleSecurite": return securityRoomArray;
        case "sallePersonnel": return staffRoomArray;
        case "salleArchives": return archivesArray;
        default: return null;
    }
}


function showEmployeeListModal(btn) {
    departmentEmployeeList.innerHTML = "";
    const departmentArray = getDepartmentArray(btn.getAttribute("data-departement"));
    if (btn.getAttribute("data-max") <= departmentArray.length) return;
    employeeListContainer.className = "add-container";
    employeeArray.forEach(employee => {
        if (employee.department === null && btn.getAttribute("data-accessibilite").includes(employee.role.toLowerCase())) {
            const employeediv = document.createElement("div");
            employeediv.classList.add("employee-div");
            departmentEmployeeList.appendChild(employeediv);

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

            employeediv.addEventListener('click', () => {
                const department = btn.getAttribute("data-departement");
                employee.department = department;
                departmentEmployeeList.removeChild(employeediv);
                const index = employeeArray.indexOf(employee);
                if (index !== -1) {
                    employeeArray.splice(index, 1);
                }

                const departementContainer = document.getElementById(department);
                const departmentList = departementContainer.querySelector(".employee-list-in-department");
                departmentList.innerHTML = "";
                const employeeConter = departementContainer.querySelector(".department-count");
                employeeConter.textContent = departmentArray.length + "/" + btn.getAttribute("data-max");
                departmentArray.push(employee);
                renderUnassinedEmployeesArray(employeeArray, department);
                renderDepartmentsArray(departmentArray, departmentList);
            });
        }
    });
}

function renderDepartmentsArray(departmentArray, departmentList) {

    departmentArray.forEach(employee => {
        renderDepartments(employee, departmentList);
    });
}

function renderDepartments(employee, departmentList) {
    const employeediv = document.createElement("div");
    employeediv.classList.add("employee-div-in-department");
    departmentList.appendChild(employeediv);

    const empProfile = document.createElement("img");
    empProfile.src = URL.createObjectURL(employee.img);
    empProfile.alt = "Profile Picture";
    empProfile.classList.add("employee-profile-in-department");
    employeediv.appendChild(empProfile);

    const empInfoDiv = document.createElement("div");
    empInfoDiv.classList.add("employee-info-in-department");
    employeediv.appendChild(empInfoDiv);

    const empName = document.createElement("h3");
    empName.textContent = employee.nom;
    empInfoDiv.appendChild(empName);

    const empRole = document.createElement("p");
    empRole.textContent = employee.role;
    empInfoDiv.appendChild(empRole);
}

function hideModals() {
    addContainer.className = "hidden";
    employeeListContainer.className = "hidden";
    clearImagePreview();
}

function validateExperienceRow(row) {
    const entrepriseInput = row.querySelector(".entreprise");
    const posteInput = row.querySelector(".poste");
    const startInput = row.querySelector(".start-date");
    const endInput = row.querySelector(".end-date");

    const entreprise = entrepriseInput.value.trim();
    const poste = posteInput.value.trim();
    const start = startInput.value.trim();
    const end = endInput.value.trim();

    if (!entreprise && !poste && !start && !end) {
        clearFieldError(entrepriseInput);
        clearFieldError(posteInput);
        clearFieldError(startInput);
        clearFieldError(endInput);
        return true;
    }

    let valid = true;

    if (!entreprise) {
        setFieldError(entrepriseInput);
        valid = false;
    } else {
        clearFieldError(entrepriseInput);
    }

    if (!poste) {
        setFieldError(posteInput);
        valid = false;
    } else {
        clearFieldError(posteInput);
    }

    if (!start || !end) {
        setFieldError(row.querySelector(".start-date"));
        setFieldError(row.querySelector(".end-date"));
        valid = false;
    }
    else if (new Date(start) > new Date(end)) {
        setFieldError(row.querySelector(".start-date"));
        setFieldError(row.querySelector(".end-date"));
        valid = false;
    } else {
        clearFieldError(row.querySelector(".start-date"));
        clearFieldError(row.querySelector(".end-date"));
    }

    return valid;
}

experiencesDiv.addEventListener("input", (e) => {
    const row = e.target.closest(".experiences-div");
    if (row) {
        validateExperienceRow(row);
    }
});



// Event Handlers
function showAddEmployeeModal() {
    addContainer.className = "add-container";
}

function handleFormSubmit(e) {
    e.preventDefault();

    const isFormValid = validateNom() && validateEmail() && validateTelephone() && validateRole() && validateImg();

    let experiencesArray = [];
    const experienceRows = document.querySelectorAll(".experiences-div");

    let allExperiencesValid = true;
    experienceRows.forEach(row => {
        if (!validateExperienceRow(row)) {
            allExperiencesValid = false;
        }
    });

    if (!isFormValid || !allExperiencesValid) {
        return;
    }


    experienceRows.forEach(row => {
        const entrepriseInput = row.querySelector(".entreprise");
        const posteInput = row.querySelector(".poste");
        const startInput = row.querySelector(".start-date");
        const endInput = row.querySelector(".end-date");

        if (entrepriseInput.value.trim() !== "" && posteInput.value.trim() !== "" && startInput.value.trim() !== "" && endInput.value.trim() !== "") {
            experiencesArray.push({
                entreprise: entrepriseInput.value,
                poste: posteInput.value,
                startDate: startInput.value,
                endDate: endInput.value
            });
        }
    });

    const employee = {
        nom: nomInput.value,
        role: roleSelect.value,
        email: emailInput.value,
        telephone: telephoneInput.value,
        img: imgInput.files[0],
        experiences: experiencesArray,
        department: null
    };

    employeeArray.push(employee);
    renderUnassinedEmployeesArray(employeeArray);

    formulaire.reset();
    hideModals();
    console.log(employeeArray);
}

function renderUnassinedEmployeesArray(employeeArray) {
    unassinedList.innerHTML = "";
    employeeArray.forEach(employee => {
        renderUnassinedEmployees(employee);
    });
}

// Event Listeners

addBtn.addEventListener('click', showAddEmployeeModal);
addExperianceBtn.addEventListener('click', addExperienceForm);
formulaire.addEventListener('submit', handleFormSubmit);

modalOverlay.forEach(overlay => {
    overlay.addEventListener('click', hideModals);
});

addEmployeeToDepartmentBtns.forEach(btn => {
    btn.addEventListener('click', () => showEmployeeListModal(btn));
});


nomInput.addEventListener("input", validateNom);
emailInput.addEventListener("input", validateEmail);
telephoneInput.addEventListener("input", validateTelephone);
roleSelect.addEventListener("change", validateRole);
imgInput.addEventListener("change", () => {
    validateImg();
    updateImagePreview();
});
