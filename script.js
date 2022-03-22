const getItemsFromLocalStorage = () => JSON.parse(localStorage.getItem('todo')) ?? [];//pega o array do localStorage
const setItemsFromLocalStorage = (db) => localStorage.setItem('todo', JSON.stringify(db));



const itemCreate = (todoText, status, index) => {
    const todo = document.createElement('label');//cria o label
    todo.classList.add('todo__item');//adiciona a classe
    todo.innerHTML = `
                <input type="checkbox" ${status} data-index=${index}>
                <div>${todoText}</div>
                <input type="button" value="X" data-index=${index}>
                ` //adiciona o conteudo
    const todoList = document.getElementById('todoList').appendChild(todo); //adiciona o label ao todoList
}

const clearTodo = () => { //limpa a tela
    const todoList = document.getElementById('todoList'); //pega a lista
    while (todoList.firstChild){//se tiver algo dentro do todoList
        todoList.removeChild(todoList.lastChild)//remove o ultimo filho
    }
}

const handleUpdateScreen = () => { //atualiza a tela
    clearTodo() //limpa a tela
    const db = getItemsFromLocalStorage(); //pega o array do localStorage
    db.forEach((todo, index) => {//percorre o array
        itemCreate(todo.tarefa, todo.status, index) //cria o item
    })
}

const addInDb = (evt) => {
    const keyPressed = evt.key;//pega o codigo da tecla
    const todoInput = document.getElementById('todoInput');//pega o input
    const todoText = todoInput.value;//pega o valor do input
    if (keyPressed === 'Enter' && todoText) {//se a tecla for enter e o input tiver algo
        const db = getItemsFromLocalStorage();//pega o array do localStorage
        db.push({'tarefa': evt.target.value, 'status': ''}); //adiciona o valor do input no array
        setItemsFromLocalStorage(db);//atualiza o localStorage  
        handleUpdateScreen() //atualiza a tela
        evt.target.value = ''; //limpa o input
        todoInput.focus(); //foca o input
    }
    
}

const removeItem = (index) => {
    const db = getItemsFromLocalStorage();//pega o array do localStorage
    db.splice(index, 1);//remove o item do array
    setItemsFromLocalStorage(db);//atualiza o localStorage
    handleUpdateScreen(); //atualiza a tela
}

const markAsChecked = (index) => {
    const db = getItemsFromLocalStorage();//pega o array do localStorage
    db[index].status = db[index].status ? '' : 'checked';//se o status for checked, retorna vazio, senao retorna checked
    setItemsFromLocalStorage(db);//atualiza o localStorage
    console.log(db[index].status);//verifica o status
    handleUpdateScreen();//atualiza a tela
}

const onClickItem = (evt) =>{
    const element = evt.target;//pega o elemento que foi clicado
    const index = element.dataset.index;//pega o index do elemento
    if (element.type === 'button') {//se o elemento for um button
        removeItem(index)//remove o item
    } else if (element.type === 'checkbox'){//se o elemento for um checkbox
        markAsChecked(index)//marca o item como checked
    }
}


const todoInput = document.getElementById('todoInput').addEventListener('keypress', addInDb)
const todoList = document.getElementById('todoList').addEventListener('click', onClickItem);

handleUpdateScreen()


