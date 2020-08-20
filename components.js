//buttons
class CreateButton {
    constructor(element, title, styleId) {
        this.parent = parent;
        this.element = element;
        this.title = title;
        this.styleId = styleId;
    }

    create(parent) {
        const elem = document.createElement(this.element)
        elem.id = this.styleId;
        elem.innerHTML = this.title;
        parent.appendChild(elem);
        return elem;
    }
};

const editButton = new CreateButton('span', 'Редактировать', 'edit-button');
const deleteButton = new CreateButton('span', 'Удалить', 'edit-button');
const saveButton = new CreateButton('span', 'Сохранить', 'edit-button');
const canselButton = new CreateButton('span', 'Отмена', 'edit-button');

class CreateForm {
    constructor(parent, type, styleID, renderFunc, inputHeaders) {
        this._type = type;
        this._parent = parent;
        this._styleID = styleID;
        this._render = renderFunc;
        this._headers = inputHeaders;
    }

    _formState = {};

    createForm = (_store, _addInputFunc) => {
        const form = document.createElement('form');
        form.id = this._styleID;
        this._parent.appendChild(form);

        const title = document.createElement('div');
        title.id = "edit-title";
        title.innerHTML = "<h2>Редактирование книги</h2>";
        form.appendChild(title);

        this._headers.map(i => {
            return _addInputFunc(form, i.htmlFor, i.name);
        })

        const buttons = document.createElement('div');
        buttons.id = "buttons";
        form.appendChild(buttons);

        const _save = saveButton.create(buttons)
        const _cansel = canselButton.create(buttons)
        _save.addEventListener('click', () => {
            this._formState.name = form.elements.name.value || undefined;
            this._formState.author = form.elements.author.value || undefined;
            this._formState.year = form.elements.year.value || undefined;
            this._formState.img = form.elements.img.value || undefined;
            this._formState.id = _store.getBooks().length;

            if (this._type === 'new') {
                _store.addBook(this._formState)
            } else if (this._type === 'edit') {
                _store.editBook(this._formState);
            }

            _store.setEditMode(false);
            this._render();
        });

        _cansel.addEventListener('click', () => {
            _store.setEditMode(false);
            this._render();
        });

        return form;
    }

};

function renderBook(_store, _render, parent, title = 'нет названия', author = 'нет автора',
    year = 'нет даты выпуска', img, indx) {

    const url = /(?:https?:\/\/)?(?:[\w\.]+)\.(?:[a-z]{2,6}\.?)(?:\/[\w\.]*)*\/?/;
    if (!url.test(img)) img = _store.getDefaultImg();

    if (!+year) year = 'нет даты выпуска';

    const book = document.createElement('div');
    book.id = "book";
    book.storeID = indx;
    parent.appendChild(book);

    const _img = document.createElement('img');
    _img.src = img;
    _img.id = "front-img"
    book.appendChild(_img);

    //info
    const infoWrapper = document.createElement('div');
    infoWrapper.id = "info-wrapper";
    book.appendChild(infoWrapper);

    const _title = document.createElement('div');
    _title.id = "book-title";
    _title.innerHTML = `<h3>${title}</h3>`;
    infoWrapper.appendChild(_title);

    const _author = document.createElement('div');
    _author.id = "author";
    _author.innerHTML = `<p>${author}</p>`;
    infoWrapper.appendChild(_author);

    const _year = document.createElement('div');
    _year.id = "year";
    _year.innerHTML = `<p>${year}</p>`;;
    infoWrapper.appendChild(_year);

    //buttons
    const buttonWrapper = document.createElement('div');
    buttonWrapper.id = "button-wrapper";
    book.appendChild(buttonWrapper);

    const _edit = editButton.create(buttonWrapper);
    const _delete = deleteButton.create(buttonWrapper);

    _edit.addEventListener('click', function () {
        _store.setEditMode(true, 'edit', book.storeID);
        _render();
    });

    _delete.addEventListener('click', () => {
        _store.deleteBook(book.storeID);
        _render();
    });

    return book;
};