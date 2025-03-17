function calculateWattage() {
    let resistance = parseFloat(document.getElementById("resistance").value);
    let voltage = parseFloat(document.getElementById("voltage").value);

    if (isNaN(resistance) || isNaN(voltage) || resistance <= 0) {
        document.getElementById("wattageOutput").textContent = "正しい値を入力してください";
        return;
    }

    if (resistance <= 0 || voltage <= 0) {
        document.getElementById("wattageOutput").textContent = "抵抗値とボルト数は正の数である必要があります";
        return;
    }

    let wattage = (voltage * voltage) / resistance;
    document.getElementById("wattageOutput").textContent = `出力ワット数: ${wattage.toFixed(1)} W`;
}

function clearFields() {
    document.getElementById("resistance").value = "";
    document.getElementById("voltage").value = "3.8";
    document.getElementById("wattageOutput").textContent = "";
}

function toggleTheme() {
    document.body.classList.toggle("light-theme");
    const themeIcon = document.getElementById("themeIcon");
    if (document.body.classList.contains("light-theme")) {
        themeIcon.textContent = "dark_mode";
    } else {
        themeIcon.textContent = "light_mode";
    }
}

document.getElementById("resistance").addEventListener("input", calculateWattage);
document.getElementById("voltage").addEventListener("input", calculateWattage);