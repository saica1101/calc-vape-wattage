function validateInput() {
    let isValid = true;
    let resistance = parseFloat(document.getElementById("resistance").value);
    let voltage = parseFloat(document.getElementById("voltage").value);

    if (isNaN(resistance) || resistance <= 0) {
        document.getElementById("resistanceError").textContent = "有効な抵抗値を入力してください";
        document.getElementById("resistance").parentElement.classList.add("invalid");
        isValid = false;
    } else {
        document.getElementById("resistanceError").textContent = "";
        document.getElementById("resistance").parentElement.classList.remove("invalid");
    }

    if (isNaN(voltage) || voltage <= 0) {
        document.getElementById("voltageError").textContent = "有効なボルト数を入力してください";
        document.getElementById("voltage").parentElement.classList.add("invalid");
        isValid = false;
    } else {
        document.getElementById("voltageError").textContent = "";
        document.getElementById("voltage").parentElement.classList.remove("invalid");
    }

    return isValid;
}

function calculateWattage() {
    if (!validateInput()) {
        document.getElementById("wattageOutput").textContent = "出力ワット数: - W";
        return;
    }

    let resistance = parseFloat(document.getElementById("resistance").value);
    let voltage = parseFloat(document.getElementById("voltage").value);

    let wattage = (voltage * voltage) / resistance;
    const chk_decimal = document.querySelector("input[name='decimals']").checked ? 2 : 1;
    document.getElementById("wattageOutput").textContent = `出力ワット数: ${wattage.toFixed(chk_decimal)} W`;
}   

function clearFields() {
    document.getElementById("resistance").value = "";
    document.getElementById("resistanceError").textContent = "";
    document.getElementById("resistanceError").parentElement.classList.remove("invalid");
    document.getElementById("voltage").value = "3.8";
    document.getElementById("voltageError").textContent = "";
    document.getElementById("voltageError").parentElement.classList.remove("invalid");
    document.getElementById("wattageOutput").textContent = "出力ワット数: - W";
}

function toggleTheme() {
    const themeIcon = document.getElementById("themeIcon");
    const isLightTheme = document.body.classList.toggle("light-theme");

    if (isLightTheme) {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
        localStorage.setItem("theme", "light");
    } else {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
        localStorage.setItem("theme", "dark");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const themeIcon = document.getElementById("themeIcon");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    } else if (savedTheme === "dark") {
        document.body.classList.remove("light-theme");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    } else {
        // 初回ロード時のデフォルト設定
        localStorage.setItem("theme", "dark");
        document.body.classList.remove("light-theme");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }

    // 前回の入力値を復元
    const savedResistance = localStorage.getItem("resistance");
    const savedVoltage = localStorage.getItem("voltage");
    if (savedResistance) {
        document.getElementById("resistance").value = savedResistance;
    }
    if (savedVoltage) {
        document.getElementById("voltage").value = savedVoltage;
    }

    // チェックボックスの状態を復元
    const savedDecimals = localStorage.getItem("decimals");
    if (savedDecimals === "true") {
        document.querySelector("input[name='decimals']").checked = true;
    } else {
        document.querySelector("input[name='decimals']").checked = false;
    }

    calculateWattage();
});

document.getElementById("resistance").addEventListener("input", (event) => {
    if (validateInput()) {
        localStorage.setItem("resistance", event.target.value);
    }
    calculateWattage();
});

document.getElementById("voltage").addEventListener("input", (event) => {
    if (validateInput()) {
        localStorage.setItem("voltage", event.target.value);
    }
    calculateWattage();
});

document.querySelector("input[name='decimals']").addEventListener("change", (event) => {
    localStorage.setItem("decimals", event.target.checked);
    calculateWattage();
});