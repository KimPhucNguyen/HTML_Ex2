const columnDefs = [
    {
        field: 'Status', minWidth: 150,
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
        },
        cellRenderer: params => {
            if (params.value === 'Invalid') {
                return params.value + ' <span><i class="fa fa-square-plus"></i></span>';
            }
            if (params.value === 'Published') {
                return params.value + ' <span><i class="fa-solid fa-square-check"></i></span>';
            }
            if (params.value === 'Pending') {
                return params.value + ' <span><i class="fa-solid fa-circle-minus"></i></span>';
            }
            return null;
        }, headerClass: 'header-custom-ag'
    },
    { field: 'Quote Number', minWidth: 180, headerClass: 'header-custom-ag' },
    { field: 'Agreement Name', minWidth: 200, cellStyle: { color: 'blue' }, headerClass: 'header-custom-ag' },
    { field: 'Agreement Type', minWidth: 200, headerClass: 'header-custom-ag' },
    { field: 'Distributor Name', minWidth: 200, headerClass: 'header-custom-ag' },
    { field: 'Effective Date', minWidth: 200, type: ['dateColumn', 'nonEditableColumn'], headerClass: 'header-custom-ag' },
    { field: 'Effective Date', minWidth: 200, type: ['dateColumn', 'nonEditableColumn'], headerClass: 'header-custom-ag' },
    { field: 'Expiration Date', minWidth: 180, type: ['dateColumn', 'nonEditableColumn'], headerClass: 'header-custom-ag' },
    { field: 'Create Date', minWidth: 200, headerClass: 'header-custom-ag' },
    { field: 'Days Until Expiration', minWidth: 200, type: 'numberColumn', headerClass: 'header-custom-ag' }
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

    fetch('../../product.json')
        .then((response) => response.json())
        .then((data) => gridOptions.api.setRowData(data));
});
