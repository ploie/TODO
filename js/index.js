
const BACKEND_ROOT_URL = 'http://localhost:3001';

import { error } from "console";
import {Todos} from "./class/Todos.js"

const todos = new Todos(BACKEND_ROOT_URL)

const list = document.querySelector('ul');
const input = document.querySelector('input');

input.disabled = true;

// Renders a single task item into the DOM
const renderTask = (task) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-group-item'); // fixed typo: "lit-group-item"
    li.setAttribute('data-key', task.getId().toString())
    li.innerHTML = task.getText()
    renderSpan(li,task.getText())
    renderLink(li,task.getId())
    list.append(li)
}

const renderSpan = (li,text) => {
    const span = li.appendChild(document.createElement('span'))
    span.innerHTML = text
}

const renderLink = (li, id) => {
    const a = li.appendChild(document.createElement('a'))
    a.innerHTML = '<i class="bi bi-trash"></i>'
    a.setAttribute('style', 'float: right')
    a.addEventListener('click', (event) => {
        todos.removeTask(id).then((remove_id) => {
            const li_to_remove = document.querySelector(`[data-key='${remove_id}']`)
            if (li_to_remove) {
                list.removeChild(li_to_remove)
            }
        }).catch((error) => {
            alert(error)
        })
    })
}

// Fetches tasks from the backend
const getTasks = async () => {
    todos.getTasks().then((tasks) => {
        tasks.forEach(task => {
            renderTask(task)
        })
        input.disabled = false
    }).catch ((error) => {
        alert(error)
    })
}

    /*{
    try {
        const response = await fetch(BACKEND_ROOT_URL + '/tasks');
        const json = await response.json(); // fixed: "awai" → "await"
        json.forEach(task => {
            renderTask(task.description);
        });
        input.disabled = false;
    } catch (error) {
        alert("Error retrieving tasks: " + error.message);
    }
        
};*/

// Saves a new task to the backend
/*const saveTask = async (task) => {
    try {
        const response = await fetch(BACKEND_ROOT_URL + '/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description: task })  // ✅ this is all you need
        });

        const json = await response.json(); // ✅ get response from server
        return json; // so it can be used in the .then()
    } catch (error) {
        alert("Error saving task: " + error.message);
    }
};*/



// Listen for the Enter key to add a new task
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        const task = input.value.trim()
        if (task !== '') {
            todos.addTask(task).then ((task) => {
                renderTask(task)
                input.value = ''
                input.focus()
            });
        }
    }
});

// Initial fetch of tasks
getTasks();

