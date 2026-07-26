let nominal = JSON.parse(localStorage.getItem("nominal")) || [];

const form = document.getElementById("nominalForm");

const list = document.getElementById("listNominal");

function tampilkan(){

list.innerHTML="";

nominal.forEach((item,index)=>{

const jual =
Number(item.supplier)+Number(item.profit);

list.innerHTML +=`

<div class="nominal-card">

<h3>${item.produk}</h3>

<p>Supplier : Rp ${item.supplier}</p>

<p>Profit : Rp ${item.profit}</p>

<h2>Harga Jual Rp ${jual}</h2>

<button onclick="hapus(${index})">

Hapus

</button>

</div>

`;

});

}

form.onsubmit=function(e){

e.preventDefault();

nominal.push({

produk:produk.value,

supplier:supplier.value,

profit:profit.value

});

localStorage.setItem("nominal",JSON.stringify(nominal));

tampilkan();

form.reset();

}

function hapus(index){

nominal.splice(index,1);

localStorage.setItem("nominal",JSON.stringify(nominal));

tampilkan();

}

tampilkan();
