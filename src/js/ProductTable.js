const columnDefs = [
    { field: 'Status' },
    { field: 'Quote Number', minWidth: 180 },
    { field: 'Agreement Name', minWidth: 200 },
    { field: 'Agreement Type', minWidth: 200 },
    { field: 'Distributor Name', minWidth: 200 },
    { field: 'Effective Date', minWidth: 200 },
    { field: 'Effective Date', minWidth: 200 },
    { field: 'Expiration Date', minWidth: 180 },
    { field: 'Create Date', minWidth: 200 },
    { field: 'Days Until Expiration', minWidth: 200 }
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
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    fetch('../json/product.json')
        .then((response) => response.json())
        .then((data) => gridOptions.api.setRowData(data));
});
