//------------------------
// FETCHES
//------------------------
const getTasksStatusPromise = () => {
    return fetch(TASK_STATUS_ENDPOINT, {
        method: "GET"
    }).then(resp => resp.json())    
}