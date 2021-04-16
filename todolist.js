//add to do list item in the local storage
function addTodoListItem(activityTitle) {
    //create an item object with the following data properties {title: itemTitle, checked: true, status: "ACTIVE"}
    const activity = new TodoActivity(activityTitle, false, 'ACTIVE', Date.now());


    //get the local storage to do list
    const todoList = getTodoListFromLocalStorage()

    //update to do list with new item and assign it to the updatedTodoList constant variable
    const updatedTodoList = updateTodoListWithNewItem(todoList, activity)

    //store the updated to do list in the local storage
    storeTodoListInLocalStorage(updatedTodoList)

    //display the new item in the UI
    displayTodoList(updatedTodoList)
}

function updateTodoListWithNewItem(todoList, activity) {
    //check if the todoList variable is an array type variable and assign the array type variable to updatedTodoList
    let updatedTodoList = validateTodoListVariable(todoList)

    //add the item title to the updatedTodoList array
    updatedTodoList.push(activity);

    // return the updated to do list back to where the function was called from
    return updatedTodoList;
}


function storeTodoListInLocalStorage(updatedTodoList) {

    //check if the updatedTodoList variable is an array type variable and assign the array type variable to validatedTodoList
    const validatedTodoList = validateTodoListVariable(updatedTodoList)

    //convert te to do list array into a json string    
    const jsonTodoList = JSON.stringify(validatedTodoList);

    //stor the to do list array into local storage
    localStorage.setItem('toDoList', jsonTodoList)

}


function validateTodoListVariable(todoList) {
    let updatedTodoList = todoList;
    //check if the updatedTodoList variable is an array type variable and if it is not, then execute the if condition body
    if (!Array.isArray(updatedTodoList)) {
        //assigning an empty array to the updatedTodoList variable
        updatedTodoList = [];
    }
    return updatedTodoList
}


//get to do list from local storage
const todoList = getTodoListFromLocalStorage()

//display the item on the UI
displayTodoList(todoList)



//function to get the to do list from the local storage
function getTodoListFromLocalStorage() {
    const todoListJsonString = localStorage.getItem('toDoList');
    return JSON.parse(todoListJsonString);
}

//function to loop through the todo list and display the items
function displayTodoList(todoList) {
    //clear the html list elements
    clearListElements()
    //go through the to do list items
    for (var itemIndex in todoList) {
        //create a new to-do list element in the ui
        const activity = todoList[itemIndex];

        //check if the version of the activity data is the old or new version
        createListElement(activity)
    }
}

function clearListElements() {
    //get the html element by mytodolist id
    var myTodoList = document.getElementById('myTodoList');
    //empty the inner html
    myTodoList.innerHTML = '';
}

//function to create the ui element for the todolist item title
function createListElement(activity) {
    var myTodoList = document.getElementById("myTodoList");

    var listItem = document.createElement("li");
    listItem.setAttribute('id', `li_${activity.title}`);
    listItem.setAttribute('class', `todo-item ${activity.checked}`);
    listItem.innerHTML = ` <li class="collection-item avatar yellow lighten-2">          
            <label>
                <input type="checkbox" id="test6" checked="${activity.checked}" onclick="toggleActivity("${activity.title}")"  />
                <span class="title">${activity.title}</span> <br />
                <span class="sub-title">${formatToDoDate(activity.todoDate)}</span>
            </label>
            <button type="submit"
                class="secondary-content btn-floating btn-small waves-effect waves-light red delete-btn">
                <i class="material-icons">delete</i>
            </button>
        </li>`

    myTodoList.appendChild(listItem);
}

function formatToDoDate(todoDate) {
    let unixTimestamp = todoDate
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(todoDate);

    // day part from the timestamp
    var day = date.getDay();

    // month part from the timestamp
    var month = date.getMonth();
    
    // year part from the timestamp
    var year = date.getFullYear();

    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = day + "/" + month + "/" + year + " " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime
}

function toggleActivity(activityTitle) {
    //get the todolist from database/local storage
    const todoList = getTodoListFromLocalStorage()


    //find the matching activity from the todolist
    var matchingActivityIndex = todoList.findIndex(activity => {
        if (activity.title === activityTitle) return true;
    });

    //toggle the 'checked' property of the activity object 
    todoList[matchingActivityIndex].checked = !todoList[matchingActivityIndex].checked;

    //store the new list in the local storage
    storeTodoListInLocalStorage(todoList)

}