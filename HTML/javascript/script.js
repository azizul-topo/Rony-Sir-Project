const addUserBtn = document.getElementById("addUser");
const TaskName = document.getElementById("username");
const TaskDetails = document.getElementById("details");
const recordsDisplay = document.getElementById("recordsDisplay");
const record_size = document.getElementById("recordSize");
const Search = document.getElementById("search");
let totalRecordsToShow = parseInt(record_size.value);
const PreviousBtn = document.getElementById("prevbtn");
const NextBtn = document.getElementById("nextbtn");
let userArray = [];
let renderArray = userArray;

let Start = 0;
let end = totalRecordsToShow;

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
function NextBtnOnclick() {
  if (Start >= userArray.length || totalRecordsToShow >= userArray.length) {
    // If already at the end, show a warning message
    swal({
      title: "Sorry",
      text: "You are in the last Page!",
      icon: "warning",
      button: "Ok, I understand",
    });
    return;
  }
  Start = end; // Update the start index to the current end index

  end = Math.min(Start + totalRecordsToShow, userArray.length); // Calculate the new end index

  let slicedArray = userArray.slice(Start, end);
  renderArray = slicedArray;
  renderTasks();
}

function perviousBtnHandle() {
  if (Start === 0) {
    console.log(Start);
    swal({
      title: "Sorry",
      text: "You are in the first Page!",
      icon: "warning",
      button: "Ok, I understand",
    });
    return;
  }

  console.log(Start);

  end = Start; // Update the end index to the current start index
  Start = Math.max(0, Start - totalRecordsToShow); // Calculate the new start index

  // Adjust the end index if it exceeds the length of the array
  end = Math.min(Start + totalRecordsToShow, userArray.length);

  let slicedArray = userArray.slice(Start, end);
  renderArray = slicedArray;
  renderTasks();
}

// Function to save data to local storage
function SaveInfo(Array) {
  let str = JSON.stringify(Array);
  localStorage.setItem("users", str);
}

function deleteTask(index) {
  swal({
    title: "Are you sure to delete?",
    text: "Once deleted, you will not be able to revert this!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      userArray.splice(index, 1); // Remove the task from the userArray
      saveAndRender(); // Save changes to local storage and update display
      // Update renderArray after deletion
      renderArray = userArray.slice(Start, end);
      renderTasks();
      swal("Your file is deleted Successfully", {
        icon: "success",
      });
    }
  });
}

function editTask(index) {
  let newName;
  let newDetail;

  swal({
    title: "Are you sure to Edit this Task?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Enter the new Task Name here:", {
        content: "input",
      }).then((value) => {
        if (value == "") {
          swal({
            title: "Sorry",
            text: "Please Complete the form",
            icon: "error",
            button: "Ok, I understand",
          });
          return;
        }
        newName = value;
        swal("Enter the new Task Detail here:", {
          content: "input",
        }).then((inputValue) => {
          if (inputValue == "") {
            swal({
              title: "Sorry",
              text: "Please Complete the form",
              icon: "error",
              button: "Ok, I understand",
            });
            return;
          }
          newDetail = inputValue;
          console.log("Name: ", newName, "detail : ", newDetail);
          userArray[index].name = newName;
      userArray[index].detail = newDetail;



      saveAndRender();
  renderArray = userArray.slice(Start, end); // Update renderArray
  renderTasks();
  swal({
    title: "Congratulation!!",
    text: "Successfully Edited the task",
    icon: "success",
    button: "Ok, thats nice",
  });
        });
      });
    }
  });

  
}

// Function to render tasks
function renderTasks() {
  if (renderArray.length > 0) {
    let showingHtml = [];
    for (let index = 0; index < renderArray.length; index++) {
      const task = renderArray[index];
      const currentIndex = Start + index + 1;
      showingHtml.push(`
            <div class=" items-center grid grid-cols-6">
                <div class="bg-white collapse col-span-5 bg-base-200 my-1">
                    <input type="checkbox" />
                    <div class="collapse-title text-xl grid grid-cols-5 font-medium">
                        <p class="text-center">${currentIndex}</p>
                        <p id="taskNameId" class="text-center col-span-4">${task.name}</p>
                        
                    </div>
                    <div class="collapse-content">
                        <p id="detailscontainer" class="text-center">${task.detail}</p>
                    </div>
                    
                </div><div class=" justify-center flex gap-2">
                <div id="edit" class="text-center bg-white px-3 py-4 rounded-md   cursor-pointer">✏️</div><div class="text-center px-3 bg-white  py-4 rounded-md  deleteAction cursor-pointer">❌</div></div></div>
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

    const editActions = document.querySelectorAll("#edit");
    editActions.forEach((editAction, index) => {
      editAction.addEventListener("click", () => {
        editTask(index);
      });
    });
  } else {
    recordsDisplay.innerHTML = "";
  }
}

function searchAndRender() {
  const filter = userArray.filter((task) =>
    task.name.toLowerCase().includes(Search.value)
  );
  renderArray = filter;
  renderArray = filter.slice(Start, end);
  renderTasks();
}

// Load data from local storage when the page loads
window.addEventListener("load", () => {
  loadDataFromLocalStorage();
  totalRecordsToShow = parseInt(record_size.value);
  renderArray = userArray.slice(0, totalRecordsToShow);
  renderTasks();
});

// Add event listener to the add user button
addUserBtn.addEventListener("click", () => {
  const name = TaskName.value;

  const details = TaskDetails.value;
  if (name == "" || details == "") {
    swal({
      title: "Sorry",
      text: "Please Complete the form",
      icon: "error",
      button: "Ok, I understand",
    });
    return;
  }
  userArray.push({
    name: name,
    detail: details,
  });
  saveAndRender();
  renderArray = userArray.slice(Start, end);
  renderTasks();
  TaskDetails.value = "";
  TaskName.value = "";
  swal({
    title: "Congratulation!!",
    text: "Successfully Added the task",
    icon: "success",
    button: "Ok, thats nice",
  });
});

// Add event listener to the record size selector
record_size.addEventListener("change", function () {
  totalRecordsToShow = parseInt(record_size.value);
  Start = 0; // Reset Start index to 0
  end = totalRecordsToShow; // Reset end index
  renderArray = userArray.slice(Start, end); // Update renderArray
  renderTasks();
});

Search.addEventListener("input", searchAndRender);
NextBtn.addEventListener("click", NextBtnOnclick);
PreviousBtn.addEventListener("click", perviousBtnHandle);
