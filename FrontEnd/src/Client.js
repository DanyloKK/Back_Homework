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


        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            createList.remove();
        });


        const createEdit = document.createElement("button");
        createEdit.textContent = "Edit";
        createEdit.addEventListener("click", () => {
            const inputEdit = document.createElement("input");
            inputEdit.value = createSpan.textContent.trim();
            createSpan.textContent = "";
            createSpan.appendChild(inputEdit);

            const saveBtn = document.createElement("button");
            saveBtn.textContent = "Save";
            createSpan.appendChild(saveBtn);

            saveBtn.addEventListener("click", () => {
                const newText = inputEdit.value.trim();
                if (newText) {
                    createSpan.textContent = newText;
                    saveBtn.remove();
                    inputEdit.remove();
                }
            });
        });


        createList.appendChild(createEdit);
        createList.appendChild(deleteButton);
        mainList.appendChild(createList);
        input.value = "";
        await postRequest({task: inputValue});
        await getRequest()
    }
}

button.addEventListener("click", addElement);
const postRequest = async (data) => {
    try {
        const response = await fetch(`http://localhost:8000/tasks`, {
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


