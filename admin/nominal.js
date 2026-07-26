// Ambil data dari localStorage
let dataNominal = JSON.parse(localStorage.getItem("nominal")) || [];

// ======================
// FORMAT RUPIAH
// ======================
function formatRupiah(angka){
    return "Rp " + Number(angka).toLocaleString("id-ID");
}

// ======================
// SIMPAN NOMINAL
// ======================
const form = document.getElementById("nominalForm");

if(form){

    form.addEventListener("submit", function(e){

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

        localStorage.setItem("nominal", JSON.stringify(dataNominal));

console.log("Data tersimpan:", localStorage.getItem("nominal"));

alert("Nominal berhasil ditambahkan!");

        form.reset();

    });

}

// ======================
// TAMPILKAN DATA
// ======================
function tampilkan(){

    const list = document.getElementById("listNominal");

    if(!list) return;

    list.innerHTML = "";

    if(dataNominal.length == 0){

        list.innerHTML = "<p>Belum ada nominal.</p>";

        return;

    }

    dataNominal.forEach((item,index)=>{

        const hargaJual = item.supplier + item.profit;

        list.innerHTML += `
        <div class="card">

            <h3>${item.game}</h3>

            <p><b>${item.produk}</b></p>

            <p>Supplier : ${formatRupiah(item.supplier)}</p>

            <p>Profit : ${formatRupiah(item.profit)}</p>

            <h2>${formatRupiah(hargaJual)}</h2>

            <button onclick="hapus(${index})">
                Hapus
            </button>

        </div>
        `;

    });

}

// ======================
// HAPUS DATA
// ======================
function hapus(index){

    if(confirm("Hapus nominal ini?")){

        dataNominal.splice(index,1);

        localStorage.setItem("nominal", JSON.stringify(dataNominal));

        tampilkan();

    }

}

// Jalankan saat membuka list
tampilkan();
