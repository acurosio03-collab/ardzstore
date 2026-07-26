const data = JSON.parse(localStorage.getItem("nominalFF")) || [];

const container = document.getElementById("ff-products");

if (container) {

    if (data.length === 0) {

        container.innerHTML = `
            <p style="color:white;text-align:center;">
                Belum ada nominal Free Fire.
            </p>
        `;

    } else {

        data.forEach(item => {

            container.innerHTML += `
                <div class="card"
                     onclick="pilihProduk('${item.nama}', ${item.harga})">

                    <h3>${item.nama}</h3>

                    <p>Rp ${Number(item.harga).toLocaleString("id-ID")}</p>

                </div>
            `;

        });

    }

}
