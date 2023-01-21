//------------------------
// FETCHES
//------------------------
const getAllPeoplePromise = () => {
    return fetch(PERSON_ENDPOINT, {
        method: "GET"
    }).then(
        resp => resp.json()
    )
}

const addPersonPromise = () => {
    let newPerson = addPersonInputElement.value;
    if (newPerson === "")
    {
        alert("Person field is empty!");
        return;
    }
    
    fetch(PERSON_ENDPOINT, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id: create_UUID(),
            name: newPerson,
            slug: newPerson.slice(0,3).toLowerCase(),
        })
    })
    .then(resp => {
        updatePeopleReferecesRenders();
        clearAddPersonForm();
    })
}

const deletePersonPromise = (person_id) => {    
    getAllTasksPromise().then(data => { 
        let personTasks = data.filter(x => x.person_id === person_id);
        if (personTasks.length === 0)
            fetch(PERSON_ENDPOINT + `/${person_id}`, {
                method: "DELETE",        
            }).then(resp => updatePeopleReferecesRenders())
        else {            
            if (confirm(`There are some tasks for this person. Want to delete all?`))
            {
                let deletePromises = [];

                for (let d of personTasks)
                {
                    deletePromises.push(fetch(TASKS_ENDPOINT + `/${d.id}`, {
                                method: "DELETE"
                            }).then(resp => resp.json()))
                }
                        
                Promise.all([...deletePromises]).then(result => {                    
                    fetch(PERSON_ENDPOINT + `/${person_id}`, {
                        method: "DELETE",        
                    }).then(resp => {
                        updatePeopleReferecesRenders();
                        getMixedTasksAndPeoplePromise();
                    });
                })
            }
        }
    })
}




