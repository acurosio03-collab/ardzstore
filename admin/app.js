// ===============================
// ARDZ STORE - app.js
// ===============================

// Ambil data dari LocalStorage
let products = JSON.parse(localStorage.getItem("products")) || [];

// ===============================
// SIMPAN PRODUK
// ===============================
const form = document.getElementById("productForm");

if (form) {

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const nama = document.getElementById("nama").value;
        const harga = document.getElementById("harga").value;
        const status = document.getElementById("status").value;

        products.push({
            id: Date.now(),
            nama: nama,
            harga: harga,
            status: status
        });

        localStorage.setItem("products", JSON.stringify(products));

        alert("Produk berhasil ditambahkan!");

        window.location.href = "products.html";

    });

}

// ===============================
// TAMPILKAN PRODUK
// ===============================
const tbody = document.getElementById("product-list");

if (tbody) {

    tampilkanProduk();

}

function tampilkanProduk(){

    tbody.innerHTML = "";

    products.forEach((item,index)=>{

        tbody.innerHTML += `
        <tr>

            <td>${index+1}</td>

            <td>${item.nama}</td>

            <td>Rp ${item.harga}</td>

            <td>${item.status}</td>

            <td>

                <button onclick="editProduk(${item.id})">
                    Edit
                </button>

                <button onclick="hapusProduk(${item.id})">
                    Hapus
                </button>

            </td>

        </tr>
        `;

    });

}

// ===============================
// HAPUS PRODUK
// ===============================
function hapusProduk(id){

    if(confirm("Yakin ingin menghapus produk?")){

        products = products.filter(item => item.id !== id);

        localStorage.setItem("products", JSON.stringify(products));

        tampilkanProduk();

    }

}

// ===============================
// EDIT PRODUK
// ===============================
function editProduk(id){

    const produk = products.find(item => item.id === id);

    if(!produk) return;

    const namaBaru = prompt("Nama Game", produk.nama);

    if(namaBaru === null) return;

    const hargaBaru = prompt("Harga", produk.harga);

    if(hargaBaru === null) return;

    produk.nama = namaBaru;
    produk.harga = hargaBaru;

    localStorage.setItem("products", JSON.stringify(products));

    tampilkanProduk();

}
