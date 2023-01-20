const getAllPeople = async () => {
    const data = await fetch(PEOPLE_ENDPOINT, {
        method: "GET"
    }).then(
        resp => resp.json()
    )

    return data;
}

const renderAllPeople = async () => {    
    var container = document.getElementById("list-people");
    
    let data = await getAllPeople();    
    let html = data.map((person) => `<p style='margin:1px; position: relative'>${person.name} 
    <span style='text-decoration: underline; position: absolute; right: 0px; cursor: pointer' onclick="deletePerson('${person.id}')">delete</span>
    </p>`);
    container.innerHTML = html.join("");
}

const addPerson = async () => {
    var newPerson = document.getElementById("iPerson").value;
    const slug = newPerson.slice(0,3).toLowerCase();

    await fetch(PEOPLE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            id: slug,
            name: newPerson,
        })
    })

    renderAllPeople()
    document.getElementById("iPerson").value = "";
}


const deletePerson = async (id) => {
    await fetch(PEOPLE_ENDPOINT + `/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json"},        
    })
    renderAllPeople()
    document.getElementById("iPerson").value = "";
}
