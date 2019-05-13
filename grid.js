function grid(options) {

    displayGrid();
    displayNavigation();

    function displayNavigation() {
        let navigation = document.querySelector(options.elementNavigation)
        let switchButtons = options.columns
            .map(templateSwitchButton)
            .map(button=>navigation.appendChild(button));
    }

    function templateSwitchButton(columnData) {
        let button = document.createElement('button');
        button.innerText = `Switch ${columnData.name}`;
        button.addEventListener('click', () => switchColumn(columnData.name));
        return button;
    }

    function switchColumn(columnName) {
        let columnObject = options.columns.filter(column=>column.name === columnName)[0]
        columnObject.show = !columnObject.show;
        displayGrid();
    }

    function templateGrid() {
        let rows = options.data
            .map(templateRow)
            .join('');
        let tableColumns = options.columns
            .filter(column => column.show === true)
            .map(templateColumn)
            .join('');

        let tableColumnsHeaders = options.columns
            .filter(column => column.show === true)
            .map(templateColumnHeader)
            .join('');

        return `<table>
            <colgroup>
            ${tableColumns}
            </colgroup>
            <tr>
            ${tableColumnsHeaders}
            </tr>
            ${rows}
        </table>`;
    }

    function templateColumn(columnData) {
        return `<col class="column--${columnData}">`;
    }

    function templateColumnHeader(columnData) {
        return `<th scope="col">${columnData.name}</th>`;
    }

    function displayGrid() {
        let finalTemplate = templateGrid();
        document.querySelector(options.element).innerHTML = finalTemplate;
    }

    function templateRow(rowData) {
        let cells = options.columns
            .filter(column => column.show === true)
            .map(column => templateCell(column, rowData))
            .join('');

        return `<tr class="row--${rowData.id}">
            ${cells}
        </tr>`;
    }

    function templateCell(column, rowData) {
        return `<td class="column--${column.name}">${rowData[column.name]}</td>`
    }
}

function loadPeople() {
    return [
        {
            "id": 1,
            "fname": "Jan",
            "sname": "Kowalski",
            "birthdate": "2013-07-08",
            "sex": "M"
        },
        {
            "id": 2,
            "fname": "Jan",
            "sname": "Disney",
            "birthdate": "2008-04-30",
            "sex": "M"
        },
        {
            "id": 3,
            "fname": "Patryk",
            "sname": "Kowalski",
            "birthdate": "1977-03-11",
            "sex": "M"
        },
        {
            "id": 4,
            "fname": "Czesław",
            "sname": "Majtak",
            "birthdate": "1982-09-12",
            "sex": "M"
        },
        {
            "id": 5,
            "fname": "Walt",
            "sname": "Myszak",
            "birthdate": "1990-11-15",
            "sex": "W"
        },
        {
            "id": 6,
            "fname": "Jon",
            "sname": "Snow",
            "birthdate": "1992-07-02",
            "sex": "W"
        },
        {
            "id": 7,
            "fname": "Andrzej",
            "sname": "Kostecki",
            "birthdate": "2010-07-08",
            "sex": "M"
        }
    ]
}

function App() {
    const people = loadPeople();
    grid({
        data: people,
        columns: [
            {
                name: 'id',
                order: 0,
                show: true
            },
            {
                name: 'fname',
                order: 0,
                show: true
            },
            {
                name: 'sname',
                order: 0,
                show: true
            },
            {
                name: 'birthdate',
                order: 0,
                show: true
            },
            {
                name: 'sex',
                order: 0,
                show: true
            }
        ],
        element: '.grid--people',
        elementNavigation: '.navigation--people'
    })

    grid({
        element: '.grid--owoce',
        elementNavigation: '.navigation--owoce',
        columns: [
            {
                name: 'id',
                show: true
            },
            {
                name: 'name',
                show: true
            },
            {
                name: 'color',
                show: true
            },
            {
                name: 'robaki',
                show: true
            }
        ],
        data: [
            {
                id: 1,
                name: 'Jablko',
                color: 'czerwone',
                robaki: 7
            },
            {
                id: 2,
                name: 'Pomarancza',
                color: 'pomaranczowe',
                robaki: 3
            },
            {
                id: 3,
                name: 'Kiwi',
                color: 'Brazowo-zielone',
                robaki: 0
            }
        ]
    })
}

window.onload = App;
