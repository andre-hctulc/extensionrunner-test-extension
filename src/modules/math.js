import Adapter from "extensionrunner/adapter";

const adapter = new Adapter({ provider: "", out: { add, substract, logArea } });

function add(a, b) {
    if (!Number.isInteger(a)) a = 0;
    if (!Number.isInteger(b)) b = 0;
    return a + b;
}

function substract(a, b) {
    if (!Number.isInteger(a)) a = 0;
    if (!Number.isInteger(b)) b = 0;
    return a - b;
}

let shape = "circle";

function logArea(width = 1) {
    let area;
    if (!Number.isInteger(width)) width = 1;
    switch (shape) {
        case "circle":
            area = Math.PI * width * width;
            break;
        case "square":
            area = width * width;
            break;
        case "rectangle":
            area = (width * width) / 2;
        default:
            area = "unknown area";
            break;
    }
    console.log("Area of", shape, "with width", width, ":", area);
}

adapter.addEventListener("shape_change", newShape => {
    shape = newShape;
    console.log("Shape changed to", newShape);
});
