const products = JSON.parse(localStorage.getItem("products")) || [];

const container = document.getElementById("shop-products");

if (container) {
    container.className = "game-list";
    container.innerHTML = "";

    products.forEach(item => {
        container.innerHTML += `
        <div class="card">
            <img src="logo.jpeg" alt="${item.nama}">
            <h3>${item.nama}</h3>
            <p>Rp ${item.harga}</p>
            <a href="https://wa.me/6282295071107?text=Halo, saya ingin top up ${item.nama}" class="buy-btn">
                BELI
            </a>
        </div>
        `;
    });
}
