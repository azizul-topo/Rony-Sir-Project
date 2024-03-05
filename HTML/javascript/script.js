const addUserBtn = document.getElementById("addUser");
const TaskName = document.getElementById("username");
const TaskDetails = document.getElementById("details");
const recordsDisplay = document.getElementById("recordsDisplay");
const record_size = document.getElementById("recordSize");
const Search = document.getElementById("search");
let totalRecordsToShow = parseInt(record_size.value);
let userArray = [];
let renderArray = userArray;

// Function to load data from local storage
function loadDataFromLocalStorage() {
  const objStr = localStorage.getItem("users");
  if (objStr != null) {
    userArray = JSON.parse(objStr);
    renderArray = userArray;
  }
}

// Function to save data to local storage and update the display
function saveAndRender() {
  SaveInfo(userArray);
  renderArray = userArray;
  renderTasks();
}

// Function to save data to local storage
function SaveInfo(Array) {
  let str = JSON.stringify(Array);
  localStorage.setItem("users", str);
}

function deleteTask(index) {
  userArray.splice(index, 1); // Remove the task from the userArray
  saveAndRender(); // Save changes to local storage and update display
}

// Function to render tasks
function renderTasks() {
  if (renderArray.length > 0) {
    let showingHtml = [];
    for (let index = 0; index < renderArray.length; index++) {
      const task = renderArray[index];
      showingHtml.push(`
            <div class=" items-center grid grid-cols-6">
                <div class="collapse col-span-5 bg-base-200 my-1">
                    <input type="checkbox" />
                    <div class="collapse-title text-xl grid grid-cols-5 font-medium">
                        <p class="text-center">${index + 1}</p>
                        <p id="taskNameId" class="text-center col-span-4">${
                          task.name
                        }</p>
                        
                    </div>
                    <div class="collapse-content">
                        <p id="detailscontainer" class="text-center">${
                          task.detail
                        }</p>
                    </div>
                    
                </div><div class="text-center bg-white mx-2 py-4 rounded-md  deleteAction cursor-pointer">❌</div></div>
            `);
    }
    recordsDisplay.innerHTML = showingHtml.join("");

    // Add event listeners to delete action divs
    const deleteActions = document.querySelectorAll(".deleteAction");
    deleteActions.forEach((deleteAction, index) => {
      deleteAction.addEventListener("click", () => {
        deleteTask(index);
      });
    });
  } else {
    recordsDisplay.innerHTML = "";
  }
}

function searchAndRender(){
 const filter=   userArray.filter((task)=>task.name.toLowerCase().includes(Search.value))
 console.log(filter)
 renderArray=filter
 renderTasks()
 console.log(Search.value)
}

// Load data from local storage when the page loads
window.addEventListener("load", () => {
  loadDataFromLocalStorage();
  renderTasks();
});

// Add event listener to the add user button
addUserBtn.addEventListener("click", () => {
  const name = TaskName.value;
  const details = TaskDetails.value;
  userArray.push({
    name: name,
    detail: details,
  });
  saveAndRender();
  TaskDetails.value = "";
  TaskName.value = "";
});

// Add event listener to the record size selector
record_size.addEventListener("change", function () {
  totalRecordsToShow = parseInt(record_size.value);
  renderArray=userArray.slice(0,totalRecordsToShow)

  renderTasks()
  console.log("Selected option value:", totalRecordsToShow);
});

Search.addEventListener("input", searchAndRender);
