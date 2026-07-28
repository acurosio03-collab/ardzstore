// ===============================
// ARDZ STORE - NOMINAL JS
// ===============================

let dataNominal = JSON.parse(localStorage.getItem("nominal")) || [];

let editIndex = -1;


// tampilkan data
function tampilkan(){

    let area = document.getElementById("tableNominal");

    if(!area) return;

    area.innerHTML = "";

    dataNominal.forEach((item,index)=>{

        area.innerHTML += `

        <div class="nominal-card">

        <b>${item.game}</b><br>

        ${item.produk}<br>

        Supplier : Rp ${rupiah(item.supplier)}<br>

        Profit : Rp ${rupiah(item.profit)}<br>

        Harga Jual :
        <b>Rp ${rupiah(Number(item.supplier)+Number(item.profit))}</b>

        <br><br>

        <button onclick="editNominal(${index})">
        ✏️ Edit
        </button>

        <button onclick="hapusNominal(${index})">
        🗑 Hapus
        </button>

        </div>

        `;

    });

}


// buka modal
function bukaModal(){

    document.getElementById("modalNominal").style.display="block";

    editIndex=-1;

    document.getElementById("judulModal").innerHTML=
    "Tambah Nominal";


    document.getElementById("game").value="";
    document.getElementById("produk").value="";
    document.getElementById("supplier").value="";
    document.getElementById("profit").value="";

}



// tutup modal
function tutupModal(){

document.getElementById("modalNominal").style.display="none";

}



// simpan data
function simpanNominal(){


let data={

game:document.getElementById("game").value,

produk:document.getElementById("produk").value,

supplier:document.getElementById("supplier").value,

profit:document.getElementById("profit").value

};



if(editIndex==-1){

dataNominal.push(data);

}else{

dataNominal[editIndex]=data;

}


localStorage.setItem(
"nominal",
JSON.stringify(dataNominal)
);


tutupModal();

tampilkan();


}



// edit
function editNominal(index){

editIndex=index;


let d=dataNominal[index];


document.getElementById("game").value=d.game;

document.getElementById("produk").value=d.produk;

document.getElementById("supplier").value=d.supplier;

document.getElementById("profit").value=d.profit;


document.getElementById("judulModal").innerHTML=
"Edit Nominal";


document.getElementById("modalNominal").style.display="block";


}



// hapus
function hapusNominal(index){


if(confirm("Hapus produk ini?")){


dataNominal.splice(index,1);


localStorage.setItem(
"nominal",
JSON.stringify(dataNominal)
);


tampilkan();


}


}



// format rupiah
function rupiah(angka){

return Number(angka)
.toLocaleString("id-ID");

}



// pencarian
function cariProduk(){

let key=document.getElementById("search").value.toLowerCase();


let card=document.querySelectorAll(".nominal-card");


card.forEach(c=>{

c.style.display=
c.innerText.toLowerCase().includes(key)
?"block":"none";


});

}



// filter game
function filterGame(){

let game=document.getElementById("filterGame").value;


let card=document.querySelectorAll(".nominal-card");


card.forEach(c=>{


if(game=="Semua"){

c.style.display="block";

}else{


c.style.display=
c.innerText.includes(game)
?"block":"none";


}


});


}



// jalankan saat halaman buka
tampilkan();
