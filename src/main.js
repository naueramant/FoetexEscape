let autoInterval = null;

let store = "02273";
let magic = "009";

function render(value) {
    const settings = {
        renderer: "css",
        barWidth: 2,
        barHeight: 100,
        bgColor: "#fff",
        color: "#000"
    };

    $("#barcodeTarget").show().barcode(value, "int25", settings);
    $("#value").val(value);
}

function codeUpdate() {
    render($("#value").val());
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}

function getDate() {
    const date = new Date();

    var y = date.getFullYear().toString().slice(2, 4);
    var m = pad(date.getMonth() + 1, 2)
    var d = pad(date.getDate(), 2)

    return y + m + d
}

function generate() {
    loeb = randomInt(0, 9999);
    loeb = pad(loeb, 4);

    const value = store + getDate() + "009" + loeb;

    render(value);
}

function toggle() {
    if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
        $("#toggle").removeClass("active");
    } else {
        generate();
        $("#toggle").addClass("active");
        autoInterval = setInterval(() => {
            generate();
        }, 1000);
    }
}

function last() {
    render(store + getDate() + magic + "9999");
}

function first() {
    render(store + getDate() + magic + "0000");
}

generate();