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

    if (isNaN(resistance) || isNaN(voltage) || resistance <= 0) {
        document.getElementById("wattageOutput").textContent = "出力ワット数: - W";
        return;
    }

    let wattage = (voltage * voltage) / resistance;
    document.getElementById("wattageOutput").textContent = `出力ワット数: ${wattage.toFixed(1)} W`;
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
    document.body.classList.toggle("light-theme");
    const themeIcon = document.getElementById("themeIcon");
    if (document.body.classList.contains("light-theme")) {
        themeIcon.textContent = "dark_mode";
        localStorage.setItem("theme", "light");
    } else {
        themeIcon.textContent = "light_mode";
        localStorage.setItem("theme", "dark");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        document.getElementById("themeIcon").textContent = "dark_mode";
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
    calculateWattage();
});

document.getElementById("resistance").addEventListener("input", (event) => {
    localStorage.setItem("resistance", event.target.value);
    calculateWattage();
});
document.getElementById("resistance").addEventListener("change", calculateWattage);
document.getElementById("voltage").addEventListener("input", (event) => {
    localStorage.setItem("voltage", event.target.value);
    calculateWattage();
});
document.getElementById("voltage").addEventListener("change", calculateWattage);