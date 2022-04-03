const TODOS = [
    {
        id: 0,
        text: 'Clean up',
        date: '2022-02-14'
    },
    {
        id: 1,
        text: 'Read the book',
        date: '2022-02-14'
    },
    {
        id: 2,
        text: 'Clean up',
        date: '2022-02-14'
    },
    {
        id: 3,
        text: 'Read the book',
        date: '2022-02-14'
    },
    {
        id: 4,
        text: 'Clean up',
        date: '2022-02-14'
    },
    {
        id: 5,
        text: 'Read the book',
        date: '2022-02-14'
    },
    {
        id: 6,
        text: 'Clean up',
        date: '2022-02-14'
    },
    {
        id: 7,
        text: 'Read the book',
        date: '2022-02-14'
    },
    {
        id: 8,
        text: 'Clean up',
        date: '2022-02-14'
    },
    {
        id: 9,
        text: 'Read the book',
        date: '2022-02-14'
    },
]

let uniqueId = TODOS.length


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

buttonAdd.onclick = (_) => {
    const input = document.getElementById ('main-input');
    if (input.value.length) {
        const todoWrapper = getTodo ({id: uniqueId, text: input.value, date: (new Date()).toISOString().substring(0,10)});
        uniqueId ++;
        todoContainer.prepend(todoWrapper);
    }
    
 };
    
 buttonDelete.onclick = (_) => {
     todoContainer.innerHTML = ''
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

    todoWrapper.className = 'todo-wrapper';
    todoBody.className = 'todo-body';
    todoDate.className = 'todo-date';

    todoWrapper.append(completeTodo);
    todoWrapper.append(todoBody);
    todoWrapper.append(todoDate);
    todoWrapper.append(deleteTodo);
    

    return todoWrapper;
}

TODOS.forEach(todo => {
    const todoWrapper = getTodo(todo);
    todoContainer.append(todoWrapper);
    
})
todoContainer.addEventListener('click', (event) =>{
    if (event.target.nodeName ==='BUTTON'){
        const id = event.target.id.split('-')[1];
        const todo = document.getElementById(id);
        if (event.target.id.split('-')[0] === 'delete'){
            todo.parentNode.removeChild(todo);
        } else {
            todo.className += ' done ';
            const completeButton = document.getElementById(event.target.id);
            completeButton.className += 'disabled'
        }
        
     
    }
    
});

bodyTag.append(wrapper)