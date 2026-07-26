let dataNominal = JSON.parse(localStorage.getItem("nominal")) || [];

const form = document.getElementById("nominalForm");
const list = document.getElementById("listNominal");

function formatRupiah(angka){
    return "Rp " + Number(angka).toLocaleString("id-ID");
}

function tampilkan(){

    list.innerHTML="";

    if(dataNominal.length===0){
        list.innerHTML="<p>Belum ada data nominal.</p>";
        return;
    }

    dataNominal.forEach((item,index)=>{

        let hargaJual =
        Number(item.supplier)+Number(item.margin);

        list.innerHTML+=`

<div class="nominal-card">

<h3>${item.game}</h3>

<b>${item.produk}</b>

<p>Supplier : ${formatRupiah(item.supplier)}</p>

<p>Margin : ${formatRupiah(item.margin)}</p>

<h2>${formatRupiah(hargaJual)}</h2>

<button onclick="hapus(${index})">
🗑 Hapus
</button>

</div>

`;

    });

}

form.addEventListener("submit",function(e){

e.preventDefault();

const game=document.getElementById("game").value;
const produk=document.getElementById("produk").value;
const supplier=document.getElementById("supplier").value;
const margin=document.getElementById("profit").value;

dataNominal.push({

game,
produk,
supplier,
margin

});

localStorage.setItem("nominal", JSON.stringify(dataNominal));

form.reset();

tampilkan();

alert("Nominal berhasil disimpan!");

});

function hapus(index){

dataNominal.splice(index,1);

localStorage.setItem("nominal",JSON.stringify(dataNominal));

tampilkan();

}

tampilkan();
function tambahNominal(){

    let data = JSON.parse(localStorage.getItem("nominal")) || [];

    let nama = document.getElementById("nama").value;
    let harga = document.getElementById("harga").value;

    data.push({
        id: Date.now(),
        nama: nama,
        harga: harga
    });

    localStorage.setItem("nominal", JSON.stringify(data));

    alert("Nominal berhasil ditambahkan");

    location.reload();
}
function tampilNominal() {
    let data = JSON.parse(localStorage.getItem("nominal")) || [];

    let html = "";

    data.forEach((item, index) => {
        html += `
        <div class="card">
            <h3>${item.nama}</h3>
            <p>Rp ${Number(item.harga).toLocaleString("id-ID")}</p>

            <button onclick="editNominal(${index})">Edit</button>
            <button onclick="hapusNominal(${index})">Hapus</button>
        </div>
        `;
    });

    document.getElementById("listNominal").innerHTML = html;
}
