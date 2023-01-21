const getAllTasksPromise = () => {
    return fetch(TASKS_ENDPOINT, {method: "GET"})
        .then(resp => resp.json())        
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

const addTask = () => {
    let person = dropdownPeopleSelectElement.value;
    let taskStatus = Number(dropdownTaskStatusSelectElement.value);
    let description = descriptionInputElement.value;

    fetch(TASKS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: create_UUID(),
            people_id: person,
            description: description,
            status_id: taskStatus
        })
    }).then(resp => getMixedTasksAndPeoplePromise())

    resetForm();
}


const deleteTask = (id) => {
    fetch(TASKS_ENDPOINT + `/${id}`, {
        method: "DELETE"
    }).then(resp => getMixedTasksAndPeoplePromise())
}

const deleteTaskAsync = (id) => {
    fetch(TASKS_ENDPOINT + `/${id}`, {
        method: "DELETE"
    })
}

const updateTask = (id) => {
    let person = dropdownPeopleSelectElement.value;
    let taskStatus = Number(dropdownTaskStatusSelectElement.value);
    let description = descriptionInputElement.value;

    fetch(TASKS_ENDPOINT + `/${id}`, {
        method: "PUT", //PATCH OR PUT
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({            
            id: id,
            people_id: person,
            description: description,
            status_id: taskStatus
        })
    }).then(resp => getMixedTasksAndPeoplePromise())

    resetForm();
}

const getPersonTasks = (id) => {
    return fetch(TASKS_ENDPOINT, { method: "GET" })
        .then(resp => resp.json())
        .then(data => data.filter(x => x.people_id === id))
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

const deletePersonTasks = (person_id) => {
    getPersonTasks(person_id)
        .then(data => {
            for(let d of data)
                deleteTaskAsync(d.id);
        }).then(x => getMixedTasksAndPeoplePromise());
}

const insertTaskWithEnterKey = () => {
    descriptionInputElement.addEventListener("keypress", (event) => {
        if (event.key === "Enter")
            if (buttonElement.textContent.toLowerCase().includes("add"))
                addTask()
            else
                updateTask(localStorage.getItem("updated_task_id"))
    })
}

getMixedTasksAndPeoplePromise();
insertTaskWithEnterKey();
clearFilterElement.onclick = () => { 
    resetFilter();
    getMixedTasksAndPeoplePromise(); 
}