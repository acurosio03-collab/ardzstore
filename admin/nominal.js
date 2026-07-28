// ==================================
// ARDZ STORE - NOMINAL ADMIN JS
// ==================================


let dataNominal =
JSON.parse(localStorage.getItem("nominal")) || [];


let editIndex = -1;


// ==================================
// FORMAT RUPIAH
// ==================================

function rupiah(angka){

    return "Rp " + Number(angka)
    .toLocaleString("id-ID");

}



// ==================================
// BUKA MODAL
// ==================================

function bukaModal(index = -1){


    document.getElementById("modalNominal")
    .style.display = "flex";


    editIndex = index;



    if(index >= 0){


        let item = dataNominal[index];


        document.getElementById("judulModal")
        .innerHTML = "Edit Nominal";


        document.getElementById("game").value =
        item.game;


        document.getElementById("produk").value =
        item.produk;


        document.getElementById("supplier").value =
        item.supplier;


        document.getElementById("profit").value =
        item.profit;



    }else{


        document.getElementById("judulModal")
        .innerHTML = "Tambah Nominal";


        document.getElementById("game").value="";
        document.getElementById("produk").value="";
        document.getElementById("supplier").value="";
        document.getElementById("profit").value="";


    }


}




// ==================================
// TUTUP MODAL
// ==================================

function tutupModal(){

    document.getElementById("modalNominal")
    .style.display="none";


    editIndex=-1;

}



// ==================================
// SIMPAN NOMINAL
// ==================================

function simpanNominal(){


    let game =
    document.getElementById("game").value;


    let produk =
    document.getElementById("produk").value;


    let supplier =
    Number(document.getElementById("supplier").value);


    let profit =
    Number(document.getElementById("profit").value);



    if(game=="" || produk==""){

        alert("Game dan produk wajib diisi!");

        return;

    }



    let data = {


        game:game,

        produk:produk,

        supplier:supplier,

        profit:profit


    };




    // tambah

    if(editIndex == -1){


        dataNominal.push(data);


    }

    // edit

    else{


        dataNominal[editIndex]=data;


    }





    localStorage.setItem(
        "nominal",
        JSON.stringify(dataNominal)
    );



    tampilkan();


    tutupModal();



}




// ==================================
// TAMPILKAN DATA
// ==================================

function tampilkan(data=dataNominal){



    let area =
    document.getElementById("tableNominal");



    if(!area) return;




    if(data.length==0){


        area.innerHTML =
        "<p>Belum ada nominal.</p>";


        return;


    }





    let html = `


<table>


<tr>

<th>Game</th>

<th>Produk</th>

<th>Supplier</th>

<th>Profit</th>

<th>Harga Jual</th>

<th>Aksi</th>


</tr>


`;





    data.forEach((item,index)=>{


        let harga =
        Number(item.supplier)
        +
        Number(item.profit);





        html += `


<tr>


<td>${item.game}</td>


<td>${item.produk}</td>


<td>${rupiah(item.supplier)}</td>


<td>${rupiah(item.profit)}</td>


<td>

<b>${rupiah(harga)}</b>

</td>



<td>


<button
class="btn-edit"
onclick="bukaModal(${index})">

✏ Edit

</button>



<button
class="btn-delete"
onclick="hapusNominal(${index})">

🗑 Hapus

</button>



</td>


</tr>


`;



});



html += "</table>";



area.innerHTML = html;



}




// ==================================
// HAPUS
// ==================================

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





// ==================================
// CARI PRODUK
// ==================================

function cariProduk(){


let keyword =
document.getElementById("search")
.value
.toLowerCase();



let hasil =
dataNominal.filter(item=>{


return (

item.game.toLowerCase()
.includes(keyword)


||

item.produk.toLowerCase()
.includes(keyword)


);


});



tampilkan(hasil);



}





// ==================================
// FILTER GAME
// ==================================

function filterGame(){



let game =
document.getElementById("filterGame")
.value;



if(game=="Semua"){


    tampilkan();


    return;

}



let hasil =
dataNominal.filter(item=>{


return item.game == game;


});



tampilkan(hasil);



}





// ==================================
// LOAD AWAL
// ==================================

tampilkan();
