const store = new Store();

const root = document.getElementById('root');
const appWraper = document.querySelector('#app-wraper');
const button = document.getElementById('button');

let appBody;
const headers = new Array(
    { htmlFor: 'Наименование', name: 'name' },
    { htmlFor: 'Автор', name: 'author' },
    { htmlFor: 'Год выпуска', name: 'year' },
    { htmlFor: 'Изображение', name: 'img' }
);

const addButton = new CreateButton('span', 'Добавить книгу', 'add-button');

const add = addButton.create(button);
add.addEventListener('click', () => {
    store.setEditMode(true, 'new');
    render();
});

function addInput(parent, htmlFor, name = 'unnamed', type = 'text') {// parent = object, htmlFor = string
    const wrapper = document.createElement('div');
    wrapper.id = 'input-wrapper';
    parent.appendChild(wrapper);
    wrapper.innerHTML = `<p>${htmlFor}</p>`

    const input = document.createElement('input');
    input.name = name;
    input.type = type;
    wrapper.appendChild(input);

    return input;
}

function render() {
    appBody && appBody.remove();
    appBody = document.createElement('div');
    appBody.id = "app-body";
    appWraper.appendChild(appBody);

    const newBookCreator = new CreateForm(appBody, 'new', 'edit-form', render, headers);// headers - массив заголовков для инпутов
    const editBookCreator = new CreateForm(appBody, 'edit', 'edit-form', render, headers);

    if (store.getEditMode()) {
        if (store.getFormType() === 'new') {
            newBookCreator.createForm(store, addInput); // для прокидывания методов из стора addInput - добавление инпутов в форму.
        } else if (store.getFormType() === 'edit') {
            editBookCreator.createForm(store, addInput);
        }
    } else {
        const books = store.getBooks().map((i, indx) => {
            return renderBook(store, render, appBody, i.name, i.author, i.year, i.img, indx);
        })
    }
}

window.store = store;
document.addEventListener('DOMContentLoaded', render());