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
document.addEventListener("DOMContentLoaded", function () {

    const addBtn = document.getElementById("addProduct");

    if (addBtn) {
        addBtn.addEventListener("click", function () {
            alert("Fitur tambah produk akan dibuat pada langkah berikutnya.");
        });
    }

    document.querySelectorAll(".edit").forEach(btn => {
        btn.addEventListener("click", function () {
            alert("Edit produk.");
        });
    });

    document.querySelectorAll(".delete").forEach(btn => {
        btn.addEventListener("click", function () {
            if (confirm("Yakin ingin menghapus produk?")) {
                this.closest("tr").remove();
            }
        });
    });

});
const addProduct = document.getElementById("addProduct");

if (addProduct) {
    addProduct.addEventListener("click", function () {

        const nama = prompt("Nama Game:");
        if (!nama) return;

        const harga = prompt("Harga:");
        if (!harga) return;

        const tbody = document.querySelector("tbody");

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${tbody.rows.length + 1}</td>
            <td>${nama}</td>
            <td>Rp${harga}</td>
            <td>Aktif</td>
            <td>
                <button class="edit">Edit</button>
                <button class="delete">Hapus</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}
document.getElementById("addProduct").onclick = function () {
    alert("Tombol berhasil diklik!");
};
const form = document.getElementById("productForm");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const nama = document.getElementById("nama").value;
        const harga = document.getElementById("harga").value;
        const status = document.getElementById("status").value;

        let products = JSON.parse(localStorage.getItem("products")) || [];

        products.push({
            nama: nama,
            harga: harga,
            status: status
        });

        localStorage.setItem("products", JSON.stringify(products));

        alert("Produk berhasil ditambahkan!");

        window.location.href = "products.html";
    });
}
