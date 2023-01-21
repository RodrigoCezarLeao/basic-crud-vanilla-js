//------------------------
// DOM ELEMENTS
//------------------------
const addPersonInputID = "iPerson";
const addPersonInputElement = document.getElementById(addPersonInputID);

const listAllPeopleInsertionID = "list-people-insertion";
const listAllPeopleInsertionElement = document.getElementById(listAllPeopleInsertionID);

const dropdownPeopleSelectID = "sPerson";
const dropdownPeopleSelectElement = document.getElementById(dropdownPeopleSelectID);

//------------------------
// RENDERS
//------------------------
const renderAllPeopleList = (data) => {    
    let html = data.map((person) => `<p style='
            margin:1px; 
            position: relative'
        >
            ${person.name} 
        
            <span style='
                text-decoration: underline; 
                position: absolute; 
                right: 0px; 
                cursor: pointer' 
        
            onclick="deletePersonPromise('${person.id}')">
                delete
            </span>
        </p>`);

    listAllPeopleInsertionElement.innerHTML = html.join("");
}

const renderDropdownOptionsPeopleList = (data) => {    
    let html = data.map((person) => `<option value='${person?.id}'>${person?.name}</option>`);
    dropdownPeopleSelectElement.innerHTML = `<option disabled selected value>-- choose --</option>${html}`;
    filterDropdownElement.innerHTML = `<option disabled selected value>-- choose --</option>${html}`;
}

//------------------------
// ACTIONS
//------------------------
const clearAddPersonForm = () => {
    addPersonInputElement.value = "";
}

const updatePeopleReferecesRenders = () => {
    getAllPeoplePromise()
        .then(data => {
            renderAllPeopleList(data);
            renderDropdownOptionsPeopleList(data);
        })
}

const insertPeopleWithEnterKey = () => {
    addPersonInputElement.addEventListener("keypress", (event) => {
        if (event.key === "Enter")
            addPersonPromise()
    })
}

//------------------------
// INITIALIZERS
//------------------------
updatePeopleReferecesRenders();
insertPeopleWithEnterKey();