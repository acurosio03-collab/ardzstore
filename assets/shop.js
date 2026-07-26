// ================================
// ARDZ STORE - SHOP
// ================================

const products = JSON.parse(localStorage.getItem("products")) || [];

const container = document.getElementById("shop-products");

if (container) {

    container.innerHTML = "";

    if(products.length===0){

        container.innerHTML=`
        <p style="text-align:center;color:white;">
        Belum ada produk terbaru.
        </p>
        `;

    }else{

        products.forEach(item=>{
console.log(item);
            container.innerHTML+=`

            <div class="card">

            <img src="${item.gambar}"
     alt="${item.nama}"
     style="width:100%; height:180px; object-fit:cover; border-radius:10px;">


                <h3>${item.nama}</h3>

                <p>💰 Rp ${item.harga}</p>

                <p style="color:#00ff99;">
                ${item.status}
                </p>

                <a class="buy-btn"
                href="https://wa.me/6282295071107?text=Halo Admin ARDZ STORE,%0ASaya ingin top up:%0A🎮 ${item.nama}%0A💰 Rp ${item.harga}">
                BELI SEKARANG
                </a>

            </div>

            `;

        });

    }

}
