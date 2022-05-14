const columnDefs = [
    {
        field: 'Status',
        cellStyle: params => {
            if (params.value === 'Invalid') {
                return { color: 'red' };
            }
            if (params.value === 'Published') {
                return { color: 'green' };
            }
            if (params.value === 'Pending') {
                return { color: 'gray' };
            }
            return null;
        }
    },
    { field: 'Quote Number', minWidth: 180 },
    { field: 'Agreement Name', minWidth: 200, cellStyle: {color: 'blue'} },
    { field: 'Agreement Type', minWidth: 200 },
    { field: 'Distributor Name', minWidth: 200 },
    { field: 'Effective Date', minWidth: 200, type: ['dateColumn', 'nonEditableColumn'] },
    { field: 'Effective Date', minWidth: 200, type: ['dateColumn', 'nonEditableColumn'] },
    { field: 'Expiration Date', minWidth: 180, type: ['dateColumn', 'nonEditableColumn'] },
    { field: 'Create Date', minWidth: 200 },
    { field: 'Days Until Expiration', minWidth: 200, type: 'numberColumn' }
];

const gridOptions = {
    columnDefs: columnDefs,
    pagination: true,
    paginationPageSize: 25,
    defaultColDef: {
        flex: 1,
        minWidth: 100,
        enableValue: true,
        enableRowGroup: false,
        enablePivot: false,
        sortable: true,
        filter: true,
        editable: true,
        filter: 'agTextColumnFilter',
        floatingFilter: true,
        resizable: true,
    },
    sideBar: {
        toolPanels: [
            {
                id: 'columns',
                labelDefault: 'Columns',
                labelKey: 'columns',
                iconKey: 'columns',
                toolPanel: 'agColumnsToolPanel',
                toolPanelParams: {
                    suppressRowGroups: true,
                    suppressValues: true,
                }
            }
        ]
    },
    columnTypes: {
        numberColumn: { width: 130, filter: 'agNumberColumnFilter' },
        medalColumn: { width: 100, columnGroupShow: 'open', filter: false },
        nonEditableColumn: { editable: false },
        dateColumn: {
            filter: 'agDateColumnFilter',

            filterParams: {
                comparator: (filterLocalDateAtMidnight, cellValue) => {
                    const dateParts = cellValue.split('/');
                    const day = Number(dateParts[0]);
                    const month = Number(dateParts[1]) - 1;
                    const year = Number(dateParts[2]);
                    const cellDate = new Date(year, month, day);

                    if (cellDate < filterLocalDateAtMidnight) {
                        return -1;
                    } else if (cellDate > filterLocalDateAtMidnight) {
                        return 1;
                    } else {
                        return 0;
                    }
                },
            },
        },
    },
    rowData: null,
};



document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    fetch('../json/product.json')
        .then((response) => response.json())
        .then((data) => gridOptions.api.setRowData(data));
});
