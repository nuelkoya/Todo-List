
const inputTodo = document.querySelector(".input-todo")
const addTodo = document.querySelector(".add-todo-btn")
const todoList = document.querySelector(".todo-list")
const filterBtn = document.querySelector(".filter-todo")

addTodo.addEventListener('click', showTodo)
todoList.addEventListener('click', markTodo)
filterBtn.addEventListener('click', filterTodo)
document.addEventListener("DOMContentLoaded", getLocalStorage)


function showTodo(event){
    event.preventDefault()

    if(inputTodo.value !== ""){
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    const todo = document.createElement('li')
    todo.innerHTML = inputTodo.value

    saveToLocalStorage(inputTodo.value)

    todo.classList.add('todo-item')
    todoDiv.appendChild(todo)

    const markedBtn = document.createElement('button')
    markedBtn.classList.add('marked')
    markedBtn.innerHTML = `<i class="fa-solid fa-square-check"></i>`
    todoDiv.appendChild(markedBtn)

    const trashBtn = document.createElement('button')
    trashBtn.classList.add('trash')
    trashBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
    todoDiv.appendChild(trashBtn)

    inputTodo.value =""
    todoList.appendChild(todoDiv)
    }

}


function markTodo(event){

    item = event.target

    if(item.classList[0] === "marked"){
        item.parentElement.classList.toggle("completed")
    }

    if(item.classList[0] === "trash"){
        item.parentElement.classList.add("fall")
        deleteFromLocalStorage(item.parentElement)
        item.parentElement.addEventListener("transitionend", function(){
            item.parentElement.remove()
        })
    }

}


function filterTodo(event){
    const todos = todoList.childNodes
    
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = "flex"
                break
            case "marked":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex"
                } else{
                    todo.style.display = "none"
                }
                break
            case "unmarked":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex"
                } else{
                    todo.style.display = "none"
                }   
        }      
    })
}

function saveToLocalStorage(todo){
    let todos
    if (localStorage.getItem('todos') === null){
        todos =[]
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function deleteFromLocalStorage(todo){
    let todos
    if (localStorage.getItem('todos') === null){
        todos =[]
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const deleteTodo = todo.children[0].innerHTML
    todos.splice(todos.indexOf(deleteTodo), 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getLocalStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    todos.forEach(function(newTodo){
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
    
        const todo = document.createElement('li')
        todo.innerHTML = newTodo

        todo.classList.add('todo-item')
        todoDiv.appendChild(todo)
    
        const markedBtn = document.createElement('button')
        markedBtn.classList.add('marked')
        markedBtn.innerHTML = `<i class="fa-solid fa-square-check"></i>`
        todoDiv.appendChild(markedBtn)
    
        const trashBtn = document.createElement('button')
        trashBtn.classList.add('trash')
        trashBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
        todoDiv.appendChild(trashBtn)
    
        inputTodo.value =""
        todoList.appendChild(todoDiv)
        })
    
}

