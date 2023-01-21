//------------------------
// DOM ELEMENTS
//------------------------
const dropdownTaskStatusSelectID = "sTaskStatus";
const dropdownTaskStatusSelectElement = document.getElementById(dropdownTaskStatusSelectID);


//------------------------
// RENDERS
//------------------------
const renderDropdownTaskStatus = () => {
    getTasksStatusPromise()
        .then(data => {
            let html = data.map((taskStatus) => `<option value='${taskStatus.id}'>${taskStatus.name}</option>`)
            dropdownTaskStatusSelectElement.innerHTML = `<option disabled selected value>-- choose --</option>${html}`;
        });
}


//------------------------
// ACTIONS
//------------------------


//------------------------
// INITIALIZERS
//------------------------
renderDropdownTaskStatus();