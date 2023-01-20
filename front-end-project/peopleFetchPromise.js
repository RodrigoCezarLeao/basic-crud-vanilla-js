const addPersonPromise = () => {
    var newPerson = document.getElementById("iPerson").value;
    const slug = newPerson.slice(0,3).toLowerCase();

    fetch(PEOPLE_ENDPOINT, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id: slug,
            name: newPerson,
        })
    })
    .then(resp => getAllPeoplePromise())
    document.getElementById("iPerson").value = "";
}

const deletePersonPromise = (id) => {
    fetch(PEOPLE_ENDPOINT + `/${id}`, {
        method: "DELETE",        
    }).then(resp => getAllPeoplePromise())
}

const getAllPeoplePromise = () => {
    const promise = fetch(PEOPLE_ENDPOINT, {
        method: "GET"
    }).then(
        resp => resp.json()
    ).then(data => updateAllPeopleData(data))
}


const updateAllPeopleData = (data) => {
    var container = document.getElementById("list-people");
    let html = data.map((person) => `<p style='margin:1px; position: relative'>${person.name} 
    <span style='text-decoration: underline; position: absolute; right: 0px; cursor: pointer' onclick="deletePersonPromise('${person.id}')">delete</span>
    </p>`);
    container.innerHTML = html.join("");
}



getAllPeoplePromise();

document.getElementById("iPerson").addEventListener("keypress", (event) => {
    if (event.key === "Enter")
        addPersonPromise()
})


