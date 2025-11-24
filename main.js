// === Boutons / Actions ===
const addBtn = document.getElementById("ajouter");
const addExperienceBtn = document.getElementById("addExperienceBtn");
const addEmployeeToDepartmentBtns = document.querySelectorAll(".icon-plus");

// === Modals & overlays ===
const addContainer = document.getElementById("addContainer");
const modalOverlay = document.querySelectorAll(".modal-overlay");
const employeeInfoModal = document.getElementById("employeeInfoModal");
const employeeInfoDetailsDiv = document.getElementById("employeeInfoDetails");

// === Formulaire employé ===
const formulaire = document.getElementById("formulaire");
const imgInput = document.getElementById("img");
const imgPreview = document.getElementById("preview");
const nomInput = document.getElementById("nom");
const roleSelect = document.getElementById("role");
const emailInput = document.getElementById("email");
const telephoneInput = document.getElementById("telephone");
const experiencesDiv = document.querySelector(".list-des-experience");

// === Listes / Containers employés ===
const unassignedList = document.getElementById("unassigned");
const employeeListContainer = document.getElementById("employeeList");
const departmentEmployeeList = document.getElementById("departmentEmployeeList");

// Error Message Elements

const nomError = document.getElementById("nom-error");
const roleError = document.getElementById("role-error");
const emailError = document.getElementById("email-error");
const telephoneError = document.getElementById("telephone-error");
const imgError = document.getElementById("img-error");

// Application State

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
    } else if (!/^[A-Za-z\s'-]+$/.test(value)) {
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
    if (roleSelect.value === "") {
        setFieldError(roleSelect, roleError, "Veuillez sélectionner un rôle");
        return false;
    } else {
        clearFieldError(roleSelect, roleError);
        return true;
    }
}

function validateImg() {
    const value = imgInput.value.trim();
    if (value === "") {
        setFieldError(imgInput, imgError, "L'URL de la photo est requise");
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
    const value = imgInput.value.trim();
    if (value) {
        imgPreview.src = value;
    } else {
        clearImagePreview();
    }
}

function renderUnassignedEmployees(employee) {
    const employeediv = document.createElement("div");
    employeediv.classList.add("employee-div");
    unassignedList.appendChild(employeediv);

    const empProfile = document.createElement("img");
    empProfile.src = employee.img;
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
        hideModals();
        handleDeleteEmployee(employee, employeediv);
    });
    employeediv.appendChild(deleteBtn);
    employeediv.addEventListener('click', () => {
        employeeInfoModal.className = "add-container";
        renderEmployeeInfo(employee, employeeInfoDetailsDiv);
    });
}

function renderEmployeeInfo(employee, container) {
    container.innerHTML = "";

    const empArray = employee.experiences || [];
    employee.experiencesArray = empArray;

    container.classList.add("employee-info-content");

    const headerDiv = document.createElement("div");
    headerDiv.classList.add("employee-info-header");
    container.appendChild(headerDiv);

    const empProfileInfo = document.createElement("img");
    empProfileInfo.classList.add("employee-profile-info");
    empProfileInfo.alt = "Photo de profil";

    empProfileInfo.src = employee.img;

    headerDiv.appendChild(empProfileInfo);

    const personalInfoDiv = document.createElement("div");
    personalInfoDiv.classList.add("employee-personal-info");
    headerDiv.appendChild(personalInfoDiv);

    const nameEl = document.createElement("p");
    nameEl.textContent = "nom: " + employee.nom;
    personalInfoDiv.appendChild(nameEl);

    const roleEl = document.createElement("p");
    roleEl.textContent = "rôle: " + employee.role;
    personalInfoDiv.appendChild(roleEl);

    const emailEl = document.createElement("p");
    emailEl.textContent = `Email : ${employee.email}`;
    personalInfoDiv.appendChild(emailEl);

    const telEl = document.createElement("p");
    telEl.textContent = `Téléphone : ${employee.telephone}`;
    personalInfoDiv.appendChild(telEl);

    const experiencesDiv = document.createElement("div");
    experiencesDiv.classList.add("employee-experiences");
    container.appendChild(experiencesDiv);

    const expTitle = document.createElement("h3");
    expTitle.textContent = "Expériences";
    experiencesDiv.appendChild(expTitle);

    employee.experiencesArray.forEach(exp => {
        const expDiv = document.createElement("div");
        expDiv.classList.add("employee-experience");
        const h4 = document.createElement("h4");
        h4.textContent = exp.entreprise;
        expDiv.appendChild(h4);

        const posteP = document.createElement("p");
        posteP.textContent = `Poste : ${exp.poste}`;
        expDiv.appendChild(posteP);

        const periodeP = document.createElement("p");
        periodeP.textContent = `Période : ${exp.startDate} - ${exp.endDate}`;
        expDiv.appendChild(periodeP);

        experiencesDiv.appendChild(expDiv);

        console.log(exp);
    });
}


