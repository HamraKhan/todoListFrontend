 //add to do list item in the local storage
 function addTodoListItem (activityTitle) {
    //create an item object with the following data properties {title: itemTitle, checked: true, status: "ACTIVE"}
    const activity = new Activity(activityTitle, false, 'ACTIVE');
    
    
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
    if(!Array.isArray(updatedTodoList)) {
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
         if(activity.title === undefined) {
             createListElementV1(activity)
         }else {
             createListElementV2(activity)
         }
     }
 }

 function clearListElements(){
     //get the html element by mytodolist id
     var myTodoList = document.getElementById('myTodoList');
     //empty the inner html
     myTodoList.innerHTML = '';
 }

 //function to create the ui element for the todolist item title
 function createListElementV2(activity) {
     var myTodoList = document.getElementById("myTodoList");
         
         var listItem = document.createElement("li");
         listItem.setAttribute('id', `li_${activity.title}`);
         listItem.setAttribute('class', `todo-item ${activity.checked}`);
         
         var divItem = document.createElement("div");
         divItem.setAttribute('id', `div_${activity.title}`);

         var inputItem = document.createElement("input");
         inputItem.setAttribute('id', `input_${activity.title}`);
         inputItem.setAttribute('type', `checkbox`);
         inputItem.setAttribute('name', `input_name_${activity.title}`);
         inputItem.setAttribute('value', activity.title);
         inputItem.setAttribute('onclick', `toggleActivity("${activity.title}")`)
         inputItem.checked = activity.checked;

         var labelItem = document.createElement("label");
         labelItem.setAttribute('for', `input_name_${activity.title}`);
         labelItem.setAttribute('value', activity.title);
         labelItem.innerHTML = activity.title;

         var buttonItem = document.createElement("button");
         buttonItem.setAttribute('type', `input_name_${activity.title}`);
         buttonItem.setAttribute('class', `deletebtn`);

         buttonItem.innerHTML = 'Delete';
         
         divItem.appendChild(inputItem);
         divItem.appendChild(labelItem);
         divItem.appendChild(buttonItem);

         listItem.appendChild(divItem);
         
         myTodoList.appendChild(listItem);
 }

 function createListElementV1(activityTitle) {
     var myTodoList = document.getElementById("myTodoList");
         
         var listItem = document.createElement("li");
         listItem.setAttribute('id', `li_${activityTitle}`);
         
         var divItem = document.createElement("div");
         divItem.setAttribute('id', `div_${activityTitle}`);

         var inputItem = document.createElement("input");
         inputItem.setAttribute('id', `input_${activityTitle}`);
         inputItem.setAttribute('type', `checkbox`);
         inputItem.setAttribute('name', `input_name_${activityTitle}`);
         inputItem.setAttribute('value', activityTitle);
         inputItem.setAttribute('onclick', `toggleActivity("${activityTitle}")`)

         var labelItem = document.createElement("label");
         labelItem.setAttribute('for', `input_name_${activityTitle}`);
         labelItem.setAttribute('value', activityTitle);
         labelItem.innerHTML = activityTitle;

         var buttonItem = document.createElement("button");
         buttonItem.setAttribute('type', `input_name_${activityTitle}`);
         buttonItem.innerHTML = 'Delete';
         
         divItem.appendChild(inputItem);
         divItem.appendChild(labelItem);
         divItem.appendChild(buttonItem);

         listItem.appendChild(divItem);
         
         myTodoList.appendChild(listItem);
 }
 

 function toggleActivity(activityTitle) {
     //get the todolist from database/local storage
     const todoList = getTodoListFromLocalStorage()
     
     
     //find the matching activity from the todolist
     var matchingActivityIndex = todoList.findIndex(activity => {
         if(activity.title === undefined && activity === activityTitle) return true;
         if(activity.title === activityTitle) return true;
     });
     

     //check if the version of the activity data is the old or new version
     if(todoList[matchingActivityIndex].title  === undefined) {
         //convert the old data model to the new data model which consists of the 'checked' status
         const newModeledActivity = convertOldDataModel(todoList[matchingActivityIndex]);

         todoList[matchingActivityIndex] = newModeledActivity;

     }
     
     //toggle the 'checked' property of the activity object 
     todoList[matchingActivityIndex].checked = !todoList[matchingActivityIndex].checked;

     //store the new list in the local storage
     storeTodoListInLocalStorage(todoList)
     
 }
 function convertOldDataModel(activityTitle){
     //create an item object with the following data properties {title: itemTitle, checked: true, status: "ACTIVE"}
     const activity = new Activity(activityTitle, false, 'ACTIVE');
     return activity;
 }