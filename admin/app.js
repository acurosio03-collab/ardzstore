// ===== ARDZ STORE APP =====

// Ambil data produk dari LocalStorage
let products = JSON.parse(localStorage.getItem("products")) || [];

// Simpan ke LocalStorage
function saveProducts(){
    localStorage.setItem("products", JSON.stringify(products));
}

// Tambah Produk
function tambahProduk(nama, harga, status){

    products.push({
        id: Date.now(),
        nama: nama,
        harga: harga,
        status: status
    });

    saveProducts();

}

// Hapus Produk
function hapusProduk(id){

    products = products.filter(item => item.id != id);

    saveProducts();

    location.reload();

}

// Tampilkan Produk
function tampilkanProduk(){

    let tbody = document.getElementById("product-list");

    if(!tbody) return;

    tbody.innerHTML = "";

    products.forEach((item,index)=>{

        tbody.innerHTML += `
        <tr>

        <td>${index+1}</td>

        <td>${item.nama}</td>

        <td>Rp ${item.harga}</td>

        <td>${item.status}</td>

        <td>

        <button onclick="hapusProduk(${item.id})">
        Hapus
        </button>

        </td>

        </tr>
        `;

    });

}

document.addEventListener("DOMContentLoaded",()=>{

    tampilkanProduk();

});
