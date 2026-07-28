let dataNominal = JSON.parse(localStorage.getItem("nominal")) || [];

let area = document.getElementById("listHarga");


function tampilHarga(){

if(!area) return;


area.innerHTML="";


dataNominal.forEach(item=>{


if(item.game.toLowerCase()=="free fire"){


let harga =
Number(item.supplier)+Number(item.profit);



area.innerHTML += `

<div class="produk">


<h3>${item.produk}</h3>


<p>
Rp ${harga.toLocaleString("id-ID")}
</p>


<button onclick="checkout('${item.produk}', '${harga}')">

Top Up

</button>


</div>


`;


}


});


}


function checkout(produk,harga){


let pesan =
`Halo ARDZ STORE%0A
Saya ingin Top Up:%0A
Produk : ${produk}%0A
Harga : Rp ${harga}`;


window.open(
"https://wa.me/6282295071107?text="+pesan
);


}


tampilHarga();
