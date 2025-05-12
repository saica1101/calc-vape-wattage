let smoke = document.getElementById("smoke");

// スモークエフェクトの作成処理を最適化
function createSmoke(e) {
    const elem = document.createElement("div");
    elem.className = "elem"; // classList.addを簡略化

    elem.style.left = `${e.clientX}px`;
    elem.style.top = `${e.clientY}px`;
    smoke.appendChild(elem);

    // アニメーション終了時に要素を削除
    elem.onanimationend = () => elem.remove();
}

// イベントリスナーの登録
function setupSmokeEffect() {
    document.addEventListener("mousemove", createSmoke);
}

setupSmokeEffect();