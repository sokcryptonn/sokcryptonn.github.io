const HEADER_DIRECTION = "flip";

function createIconPrinterFromMap(map) {
    var printer = function (cell, formatterParams) {
        var key = cell.getValue()
        var iconHTML = "";

        if (!(key in map)) {
            key = "[default]";
        }
        iconHTML = map[key];

        return iconHTML;
    };
    return printer;
}

privacyServiceMap = {
    "Oblivious Inference": "▽",
    "Outsourced Inference": "▼",
    "Outsourced Training": "▢",
    "Private Training": "◾",
    "[default]": "-",
}

fullHalfMap = {
    "[full]": "⬤",
    "[half]": "◐",
    "[default]": "◯",
}

fullHalfFormatter = createIconPrinterFromMap(fullHalfMap)

var bitwidthFormatter = function (cell) {
    var cellValue = cell.getValue();

    num = Number(cellValue)
    if (!isNaN(num)) {
        if (num >= 32) {
            label = `H (${num})`;
        } else {
            label = `L (${num})`;
        }
    } else {
        label = cellValue;
    }

    return label;
}

var nullFiller = function (cell) {
    var cellValue = cell.getValue();
    if (cellValue === null) {
        return '-'
    } else {
        return cellValue;
    }
}

function customHeaderFormatter(cell) {
    var value = cell.getValue();
    var rotationAngle = 45; // Set the desired rotation angle in degrees
    return "<div style='transform: rotate(" + rotationAngle + "deg)'>" + value + "</div>";
}

