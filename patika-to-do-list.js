// Bir "kapat" düğmesi oluşturun ve bunu her liste öğesine ekleyin
let myNodelist = document.getElementsByTagName("LI");
let index;
for (index = 0; index < myNodelist.length; index++) {
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[index].appendChild(span);
}
// Geçerli liste öğesini gizlemek için bir kapat düğmesine tıklayın
let close = document.getElementsByClassName("close");
for (let index = 0; index < close.length; index++) {
  close[index].onclick = function() {
    let div = this.parentElement;
    div.style.display = "none";
  }
}
// Bir liste öğesine tıklandığında "checked" bir sembol ekleyin
let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName == 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);


let taskDOM = document.querySelector("#task");
let listDOM = document.querySelector("#list");



//Tüm event listenersleri çalıştıran fonksiyon
eventListeners();
function eventListeners() {

  listDOM.addEventListener("click", deleteTodoTOUI);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  document.addEventListener("",checktodo);
}

// checktodo function
function checktodo(e) {
    if (e.target.tagName == "LI") {
      e.target.className = "checked";
    } else if (e.target.tagName == "checked") {
      e.target.className = "LI";
    }else{
        
    }
    e.preventDefault()
  }


//deleteTodoTOUI function
function deleteTodoTOUI(e) {
  //silme iconuna tıklanıp tıklanmadığını kontrol ediyoruz
  if (e.target.className === "fa fa-remove close") {
    let del = e.target.parentElement.parentElement;
    deleteTodoFromStorage(del.innerText);
    del.remove();
  }

}

//deleteTodoFromStorage function
function deleteTodoFromStorage(deletetodo) {
  //localstorageden değerleri todos ismiyle array olarak aliyoruz 
  let todos = getTodoFromStorage();
  //bu aldığımız arrayi tek tek dolaşıyoruz forEach ile
  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {//silmek istenilen değeri arrayda yakalıyoruz
      todos.splice(index, 1); // o indexi siler
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

//loadAllTodosToUI function
function loadAllTodosToUI() {
  let todos = getTodoFromStorage();
  todos.forEach((todo) => {addTodoTOUI(todo);});
}

//newElement function
function newElement(e) {
  const newTodo = taskDOM.value.trim(); //inputun başındaki ve sonundaki boşlukları kaldırma fonksiyonu
  if (newTodo === "") {
    $(".error").toast("show"); //Hata Bildirimi
    taskDOM.value = "";
  } else {
    addTodoTOUI(newTodo);
    addTodoTOStorage(newTodo);
    $(".success").toast("show");
  }
  
}

//Todoları Storageden almak
function getTodoFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

// Todoları Storageye yollamak
function addTodoTOStorage(newTodo) {
  let todos = getTodoFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Todoları Ekrana Eklemek
function addTodoTOUI(newTodo) {
  const listItem = document.createElement("LI");
  listItem.className = "listitem";
  //silme işlemi için gerekli icon
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class ='fa fa-remove close'></i>";
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);
  listDOM.appendChild(listItem);
  taskDOM.value = "";
}
