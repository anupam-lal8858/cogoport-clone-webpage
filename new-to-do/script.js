
let todos = [];
let activityLogs = [];

// Initialize the app by rendering the todos from local storage (if present)
const storedTodos = JSON.parse(localStorage.getItem('todos'));
if (storedTodos) {
    todos = storedTodos;
    renderTodos();
}

// Save todos to local storage whenever there is a change
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Add event listeners to save the todos to local storage whenever there is a change
document.addEventListener('change', saveToLocalStorage);
document.addEventListener('click', saveToLocalStorage);

// Helper function to get the current date
function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Function to add a new todo item to the list
function addTodo() {
    const input = document.getElementById('new-todo');
    const todoText = input.value.trim();
    if (todoText === '') return;


    const dueDateInput = document.getElementById('due-date');
    const dueDate = dueDateInput.value; // Get the selected date from the input field

    const prioritySelect = document.getElementById('priority-select');
    const priority = prioritySelect.value;

    // Create a new todo object with necessary details
    const todo = {
        id: Date.now(), 
        text: todoText,
        dueDate: dueDate || null,
        completed: false,
        expired: false,
        priority: priority,
        subtasks: []
    };

    // Add the todo to the list (you can use a more advanced data structure to manage todos)
    todos.push(todo);

    // Clear input field
    input.value = '';
    dueDateInput.value = '';
    prioritySelect.value = 'low';
   
    addActivityLog(todo.text, 'Task is Added');
      
    // Update the UI to display the newly added todo
    renderTodos();
}

//function to create a todo list
function createTodoItem(todo) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    // Add checkbox for completion status
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodoCompletion(todo.id));
    todoItem.appendChild(checkbox);

    // Create a span to display the todo text
    const todoText = document.createElement('span');
    todoText.textContent = todo.text;
    todoItem.appendChild(todoText);

    // Add due date if available
    if (todo.dueDate) {
        const dueDate = document.createElement('span');
        dueDate.textContent = `Due Date: ${todo.dueDate}`;
        todoItem.appendChild(dueDate);
    }

    // Add priority if available
    if (todo.priority) {
        const priority = document.createElement('span');
        priority.textContent = `Priority: ${todo.priority}`;
        todoItem.appendChild(priority);
    }

    // Create a button to delete the todo
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        addActivityLog(todo.text, 'Task is deleted');
        deleteTodo(todo.id)});
    todoItem.appendChild(deleteButton);

    return todoItem;
}

// Function to mark a todo as completed or undone
function toggleTodoCompletion(todoId) {
    // Find the todo with the specified ID
    const todo = todos.find(todo => todo.id === todoId);
    if (todo) {
        todo.completed = !todo.completed;
        if(todo.completed)
        addActivityLog(todo.text, 'Marked as Done');
        else
        addActivityLog(todo.text, 'Marked as Undone');

        renderTodos();
    }
}

// Function to delete a todo
function deleteTodo(todoId) {
    // Filter out the todo with the specified ID
    todos = todos.filter(todo => todo.id !== todoId);
    renderTodos();
}

// Function to create an "Edit" button for a todo
function createEditButton(todoId) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => showEditForm(todoId));
    return editButton;
}


// Function to edit a todo
function editTodo(todoId, newText, newDueDate) {
    // Find the todo with the specified ID
    const todo = todos.find(todo => todo.id === todoId);
    if (todo) {
        todo.text = newText;
        todo.dueDate = newDueDate;
        renderTodos();
    }
}

// Function to show edit form for a todo
function showEditForm(todoId) {
    const todo = todos.find(todo => todo.id === todoId);
    if (!todo) return;

    const todoItem = document.getElementById(`todo-${todoId}`);
    const todoText = todoItem.querySelector('span');

    // Hide the todo text element
    todoText.style.display = 'none';

    const editForm = document.createElement('div');
    editForm.classList.add('edit-form');

    // Input field for todo text
    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.value = todo.text;
    editForm.appendChild(textInput);

    // Input field for due date
    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    dueDateInput.value = todo.dueDate || getCurrentDate();
    editForm.appendChild(dueDateInput);

    // Save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => {
        const newText = textInput.value.trim();
        const newDueDate = dueDateInput.value;
        if (newText === '') return;
        editTodo(todoId, newText, newDueDate);
        todo.text = newText; // Update the todo text immediately for display
        if (newDueDate) {
            todo.text += ` (Due: ${newDueDate})`;
        }
        todoText.textContent = todo.text;
        todoText.style.display = 'inline'; // Show the updated todo text
        todoItem.removeChild(editForm);
        addActivityLog(todo.text, 'Task is edited!');
    });
    editForm.appendChild(saveButton);

    // Cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        todoText.style.display = 'inline'; // Show the original todo text
        todoItem.removeChild(editForm);
    });
    editForm.appendChild(cancelButton);

    todoItem.appendChild(editForm);
}