function addExperienceForm() {

    const newExperienceDiv = document.createElement("div");
    newExperienceDiv.classList = "experiences-div";

    const newEntreprise = document.createElement("input");
    newEntreprise.classList.add("input-experience", "entreprise");
    newEntreprise.placeholder = "Entreprise";

    const newPost = document.createElement("input");
    newPost.classList.add("input-experience", "poste");
    newPost.placeholder = "Poste";

    const newDureeStart = document.createElement("input");
    newDureeStart.type = "date";
    newDureeStart.classList.add("input-experience", "start-date");

    const newDureeEnd = document.createElement("input");
    newDureeEnd.type = "date";
    newDureeEnd.classList.add("input-experience", "end-date");

    newExperienceDiv.appendChild(newEntreprise);
    newExperienceDiv.appendChild(newPost);
    newExperienceDiv.appendChild(newDureeStart);
    newExperienceDiv.appendChild(newDureeEnd);
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
    if (!departmentArray) return;
    const max = parseInt(btn.getAttribute("data-max") || "0", 10);
    if (departmentArray.length >= max) return;
    employeeListContainer.className = "add-container";
    employeeArray.forEach(employee => {
        const access = (btn.getAttribute("data-accessibilite") || "").toLowerCase();
        if (employee.department === null && access.includes(employee.role.toLowerCase())) {
            const employeediv = document.createElement("div");
            employeediv.classList.add("employee-div");
            departmentEmployeeList.appendChild(employeediv);

            const empProfile = document.createElement("img");
            empProfile.src = employee.img;
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
                handleAssignEmployeeToDepartment(employee, employeediv, btn, departmentArray, max);
                hideModals();
            });
        }
    });
}

function renderDepartmentsArray(departmentArray, departmentList) {

    departmentArray.forEach(employee => {
        renderDepartments(employee, departmentList, departmentArray);
    });
}

function renderDepartments(employee, departmentList, departmentArray) {
    const employeediv = document.createElement("div");
    employeediv.classList.add("employee-div-in-department");
    departmentList.appendChild(employeediv);

    const empProfile = document.createElement("img");
    empProfile.src = employee.img;
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

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener('click', () => {
        hideModals();
        deleteEmployeeFromDepartment(employee, employeediv, departmentArray);
    });
    employeediv.appendChild(deleteBtn);

    employeediv.addEventListener('click', () => {
        employeeInfoModal.className = "add-container";
        renderEmployeeInfo(employee, employeeInfoDetailsDiv);
    });
}

function deleteEmployeeFromDepartment(employee, employeediv, departmentArray) {
    const department = employee.department;
    employee.department = null;
    const departmentContainer = document.getElementById(department);
    const departmentList = departmentContainer.querySelector(".employee-list-in-department");
    departmentList.removeChild(employeediv);
    const index = departmentArray.indexOf(employee);
    departmentArray.splice(index, 1);
    const employeeCounter = departmentContainer.querySelector(".department-count");
    const counter = departmentArray.length;
    employeeCounter.textContent = counter + " / " + employeeCounter.textContent.split(" / ")[1];
    console.log(employeeCounter.textContent);
    employeeArray.push(employee);
    renderUnassignedEmployeesArray(employeeArray);
}

function hideModals() {
    addContainer.className = "hidden";
    employeeListContainer.className = "hidden";
    employeeInfoModal.className = "hidden";
    clearImagePreview();
}

function handleDeleteEmployee(employee, employeediv) {
    unassignedList.removeChild(employeediv);
    const index = employeeArray.indexOf(employee);
    employeeArray.splice(index, 1);
    console.log(employeeArray);
}

function handleAssignEmployeeToDepartment(employee, employeediv, btn, departmentArray, max) {
    const department = btn.getAttribute("data-departement");
    employee.department = department;
    departmentEmployeeList.removeChild(employeediv);
    const index = employeeArray.indexOf(employee);
    employeeArray.splice(index, 1);

    const departementContainer = document.getElementById(department);
    const departmentList = departementContainer.querySelector(".employee-list-in-department");
    departmentList.innerHTML = "";
    const employeeCounter = departementContainer.querySelector(".department-count");
    const counter = departmentArray.length + 1;
    employeeCounter.textContent = counter + " / " + max;
    console.log(employeeCounter.textContent);
    departmentArray.push(employee);
    renderUnassignedEmployeesArray(employeeArray);
    renderDepartmentsArray(departmentArray, departmentList);
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

function handleExperienceInput(e) {
    const row = e.target.closest(".experiences-div");
    validateExperienceRow(row);
}

// Event Handler Functions

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
            const experience = {
                entreprise: entrepriseInput.value.trim(),
                poste: posteInput.value.trim(),
                startDate: startInput.value.trim(),
                endDate: endInput.value.trim()
            };
            experiencesArray.push(experience);
        }
    });

    const employee = {
        nom: nomInput.value.trim(),
        role: roleSelect.value,
        email: emailInput.value.trim(),
        telephone: telephoneInput.value.trim(),
        img: imgInput.value.trim(),
        experiences: experiencesArray,
        department: null
    };

    employeeArray.push(employee);
    renderUnassignedEmployeesArray(employeeArray);

    formulaire.reset();
    hideModals();
    console.log(employeeArray);
}

function renderUnassignedEmployeesArray(employeeArray) {
    unassignedList.innerHTML = "";
    employeeArray.forEach(employee => {
        renderUnassignedEmployees(employee);
    });
}

function handleModalOverlayClick() {
    hideModals();
}

function handleAddEmployeeToDepartment(btn) {
    showEmployeeListModal(btn);
}

function handleImageChange() {
    validateImg();
    updateImagePreview();
}

// Event Listeners

addBtn.addEventListener('click', showAddEmployeeModal);
addExperienceBtn.addEventListener('click', addExperienceForm);
formulaire.addEventListener('submit', handleFormSubmit);
experiencesDiv.addEventListener("input", handleExperienceInput);

modalOverlay.forEach(overlay => {
    overlay.addEventListener('click', handleModalOverlayClick);
});

addEmployeeToDepartmentBtns.forEach(btn => {
    btn.addEventListener('click', () => handleAddEmployeeToDepartment(btn));
});

nomInput.addEventListener("input", validateNom);
emailInput.addEventListener("input", validateEmail);
telephoneInput.addEventListener("input", validateTelephone);
roleSelect.addEventListener("change", validateRole);
imgInput.addEventListener("input", handleImageChange);