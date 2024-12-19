"use strict";

const button = document.getElementById("addTodo");
const input = document.getElementById("todoInput");
const mainList = document.getElementById("todoList");
const saveBtn = document.getElementById("saveTodo");

async function addElement() {
    const inputValue = input.value.trim();
    if (inputValue) {
        const createList = document.createElement("li");
        createList.classList.add("todo-li");

        const createSpan = document.createElement("span");
        createSpan.textContent = inputValue;
        createList.appendChild(createSpan);

        mainList.appendChild(createList);
        input.value = "";
        await postRequest({task: inputValue});

    }
}

button.addEventListener("click", addElement);
const postRequest = async (data) => {
    try {
        const response = await fetch(`http://localhost:3000/tasks`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        })
        if (response.ok) {
            const data = await response.json();
            console.log(data);
        }
    } catch (error) {
        console.log(error);
    }

}

const getRequest = async () => fetch(`http://localhost:3000/tasks`)
saveBtn.addEventListener("click", async () => {
    try {
        const response = await fetch("http://localhost:3000/tasks");
        if (response.ok) {
            const tasks = await response.json();
            mainList.innerHTML = "";
            tasks.forEach(task => {
                const createList = document.createElement("li");
                createList.classList.add("todo-li");
                const createSpan = document.createElement("span");
                createSpan.textContent = task.task;
                createList.appendChild(createSpan);
                mainList.appendChild(createList);
            });
        }
    } catch (error) {
        console.log(error);
    }


})
const deleteRequest = async (task) => fetch(`http://localhost:3000/tasks/${task}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
})
document.getElementById("clear").addEventListener("click", async () => {
    const response = await deleteRequest(document.getElementById("input-delete").value);
    const data = await response.json();
    console.log(data);
})
const putRequest = async (task, newTask) => {
    return fetch(`http://localhost:3000/tasks/${task}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newTask),
    })
}
document.getElementById("update").addEventListener("click", async () => {
    const task = document.getElementById("change").value;
    const updatedData =  {
        task: document.getElementById("input-update").value,
        completed: true,
    }
    try {
        const response = await putRequest(task, updatedData);
        if (!response.ok) {
            throw new Error("Failed to update task");
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }


})


/*
function handleList() {
    button.addEventListener("click", (e) => {
        const inputValue = input.value.trim();
        if (inputValue) {

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", (e) => {
                createList.remove();
            })
            createList.appendChild(deleteButton);
            const createEdit = document.createElement("button");
            createEdit.textContent = "Edit";
            createList.appendChild(createEdit);
            createEdit.addEventListener("click", (e) => {
                const inputEdit = document.createElement("input");
                inputEdit.value = createSpan.textContent.trim();
                createSpan.textContent = "";
                createSpan.appendChild(inputEdit)
                const saveBtn = document.createElement("button");
                saveBtn.textContent = "Save";
                createSpan.appendChild(saveBtn);
                saveBtn.addEventListener("click", (e) => {
                    const newText = inputEdit.value.trim();
                    if (newText) {
                        createSpan.textContent = newText;
                        saveBtn.remove();
                        inputEdit.remove();
                    }
                })


            })

        }
    })
}



handleList();
const postTodos = async () => fetch(`"http://localhost:8080/todos"`, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({})
})


 */