// Function to search for todos based on search criteria
function searchTodos() {
    const searchInput = document.getElementById('search-bar').value.trim();
    const searchOption = document.getElementById('search-options').value;
    let filteredTodos = [];

    switch (searchOption) {
        case 'exact':
            filteredTodos = todos.filter(todo => todo.text.toLowerCase() === searchInput.toLowerCase());
            break;
        case 'subtask':
            filteredTodos = todos.filter(todo => todo.subtasks.some(subtask => subtask.toLowerCase().includes(searchInput.toLowerCase())));
            break;
        case 'similar':
            filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchInput.toLowerCase()));
            break;
        case 'partial':
            filteredTodos = todos.filter(todo => todo.text.toLowerCase().startsWith(searchInput.toLowerCase()));
            break;
        case 'tags':
            filteredTodos = todos.filter(todo => todo.tags && todo.tags.some(tag => tag.toLowerCase() === searchInput.toLowerCase()));
            break;
        default:
            filteredTodos = todos;
    }

    // Update the UI to display the filtered todos
    renderFilteredTodos(filteredTodos);
}

// Function to render filtered todos in the UI
function renderFilteredTodos(filteredTodos) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    // Loop through the filtered todos and create HTML elements to display them
    filteredTodos.forEach(todo => {
        const todoItem = createTodoItem(todo);
        todoList.appendChild(todoItem);

    });
}
// Function to add an activity log
function addActivityLog(todoText, activity) {
    const timestamp = new Date().toLocaleString();
    const activityLog = {
      timestamp: timestamp,
      text: `${activity} - "${todoText}"`,
    };
    activityLogs.push(activityLog);
  }

// Function to display activity logs
function displayActivityLogs() {
    const activityLogsContainer = document.getElementById('activity-logs');
    activityLogsContainer.innerHTML = '';
  
    activityLogs.forEach(log => {
      const logItem = document.createElement('div');
      logItem.textContent = `${log.timestamp}: ${log.text}`;
      activityLogsContainer.appendChild(logItem);
    });
  }
// Attach event listener to the search button
document.getElementById('search-bar').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        searchTodos();
    }
});

document.getElementById('search-options').addEventListener('change', searchTodos);


// Function to mark a todo as done
function markTodoAsDone(todoId) {
    const todo = todos.find(todo => todo.id === todoId);
    if (todo) {
        todo.completed = true;
        renderTodos();
    }
}

// Function to filter completed todos
function getCompletedTodos() {
    return todos.filter(todo => todo.completed);
}

// Function to get pending (uncompleted) todos
function getPendingTodos() {
    return todos.filter(todo => !todo.completed&& !todo.expired);
}

// function to filter expired todos
function filterExpiredTodos() {
    const currentDate = new Date();
    return todos.filter(todo => {
        return todo.dueDate && new Date(todo.dueDate) < currentDate;
    });
}

// Function to render the list of todos in the UI
function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    //rendering pending todo section
    const pendingTodos = getPendingTodos();
    pendingTodos.forEach(todo => {

        const todoItem =
        
        document.createElement('div');
        todoItem.classList.add('todo-item');
        todoItem.id = `todo-${todo.id}`;

        // Add checkbox for completion status
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => toggleTodoCompletion(todo.id));
        todoItem.appendChild(checkbox);

        // Display the todo text
        const todoText = document.createElement('span');
        todoText.textContent = todo.text;
        todoItem.appendChild(todoText);

        // Display the due date (if present)
        if (todo.dueDate) {
            const dueDateText = document.createElement('span');
            dueDateText.classList.add('due-date');
            dueDateText.textContent = ` (Due: ${todo.dueDate})`;
            todoItem.appendChild(dueDateText);
        }

        // Add priority if available
        if (todo.priority) {
            const priority = document.createElement('span');
            priority.textContent = `Priority: ${todo.priority}`;
            todoItem.appendChild(priority);
        }

        // Add "Edit" button

        const editButton = createEditButton(todo.id);
        todoItem.appendChild(editButton);

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            addActivityLog(todo.text, 'Task is deleted');
            deleteTodo(todo.id)});
        todoItem.appendChild(deleteButton);

        todoList.appendChild(todoItem);
    });

    //rendering completed section
    const completedTodos = getCompletedTodos();
    const completedSection = document.getElementById('completed-section');
    completedSection.innerHTML = '';

    completedTodos.forEach(todo => {
        const todoItem = createTodoItem(todo);
        completedSection.appendChild(todoItem);
    });

    // render expired section

    const expiredSection = document.getElementById('expired-section');
    expiredSection.innerHTML = '';
    const expiredTodos = filterExpiredTodos();
    expiredTodos.forEach(todo => {

        todo.expired=true;
        const todoItem = createTodoItem(todo);
        expiredSection.appendChild(todoItem);
    });
 displayActivityLogs();

}
