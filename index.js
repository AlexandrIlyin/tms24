'use strict'

const TODOS = [
    {
        id: 0,
        text: 'Clean up',
        date: '2022-02-14',
        isComplete: false
    },
    {
        id: 1,
        text: 'Read the book',
        date: '2022-02-14',
        isComplete: false
    },
    {
        id: 2,
        text: 'Clean up',
        date: '2022-02-14',
        isComplete: true
    },
    {
        id: 3,
        text: 'Read the book',
        date: '2022-02-14',
        isComplete: true
    },
    {
        id: 4,
        text: 'Clean up',
        date: '2022-02-14',
        isComplete: true
    },
    {
        id: 5,
        text: 'Read the book',
        date: '2022-02-14',
        isComplete: true
    },
    {
        id: 6,
        text: 'Clean up',
        date: '2022-02-14',
        isComplete: true
    },
    {
        id: 7,
        text: 'Read the book',
        date: '2022-02-14',
        isComplete: true
    },
    {
        id: 8,
        text: 'Clean up',
        date: '2022-02-14',
        isComplete: true
    },
    {
        id: 9,
        text: 'Read the book',
        date: '2022-02-14',
        isComplete: true
    },
]

const TODOS_KEY = 'todos'



const storedTodos = JSON.parse(localStorage.getItem('todos '));
const initialTodos = storedTodos ? storedTodos : TODOS;
sessionStorage.setItem('uid', (storedTodos && storedTodos.length) ? storedTodos[0].id + 1 : TODOS.length)

const bodyTag = document.getElementById('root');
const wrapper = document.createElement('div');
const header = document.createElement('header');
const buttonDelete = document.createElement('button');
const buttonAdd = document.createElement('button');
const inputTodo = document.createElement('input');
const todoContainer = document.createElement('div');
inputTodo.placeholder = ' Enter todo...';
inputTodo.id = 'main-input';
buttonDelete.append(document.createTextNode('Delete All'));
buttonAdd.append(document.createTextNode('Add'));
inputTodo.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' ) {
        addTodo()
    }
});

buttonAdd.onclick = (_) => addTodo ();


 const addTodo = () => {
 const input = document.getElementById ('main-input');
 if (input.value.length) {
     const newTodo = {
         id: Number.parseInt(sessionStorage.getItem('uid')),
         text: input.value, date: (new Date()).toISOString().substring(0,10),
         isComplete: false,
     }
     const todoWrapper = getTodo(newTodo);

     sessionStorage.setItem('uid', Number.parseInt(sessionStorage.getItem('uid')) + 1);
     todoContainer.prepend(todoWrapper);

     const storedTodos = JSON.parse(localStorage.getItem(TODOS_KEY));
     if (Array.isArray(storedTodos)) {
         storedTodos.push(newTodo);
         localStorage.setItem(TODOS_KEY, JSON.stringify(storedTodos));
     } else
         localStorage.setItem(TODOS_KEY, JSON.stringify([...TODOS, newTodo]));
 }
};
    
 buttonDelete.onclick = (_) => {
     todoContainer.innerHTML = '';
     localStorage.setItem (TODOS_KEY, JSON.stringify ([]))
 }

wrapper.className = 'main-wrapper';
header.className = 'header-wrapper';

header.append (buttonDelete);
header.append (inputTodo);
header.append (buttonAdd);
wrapper.append(header);
wrapper.append(todoContainer);


const getTodo = (todo) => {
    const todoWrapper = document.createElement('div');
    todoWrapper.id = `todo_${todo.id}`;
    const todoBody = document.createElement('div');
    const todoDate = document.createElement('div');
    const deleteTodo = document.createElement('button');
    deleteTodo.append(document.createTextNode('X'));
    deleteTodo.id = `delete-todo_${todo.id}`;

    const completeTodo = document.createElement('button');
    completeTodo.append(document.createTextNode('Complite'));
    completeTodo.id = `completeTodo-todo_${todo.id}`

    todoBody.append(document.createTextNode(todo.text));
    todoDate.append(document.createTextNode(todo.date));

    todoWrapper.className = todo.isComplete ? 'todo-wrapper done' : 'todo-wrapper';
    todoBody.className = 'todo-body';
    todoDate.className = 'todo-date';
    completeTodo.className = todo.isComplete ? 'disabled' : '';

    todoWrapper.append(completeTodo);
    todoWrapper.append(todoBody);
    todoWrapper.append(todoDate);
    todoWrapper.append(deleteTodo);
    

    return todoWrapper;
}

initialTodos.forEach(todo => {
    const todoWrapper = getTodo(todo);
    todoContainer.append(todoWrapper);
    
})
todoContainer.addEventListener('click', (event) =>{
    if (event.target.nodeName ==='BUTTON'){
        const id = event.target.id.split('-')[1];
        const todo = document.getElementById(id);
        const storedTodos = JSON.parse(localStorage.getItem(TODOS_KEY));
        const currentTodos = Array.isArray(storedTodos) ? storedTodos : TODOS;
         const objectId = Number.parseInt(id.split('_')[1]);

        if (event.target.id.split('-')[0] === 'delete') {
            const todosToSave = currentTodos.filter(todo => todo.id !== objectId);
            todo.parentNode.removeChild(todo);
        } else {
            const todosToSave = currentTodos.map (todo => {
                if (todo.id === objectId) {
                    return { ...todo , isComplete: true }
                }
                return todo;
            })
            localStorage.setItem(TODOS_KEY, JSON.stringify(todosToSave));
            todo.className += ' done ';
            const completeButton = document.getElementById(event.target.id);
            completeButton.className += 'disabled';
            
        }
        
     
    }
    
});

bodyTag.append(wrapper)