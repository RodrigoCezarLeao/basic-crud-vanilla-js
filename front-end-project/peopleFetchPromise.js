const addPersonPromise = () => {
    let newPerson = addPersonInputElement.value;
    if (newPerson === "")
    {
        alert("Person field is empty!")
        return;
    }
    
    fetch(PEOPLE_ENDPOINT, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id: create_UUID(),
            name: newPerson,
            slug: newPerson.slice(0,3).toLowerCase(),
        })
    })
    .then(resp => updateAllPeopleRenders())

    clearAddPersonInputElement();
}

const getAllPeoplePromise = () => {
    return fetch(PEOPLE_ENDPOINT, {
        method: "GET"
    }).then(
        resp => resp.json()
    )
}

const updateAllPeopleRenders = () => {
    getAllPeoplePromise()
        .then(data => {
            renderAllPeopleList(data);
            renderDropdownOptionsPeopleList(data);
        })
}

const deletePersonPromise = (id) => {
    getAllTasksPromise().then(data => { 
        let personTasks = data.filter(x => x.people_id === id);
        if (personTasks.length === 0)
            fetch(PEOPLE_ENDPOINT + `/${id}`, {
                method: "DELETE",        
            }).then(resp => updateAllPeopleRenders())
        else {
            if (confirm(`There are some tasks for this person. Want to delete all?`))
            {
                deletePersonTasks(id);
                fetch(PEOPLE_ENDPOINT + `/${id}`, {
                    method: "DELETE",        
                }).then(resp => updateAllPeopleRenders());
            }
        }
    });

    
}

const insertPeopleWithEnterKey = () => {
    addPersonInputElement.addEventListener("keypress", (event) => {
        if (event.key === "Enter")
            addPersonPromise()
    })
}


updateAllPeopleRenders();
insertPeopleWithEnterKey();




