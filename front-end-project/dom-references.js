const addPersonInputID = "iPerson";
const addPersonInputElement = document.getElementById(addPersonInputID);

const dropdownPeopleSelectID = "sPerson";
const dropdownPeopleSelectElement = document.getElementById(dropdownPeopleSelectID);

const dropdownTaskStatusSelectID = "sTaskStatus";
const dropdownTaskStatusSelectElement = document.getElementById(dropdownTaskStatusSelectID);

const listAllPeopleInsertionID = "list-people-insertion";
const listAllPeopleInsertionElement = document.getElementById(listAllPeopleInsertionID);

const listAllTasksSectionID = "tasks-list";
const listAllTasksSectionElement = document.getElementById(listAllTasksSectionID);

const descriptionInputID = "iDescription";
const descriptionInputElement = document.getElementById(descriptionInputID);

const buttonID = "add-btn";
const buttonElement = document.getElementById(buttonID);

const filterDropdownID = "filter-tasks";
const filterDropdownElement = document.getElementById(filterDropdownID);

const clearFilterID = "clear-filter-tasks";
const clearFilterElement = document.getElementById(clearFilterID);


const clearAddPersonInputElement = () => {
    addPersonInputElement.value = "";    
}

const renderAllPeopleList = (data) => {    
    let html = data.map((person) => `<p style='margin:1px; position: relative'>
        ${person.name} 
        <span style='text-decoration: underline; position: absolute; 
        right: 0px; cursor: pointer' 
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

const renderDropdownTaskStatus = (data) => {
    let html = data.map((taskStatus) => `<option value='${taskStatus.id}'>${taskStatus.name}</option>`)
    dropdownTaskStatusSelectElement.innerHTML = `<option disabled selected value>-- choose --</option>${html}`;
}


const renderAllTasks = (tasks, people, taskStatus) => {
    if (tasks === null) return;

    let html = tasks.map((task) => {
        let person = people.find(x => x?.id === task?.people_id);
        let taskStatusRelated = taskStatus.find(x => x?.id === task?.status_id);
        let statusColor = taskStatusRelated?.id === 1 ? "#0f0" : 
        taskStatusRelated?.id === 2 ? "#f00" :
        taskStatusRelated?.id === 3 ? "#00f" :
        taskStatusRelated?.id === 4 ? "#000" : "#f60";

        return `<div style="width: 250px; border: 3px solid ${statusColor}; margin: 15px; padding: 5px; border-radius: 10px; position: relative">
            <h3 style='color: ${statusColor}'>${taskStatusRelated?.name}</h3>
            <p><b style="text-decoration: underline">${person?.name}</b>: ${task?.description}</p>

            <span style='position:absolute; top: 0px; right: 5px; color: red; cursor: pointer'
                onclick='deleteTask("${task?.id}")'
            >
            X
            </span>

            <span style='position:absolute; top: 0px; right: 30px; color: red; cursor: pointer'
                onclick='renderUpdateTaskValues("${task?.people_id}", ${task?.status_id}, "${task?.description}", "${task?.id}")'
            >
            edit
            </span>
        </div>`
    })

    listAllTasksSectionElement.innerHTML = html.join("");
}

const renderUpdateTaskValues = (person_id, task_status_id, description, task_id) => {    
    dropdownPeopleSelectElement.value = person_id;
    dropdownTaskStatusSelectElement.value = task_status_id;
    descriptionInputElement.value = description;
    localStorage.setItem("updated_task_id", task_id);
    buttonElement.textContent = "Update Task";
    buttonElement.onclick = () => updateTask(task_id);
    
}

const resetForm = () => {
    descriptionInputElement.value = "";
    dropdownTaskStatusSelectElement.value = "";
    dropdownPeopleSelectElement.value = "";
    localStorage.clear();
    buttonElement.textContent = "Add Task"
    buttonElement.onclick = () => addTask();
    
}


const resetFilter = () => {
    filterDropdownElement.value = "";
}