var table = new Tabulator("#example-table", {
    headerSortElement: function (column, dir) {
        switch (dir) {
            case "asc":
                return "<i class='fas fa-sort-up'>";
                break;
            case "desc":
                return "<i class='fas fa-sort-down'>";
                break;
            default:
                return "<i class='fas fa-sort'>";
        }
    },

    // pagination: "local",
    // paginationSize: 20,
    // paginationSizeSelector: [3, 6, 8, 10],


    // height: "90vh",
    // data: tableData, //assign data to table
    // theme: "site",
    resizableColumns: true,
    movableColumns: true,
    movableRows: true,
    layout: "fitColumns",
    groupBy: "Major Apporach",
    // groupValues:[["green", "blue", "purple"]],
    columns: [
        { title: "Framework", field: "Framework", width: 150 },
        {
            title: "Basic Info.",
            columns: [
                {
                    title: "Year", field: "Debut Year", hozAlign: "center", sorter: "number",
                    width: 60, headerVertical: HEADER_DIRECTION
                },
                {
                    title: "Privacy Service", field: "Trainin\/Inferece Setting",
                    sorter: "string", hozAlign: "center",
                    formatter: createIconPrinterFromMap(privacyServiceMap),
                    headerVertical: HEADER_DIRECTION, maxWidth: 30,
                },
            ],
        },
        {
            title: "Fixed-Point Arithmetic",
            columns: [
                {
                    title: "Trunc. & Wrap", field: "Trunc & Wrap", formatter: fullHalfFormatter,
                    sorter: "string", hozAlign: "center",
                    headerVertical: HEADER_DIRECTION, maxWidth: 30,
                },
                {
                    title: "B/QNN", field: "B/QNN", formatter: nullFiller,
                    sorter: "string", hozAlign: "center",
                    headerVertical: HEADER_DIRECTION, maxWidth: 30,
                },
                {
                    title: "Bitwidth", field: "Bitwidth", formatter: bitwidthFormatter,
                    sorter: "string", hozAlign: "left", width: 60,
                    headerVertical: HEADER_DIRECTION, 
                },
            ],
        },
        {
            title: "Non-Linear Operation",
            columns: [
                {
                    title: "Poly. Approx.", field: " Poly. Approx.", formatter: fullHalfFormatter,
                    sorter: "string", hozAlign: "center",
                    headerVertical: HEADER_DIRECTION, maxWidth: 30,
                },
                {
                    title: "CMP", field: "CMP", formatter: fullHalfFormatter,
                    sorter: "string", hozAlign: "center",
                    headerVertical: HEADER_DIRECTION, maxWidth: 30,
                },
                {
                    title: "Num. Method", field: "Numerical Method", formatter: nullFiller,
                    sorter: "string", hozAlign: "center",
                    headerVertical: HEADER_DIRECTION, maxWidth: 30,
                },
            ],
        },
        {
            title: "Optimization",
            columns: [
                {
                    title: "Offline/Online", field: "Offline/Online", formatter: fullHalfFormatter,
                    sorter: "string", hozAlign: "center",
                    headerVertical: HEADER_DIRECTION, maxWidth: 30,
                },
                {
                    title: "HE SIMD", field: "HE SIMD", formatter: fullHalfFormatter,
                    sorter: "string", hozAlign: "center",
                    headerVertical: HEADER_DIRECTION, maxWidth: 30,
                },
                {
                    title: "Dynamic Weight", field: "Dynamic Weight", formatter: fullHalfFormatter,
                    sorter: "string", hozAlign: "center",
                    headerVertical: HEADER_DIRECTION, maxWidth: 30,
                },
                {
                    title: "GPU", field: "GPU", formatter: fullHalfFormatter,
                    sorter: "string", hozAlign: "center",
                    headerVertical: HEADER_DIRECTION, maxWidth: 30,
                },
                {
                    title: "Optimize Arch.", field: "Optimize Architecture", formatter: fullHalfFormatter,
                    sorter: "string", hozAlign: "center",
                    headerVertical: HEADER_DIRECTION, maxWidth: 30,
                },
                {
                    title: "Compiler", field: "Compiler", formatter: fullHalfFormatter,
                    sorter: "string", hozAlign: "center",
                    headerVertical: HEADER_DIRECTION, maxWidth: 30,
                },
            ],
        },
        {
            title: "Datasets",
            columns: [
                {
                    title: "MNIST", field: "MNIST", formatter: fullHalfFormatter,
                    sorter: "string", hozAlign: "center",
                    headerVertical: HEADER_DIRECTION, maxWidth: 30,
                },
                {
                    title: "CIFAR-10", field: "CIFAR-10", formatter: fullHalfFormatter,
                    sorter: "string", hozAlign: "center",
                    headerVertical: HEADER_DIRECTION, maxWidth: 30,
                },
                {
                    title: "CIFAR-100", field: "CIFAR-100", formatter: fullHalfFormatter,
                    sorter: "string", hozAlign: "center",
                    headerVertical: HEADER_DIRECTION, maxWidth: 30,
                },
                {
                    title: "ImageNet", field: "ImageNet", formatter: fullHalfFormatter,
                    sorter: "string", hozAlign: "center",
                    headerVertical: HEADER_DIRECTION, maxWidth: 30,
                },
            ],
        },
        {
            title: "Crypto Tools",
            columns: [
                {
                    title: "GMW", field: "GMW", formatter: fullHalfFormatter,
                    sorter: "string", hozAlign: "center",
                    headerVertical: HEADER_DIRECTION, maxWidth: 30,
                },
                {
                    title: "GC", field: "GC", formatter: fullHalfFormatter,
                    sorter: "string", hozAlign: "center",
                    headerVertical: HEADER_DIRECTION, maxWidth: 30,
                },
                {
                    title: "SS", field: "SS", formatter: fullHalfFormatter,
                    sorter: "string", hozAlign: "center",
                    headerVertical: HEADER_DIRECTION, maxWidth: 30,
                },
                {
                    title: "HE", field: "HE", formatter: nullFiller,
                    sorter: "string", hozAlign: "center",
                    headerVertical: HEADER_DIRECTION, maxWidth: 30,
                },
            ],
        },
    ]
});

window.onload = function () {
    table.setData(feature_arr);
};

// tableData = fetch('feature.json').then(response => response.json()).then(data => { table.setData(data) })