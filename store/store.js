//store
class Store {

    _books = [
        {
            name: "Сила JavaScript. 68 способов эффективного использования JS.",
            author: "Дэвид Херман.",
            year: '2013',
            img: './assets/sila-js.jpg',
            id: 0
        },
        {
            name: "Гарри Поттер и философский камень.",
            author: "Джоан Роулинг.",
            year: '1997',
            img: './assets/harry-potter.webp',
            id: 1
        },
        {
            name: "Танец с драконами.",
            author: "Джордж Рэймонд Ричард Мартин.",
            year: '2011',
            img: './assets/A_Dance_with_Dragons.jpg',
            id: 2
        }
    ];
    _img = './assets/undefined.svg';
    _currentTarget = null;
    _editMode = false;
    _type = ''; //тип формы

    setEditMode = (boolean, type, id) => {
        this._editMode = boolean;
        this._currentTarget = id;
        this._type = type;
    }

    getFormType = () => this._type;

    getDefaultImg = () => this._img;

    getEditMode = () => this._editMode;

    getBooks = () => this._books;

    addBook = book => {
        book.id = this._books.length;
        this._books = [...this._books, book];
    }

    editBook = book => {
        const { name, author, year, img, id } = book;

        const target = this._books.find((i, indx) => {
            return indx === this._currentTarget;
        })

        target.name = name;
        target.author = author;
        target.year = year;
        target.img = img;
    }

    deleteBook = id => {
        this._books.splice(id, 1);
    }
}
