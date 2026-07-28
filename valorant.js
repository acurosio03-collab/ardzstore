let dataNominal = JSON.parse(localStorage.getItem("nominal")) || [];

let list = document.getElementById("valorant-products");


function loadFF(){

if(!list) return;


list.innerHTML="";


dataNominal.forEach((item)=>{


let game =
item.game.toLowerCase().trim();


if(
game.includes("valorant") ||
game.includes("valorant")
){


let harga =
Number(item.supplier)+Number(item.profit);



list.innerHTML += `

<div class="produk-card">


<img src="diamond.png" class="icon-diamond">


<h3>${item.produk}</h3>


<p>
💎 Diamond valorant
</p>


<h2>
Rp ${harga.toLocaleString("id-ID")}
</h2>


<button onclick="
pilihProduk(
'${item.produk}',
'${harga}'
)
">

Pilih

</button>


</div>


`;

}


});


}



function pilihProduk(nama,harga){


document.getElementById("produk").innerHTML=nama;


document.getElementById("total").innerHTML=
"Rp "+Number(harga)
.toLocaleString("id-ID");


}



function checkoutvalorant(){


let produk=
document.getElementById("produk").innerHTML;


let total=
document.getElementById("total").innerHTML;


let id=
document.getElementById("userid").value;



let pesan=

`Halo ARDZ STORE

Game : valorant

ID :
${id}

Produk :
${produk}

Harga :
${total}`;



window.open(
"https://wa.me/6282295071107?text="+
encodeURIComponent(pesan)
);


}



loadFF();
