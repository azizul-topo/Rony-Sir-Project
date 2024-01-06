const addUserBtn = document.getElementById('addUser');
const btnText = addUserBtn.innerText;
const usernameTextField = document.getElementById('username');
const recordsDisplay = document.getElementById('records');
const record_size = document.getElementById('records_size');
let userArray = [];
let edit_id = null;

let objStr = localStorage.getItem('users');

if (objStr != null) {
   userArray = JSON.parse(objStr);
}

DisplayInfo();
addUserBtn.onclick = () => {
   //get user's name from text field
   const name = usernameTextField.value;
   if (edit_id != null) {
      //edit action
      userArray.splice(edit_id, 1, {
         'name': name
      });
      edit_id = null;
   } else {
      //insert action
      userArray.push({
         'name': name
      });
   }

   SaveInfo(userArray);
   usernameTextField.value = '';
   addUserBtn.innerText = btnText;
}

// store user's name in local storage
function SaveInfo(userArray) {
   let str = JSON.stringify(userArray);
   localStorage.setItem('users', str);
   DisplayInfo();
}

// display user's name
function DisplayInfo() {
   let statement = '';
   userArray.forEach((user, i) => {
      statement += `<tr>
           <th scope="row">${i+1}</th>
           <td>${user.name}</td>
           <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i> <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i></td>
         </tr>`;
   });
   recordsDisplay.innerHTML = statement;
}

// edit user's name
function EditInfo(id) {
   edit_id = id;
   usernameTextField.value = userArray[id].name;
   addUserBtn.innerText = 'Save Changes';
}

//delete user's name
function DeleteInfo(id) {
   userArray.splice(id, 1);
   SaveInfo(userArray);

}
// next
//select all tr of table
const allTr = document.querySelectorAll('#records tr');

//get text as query from search text field
const searchInputField = document.querySelector('#search');
searchInputField.addEventListener('input', function (e) {
   const searchStr = e.target.value.toLowerCase();
   recordsDisplay.innerHTML = '';
   allTr.forEach(tr => {
      const td_in_tr = tr.querySelectorAll('td');
      if (td_in_tr[0].innerText.toLowerCase().indexOf(searchStr) > -1) {
         recordsDisplay.appendChild(tr);
      }
   });

   if (recordsDisplay.innerHTML == '') {
      recordsDisplay.innerHTML = ' No Records Found';
   }
});
//last pegination

const total_records_tr = document.querySelectorAll('#records tr');
let records_per_page = 10;
let page_number = 1;
const total_records = total_records_tr.length;
let total_page = Math.ceil(total_records/records_per_page);
generatePage();
DisplayRecords();
function DisplayRecords(){
    let start_index = (page_number -1) * records_per_page;
    let end_index = start_index + (records_per_page-1);
    if(end_index>=total_records){
        end_index = total_records-1;
    }
    let statement = '';
    for(let i = start_index;i<=end_index;i++){
        statement+=`<tr>${total_records_tr[i].innerHTML}</tr>`;
    }
    recordsDisplay.innerHTML = statement;
    document.querySelectorAll('.dynamic-item').forEach(item=>{
        item.classList.remove('active');
    });
    document.getElementById(`page${page_number}`).classList.add('active');
    if(page_number==1){
        document.getElementById('prevBtn').parentElement.classList.add('disabled');
    }else{
        document.getElementById('prevBtn').parentElement.classList.remove('disabled');
    }
    if(page_number==total_page){
        document.getElementById('nextBtn').parentElement.classList.add('disabled');
    }else{
        document.getElementById('nextBtn').parentElement.classList.remove('disabled');
    }
    document.getElementById('page-details').innerHTML = `Showing ${start_index+1} to ${end_index+1} of ${total_records}`;

}
function generatePage(){
    //disabled
    let prevBtn = `<li class="page-item ">
    <a class="page-link" id="prevBtn" onclick = "prevBtn()" href="javascript:void(0)">Previous</a>
</li>`;
    let nextBtn = `<li class="page-item" ><a class="page-link" id="nextBtn" onclick = "nextBtn()" href="javascript:void(0)">Next</a>
    </li>`;
    let buttons = '';
    let activeClass = '';
    for(let i=1;i<=total_page;i++){
        if(i==1){
            activeClass='active';
        }
        else{
            activeClass = '';
        }
        buttons+=` <li class="page-item dynamic-item ${activeClass}" id="page${i}" ><a class="page-link" onclick="page(${i})" href="javascript:void(0)">${i}</a></li>`;
    }

    document.getElementById('pagination').innerHTML=`${prevBtn} ${buttons} ${nextBtn}`;
}

function prevBtn(){
    page_number--;
    DisplayRecords();
}
function nextBtn(){
    page_number++;
    DisplayRecords();
}

function page(index){
    page_number = parseInt(index);
    DisplayRecords();
}

record_size.addEventListener('change',function(e){
    records_per_page = parseInt(record_size.value);
    total_page = Math.ceil(total_records/records_per_page)
    page_number = 1;
    generatePage();
    DisplayRecords();
});