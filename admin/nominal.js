// ===============================
// ARDZ STORE - NOMINAL.JS
// ===============================

// Ambil data
let dataNominal = JSON.parse(localStorage.getItem("nominal")) || [];

// Format Rupiah
function formatRupiah(angka){
    return "Rp " + Number(angka).toLocaleString("id-ID");
}

// ===============================
// TAMBAH NOMINAL
// ===============================

const form = document.getElementById("nominalForm");

if(form){

    form.addEventListener("submit",function(e){

        e.preventDefault();

        const game = document.getElementById("game").value;
        const produk = document.getElementById("produk").value;
        const supplier = Number(document.getElementById("supplier").value);
        const profit = Number(document.getElementById("profit").value);

        dataNominal.push({
            game,
            produk,
            supplier,
            profit
        });

        localStorage.setItem("nominal",JSON.stringify(dataNominal));

        alert("Nominal berhasil ditambahkan!");

        form.reset();

    });

}

// ===============================
// TAMPILKAN DATA
// ===============================

function tampilkan(){

    const list = document.getElementById("listNominal");

    if(!list) return;

    dataNominal = JSON.parse(localStorage.getItem("nominal")) || [];

    list.innerHTML = "";

    if(dataNominal.length==0){

        list.innerHTML="<p>Belum ada nominal.</p>";

        return;

    }

    dataNominal.forEach((item,index)=>{

        const hargaJual =
        Number(item.supplier)+Number(item.profit);

        list.innerHTML += `

<div class="card">

<h3>${item.game}</h3>

<p><b>${item.produk}</b></p>

<p>Harga Supplier : ${formatRupiah(item.supplier)}</p>

<p>Profit : ${formatRupiah(item.profit)}</p>

<h2>${formatRupiah(hargaJual)}</h2>

<button onclick="editNominal(${index})">
✏️ Edit
</button>

<button onclick="hapus(${index})">
🗑 Hapus
</button>

</div>

`;

    });

}

// ===============================
// EDIT NOMINAL
// ===============================

function editNominal(index){

    dataNominal = JSON.parse(localStorage.getItem("nominal")) || [];

    let item = dataNominal[index];

    let game = prompt("Game",item.game);
    if(game===null) return;

    let produk = prompt("Nama Produk",item.produk);
    if(produk===null) return;

    let supplier = prompt("Harga Supplier",item.supplier);
    if(supplier===null) return;

    let profit = prompt("Profit",item.profit);
    if(profit===null) return;

    dataNominal[index]={
        game:game,
        produk:produk,
        supplier:Number(supplier),
        profit:Number(profit)
