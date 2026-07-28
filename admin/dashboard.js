let nominal =
JSON.parse(localStorage.getItem("nominal")) || [];

let orders =
JSON.parse(localStorage.getItem("orders")) || [];

document.getElementById("totalProduk").innerHTML =
nominal.length;

document.getElementById("totalOrder").innerHTML =
orders.length;

let pending =
orders.filter(x=>x.status=="Menunggu");

document.getElementById("pendingOrder").innerHTML =
pending.length;

let selesai =
orders.filter(x=>x.status=="Selesai");

document.getElementById("selesaiOrder").innerHTML =
selesai.length;

let aktivitas="";

orders.slice().reverse().slice(0,5).forEach(item=>{

aktivitas+=`

<div class="activity">

<b>${item.game}</b>

<br>

${item.produk}

<br>

<small>${item.waktu}</small>

</div>

`;

});

document.getElementById("aktivitas").innerHTML=
aktivitas || "Belum ada aktivitas.";
