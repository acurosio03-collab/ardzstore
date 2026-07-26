const nominal = JSON.parse(localStorage.getItem("nominal")) || [];

const container = document.getElementById("ml-products");

if(container){

container.innerHTML="";

const ml = nominal.filter(item=>item.game==="Mobile Legends");

if(ml.length===0){

container.innerHTML="<p>Belum ada nominal.</p>";

}else{

ml.forEach(item=>{

let harga=
Number(item.supplier)+
Number(item.margin);

container.innerHTML+=`

<div class="card">

<h3>${item.produk}</h3>

<p>${harga.toLocaleString("id-ID")}</p>

<button onclick="pilihNominal('${item.produk}',${harga})">

Pilih

</button>

</div>

`;

});

}

}

function pilihNominal(nama,harga){

alert(

"Nominal : "+nama+

"\nHarga : Rp "+harga.toLocaleString("id-ID")

);

}
