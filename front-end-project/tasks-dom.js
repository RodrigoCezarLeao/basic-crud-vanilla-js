//------------------------
// DOM ELEMENTS
//------------------------
const descriptionInputID = "iDescription";
const descriptionInputElement = document.getElementById(descriptionInputID);

const buttonID = "add-btn";
const buttonElement = document.getElementById(buttonID);

const filterDropdownID = "filter-tasks";
const filterDropdownElement = document.getElementById(filterDropdownID);

const clearFilterID = "clear-filter-tasks";
const clearFilterElement = document.getElementById(clearFilterID);

const listAllTasksSectionID = "tasks-list";
const listAllTasksSectionElement = document.getElementById(listAllTasksSectionID);



//------------------------
// RENDERS
//------------------------
const renderAllTasks = (tasks, people, taskStatus) => {
    if (tasks === null) return;

    let html = tasks.map((task) => {
        let person = people.find(x => x?.id === task?.person_id);
        let taskStatusRelated = taskStatus.find(x => x?.id === task?.status_id);
        let statusColor = taskStatusRelated?.id === 1 ? "#0f0" : 
        taskStatusRelated?.id === 2 ? "#f00" :
        taskStatusRelated?.id === 3 ? "#00f" :
        taskStatusRelated?.id === 4 ? "#000" : "#f60";

        return `<div style="width: 250px; 
                            border: 3px solid ${statusColor}; 
                            margin: 15px; 
                            padding: 5px; 
                            border-radius: 10px; 
                            position: relative"
                >
                    <h3 style='color: ${statusColor}'>${taskStatusRelated?.name}</h3>
                    <p><b style="text-decoration: underline">${person?.name}</b>: ${task?.description}</p>

                    <span style='position:absolute; top: 0px; right: 5px; color: red; cursor: pointer'
                        onclick='deleteTaskAndRerender("${task?.id}")'
                    >
                    X
                    </span>

                    <span style='position:absolute; top: 0px; right: 30px; color: red; cursor: pointer'
                        onclick='renderUpdateTaskValues("${task?.person_id}", ${task?.status_id}, "${task?.description}", "${task?.id}")'
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

const renderFilterPersonTasks = () => {    
    const id = filterDropdownElement.value;

    if (id === "") return;

    var personTasksPromise = getPersonTasks(id);
    var peoplePromise = getAllPeoplePromise();
    var taskStatusPromise = getTasksStatusPromise()

    Promise.all([personTasksPromise, peoplePromise, taskStatusPromise])
        .then(([tasks, people, taskStatus]) => {            
            renderAllTasks(tasks, people, taskStatus)
        })
}

//------------------------
// ACTIONS
//------------------------
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

const insertTaskWithEnterKey = () => {
    descriptionInputElement.addEventListener("keypress", (event) => {
        if (event.key === "Enter")
        {
            if (buttonElement.textContent.toLowerCase().includes("add"))
                addTask();
            else
                updateTask(localStorage.getItem("updated_task_id"));
        }
    })
}

const getMixedTasksAndPeoplePromise = () => {
    var tasksPromise = getAllTasksPromise();
    var peoplePromise = getAllPeoplePromise();
    var taskStatusPromise = getTasksStatusPromise()
    
    Promise.all([tasksPromise, peoplePromise, taskStatusPromise])
        .then(([tasks, people, taskStatus]) => {            
            renderAllTasks(tasks, people, taskStatus)
        })
}

const deleteTaskAndRerender = (task_id) => {
    deleteTask(task_id).then(x => getMixedTasksAndPeoplePromise());
}

//------------------------
// INITIALIZERS
//------------------------
getMixedTasksAndPeoplePromise();
insertTaskWithEnterKey();
clearFilterElement.onclick = () => { 
    resetFilter();
    getMixedTasksAndPeoplePromise(); 
}

