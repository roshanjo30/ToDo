class TodoPlugin {
    constructor(selector){
        this.container = document.querySelector(selector);
        this.container.innerHTML = `
            <div class="mainbar">
            <h1 class="title">ToDo App</h1>
            </div>

                <div class="input">
                    <button id="addbutton">Add Task</button>
                </div>

                <input
                    type="text"
                    id="task"
                    placeholder="Task Name"
                    hidden
                >

                <h3 class="main">ToDo List</h3>

                <ul id="todoList"></ul>

        `;
        this.loadTodos();
        this.setupEvents();
    }

    saveTodos() {
        const todos = [];

        const todoList = this.container.querySelector("#todoList");
    
        todoList.querySelectorAll("li").forEach((li) => {
            const taskText = li.querySelector("span");
    
            
            todos.push({
                text: taskText.textContent,
                completed: li.classList.contains("completed")
            });
        });
    
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    loadTodos() {
        const todoList = this.container.querySelector("#todoList");

        const todos = JSON.parse(localStorage.getItem("todos")) || [];
    
        todos.forEach((todo) => {
            const li = document.createElement("li");
    
            const taskText = document.createElement("span");
            taskText.textContent = todo.text;
    
    
            if (todo.completed) {
                li.classList.add("completed");
            }
    
            li.addEventListener("click", () => {
                li.classList.toggle("completed");
                this.saveTodos();
            });
    
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.classList.add("remove-button");
    
            removeButton.addEventListener("click", () => {
                li.remove();
                this.saveTodos();
            });
    
            li.appendChild(taskText);
            li.appendChild(removeButton);
    
            todoList.appendChild(li);
        });
    }

    setupEvents(){
        const input = this.container.querySelector("#task");
    
        const addButton = this.container.querySelector("#addbutton");

        const todoList = this.container.querySelector("#todoList");

        addButton.addEventListener("click", () => {
            
            input.hidden = false;
            input.focus();
            const todoText = input.value.trim();
        
            if (!todoText) {
                return;
            }
        
            const li = document.createElement("li");
        
            const taskText = document.createElement("span");
            taskText.textContent = todoText;
            
            li.addEventListener("click", () => {
                li.classList.toggle("completed");
                this.saveTodos();
            });
        
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.classList.add("remove-button");
            
            removeButton.addEventListener("click", () => {
                li.remove();
                this.saveTodos();
            });
            
            li.appendChild(taskText);
            li.appendChild(removeButton);
            
            todoList.appendChild(li);
        
            input.value = "";
            this.saveTodos();
        
            input.hidden = true;
        });

        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                addButton.click();
            }
        });
        

    }
}


const todo = new TodoPlugin("#todo");








