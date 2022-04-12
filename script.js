window.onload = function () {
  var todo_container = document.querySelector(".todo-container");
  todo_container.style.display = "none";

  sessionStorage.removeItem("userTask");
  sessionStorage.removeItem("completed");
};

function showModal() {
  var modalDoc = document.querySelector("#Mymodal");
  modalDoc.classList.add("showModal");
  var modalDocument = document.querySelector("#Mymodal");
  modalDocument.classList.remove("hideModal");
}

function cancel() {
  var modalDocument = document.querySelector("#Mymodal");
  modalDocument.classList.add("hideModal");
}
//selectors
const todo_list = document.querySelector(".todo-list");

//add your task
function addTodoList() {
  const memberInput = document.getElementById("addMember").value;
  const taskTextfield = document.getElementById("TaskText").value;
  const priorityValue = document.getElementById("priority").value;

  if (
    memberInput == "" ||
    taskTextfield == "" ||
    priorityValue == "--select priority"
  ) {
    alert("All field are mendatory");
    return false;
  }

  var todo_container = document.querySelector(".todo-container");
  todo_container.style.display = "block";

  var heading = document.querySelector(".heading");
  heading.style.display = "none";

  var modalDocument = document.querySelector("#Mymodal");
  modalDocument.classList.add("hideModal");
  // array of objects
  let taskData = {

    teamMember: memberInput,
    task: taskTextfield,
    priority: priorityValue,
    isCompleted: false,
  };

  var storeData = sessionStorage.getItem("userTask");
  if (storeData == null) {
    var data = [];
  } else {
    data = JSON.parse(storeData);
  }
  data.push(taskData);
  sessionStorage.setItem("userTask", JSON.stringify(data));

  showTask();
}

// SHOW FUNCTION
function showTask() {
  var storeData = sessionStorage.getItem("userTask");
  var datas = JSON.parse(storeData);
  //console.log(datas);
  let datalist = "";

  
  datas.forEach((item, index) => {
    
    if(!item.isCompleted)
    {
    //console.log(item.teamMember);
    datalist += ` <div class="taskList">
  <p class="teamMembers">${item.teamMember}</p>
  <p class="taskTodo">${item.task}</p>
  <p class="priorityLevel" ><span class="prioritycolor">${item.priority}</span></p>
  <div class="btnContainer">
  <button class="taskCompletedBtn" onclick="completedtask(${index})" ><i class="fa fa-check " style="color:green;"></i></button>
  <button class="deleteBtn" onclick="deletedtask(${index})"><i class="fa fa-trash-o " style="color:#EF9B0F;"></i></button>
  </div>
  </div>
  <hr class="hrstyle2">`;
    }
    else{
      return true;
    }
  });

  todo_list.innerHTML = datalist;
  
  datas.forEach((item, index) => {
    //completed check list [index]
    //  if(!item.isCompleted)
    //  {
    var priorityLevel = document.querySelectorAll(".priorityLevel");
   
    if (item.priority === "High priority") {
      priorityLevel[index].style.background = "red";
      }
      else if (item.priority === "Middle priority") {
        priorityLevel[index].style.background = "#EF9B0F";
      }
      else if (item.priority === "Low priority") {
        priorityLevel[index].style.background = "green";
      }
   // }
    //  else{
      
    //    return true;
    //  }
  });
}

//completed button
function completedtask(index) {
  var storeData = sessionStorage.getItem("userTask");
  var datas = JSON.parse(storeData);

   datas[index].isCompleted = true;
   sessionStorage.setItem("userTask", JSON.stringify(datas));
   showCompletedTask();
   showTask();
  
  // showCompletedTask();
   
  }
//show completed task
function showCompletedTask() {
  const completedListDoc = document.querySelector(".completed-list");

  var storeCompletedData = sessionStorage.getItem("userTask");
  var completeData = JSON.parse(storeCompletedData);

  
  let completeDatalist = "";

  completeData.forEach((item, index) => {
 
  //console.log(item.isCompleted);
 
  if(item.isCompleted)
  {
  completeDatalist += `<div class="taskList">
  <p class="teamMembers">${item.teamMember}</p>
  <p class="taskTodo">${item.task}</p>
  <p class="prioritylevel" ><span class="prioritycolor">${item.priority}</span></p>
  <div class="btnContainer">
  <button class="deleteBtn" onclick="deleteCompletedtask(${index})">
  <i class="fa fa-trash-o " style="color:#EF9B0F;"></i></button>
  </div>
  </div>
  <hr class="hrstyle3">`;
  }
  else{
    return;
  }
  });

  completedListDoc.innerHTML = completeDatalist;
}

//deleete button
function deletedtask(index) {
  var storeData = sessionStorage.getItem("userTask");
  var datas = JSON.parse(storeData);
  datas.splice(index, 1);

  const alldelete = document.querySelector(".hrstyle2");
  alldelete.remove();

  //update the session storage
  sessionStorage.setItem("userTask", JSON.stringify(datas));
  showTask();
}
//delete completed task
function deleteCompletedtask(index) {
  var storeData = sessionStorage.getItem("userTask");
  var datas = JSON.parse(storeData);
  datas.splice(index, 1);

  // const alldelete = document.querySelector(".hrstyle3");
  // alldelete.remove();

  //update the session storage
  sessionStorage.setItem("userTask", JSON.stringify(datas));
  showCompletedTask();
}
