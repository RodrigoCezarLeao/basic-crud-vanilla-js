//------------------------
// FETCHES
//------------------------
const getAllTasksPromise = () => {
    return fetch(TASKS_ENDPOINT, {method: "GET"})
        .then(resp => resp.json())        
}

const getPersonTasks = (id) => {
    return fetch(TASKS_ENDPOINT, { method: "GET" })
        .then(resp => resp.json())
        .then(data => data.filter(x => x.person_id === id))
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
            person_id: person,
            description: description,
            status_id: taskStatus
        })
    }).then(resp => getMixedTasksAndPeoplePromise())

    resetForm();
    resetFilter();
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
            person_id: person,
            description: description,
            status_id: taskStatus
        })
    }).then(resp => getMixedTasksAndPeoplePromise())

    resetForm();
}


const deleteTask = (id) => {
    return fetch(TASKS_ENDPOINT + `/${id}`, {
        method: "DELETE"
    })
}