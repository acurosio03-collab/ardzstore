const products = JSON.parse(localStorage.getItem("products")) || [];

const container = document.getElementById("shop-products");

if (container) {
    container.innerHTML = "";

    products.forEach(item => {
        container.innerHTML += `
        <div class="game-card">
            <h3>${item.nama}</h3>
            <p>Harga: Rp ${item.harga}</p>
            <p>Status: ${item.status}</p>

            <a href="https://wa.me/6282295071107?text=Saya ingin topup ${item.nama}"
               class="buy-btn">
               Beli
            </a>
        </div>
        `;
    });
}
