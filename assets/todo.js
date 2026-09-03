class TodoPlugin {
    constructor(){
        this.input = document.querySelector("#task");
        this.addButton = document.querySelector("#addbutton");
        this.todoList = document.querySelector("#todoList");
        this.loadTodos();
        this.setupEvents();
    }

    saveTodos() {
        const todos = [];
    
        this.todoList.querySelectorAll("li").forEach((li) => {
            const taskText = li.querySelector("span");
    
            
            todos.push({
                text: taskText.textContent,
                completed: li.classList.contains("completed")
            });
        });
    
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    loadTodos() {
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
    
            this.todoList.appendChild(li);
        });
    }

    setupEvents(){
        this.addButton.addEventListener("click", () => {
            
            this.input.hidden = false;
            this.input.focus();
            const todoText = this.input.value.trim();
        
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
            
            this.todoList.appendChild(li);
        
            this.input.value = "";
            this.saveTodos();
        
            this.input.hidden = true;
        });

        this.input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                this.addButton.click();
            }
        });
        

    }
}


const todo = new TodoPlugin();








