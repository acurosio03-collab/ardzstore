// ==========================
// ARDZ STORE APP
// ==========================

let products = JSON.parse(localStorage.getItem("products")) || [];

// ==========================
// SIMPAN PRODUK
// ==========================
const form = document.getElementById("productForm");

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();

const nama=document.getElementById("nama").value;
const harga=document.getElementById("harga").value;
const status=document.getElementById("status").value;

products.push({

id:Date.now(),

nama:nama,

harga:harga,

status:status

});

localStorage.setItem("products",JSON.stringify(products));

alert("Produk berhasil ditambahkan!");

window.location.href="products.html";

});

}

// ==========================
// TAMPILKAN PRODUK
// ==========================

function loadProducts(){

const tbody=document.getElementById("product-list");

if(!tbody) return;

tbody.innerHTML="";

products.forEach((item,index)=>{

tbody.innerHTML+=`

<tr>

<td>${index+1}</td>

<td>${item.nama}</td>

<td>Rp ${item.harga}</td>

<td>${item.status}</td>

<td>

<button class="edit" onclick="editProduct(${item.id})">

Edit

</button>

<button class="delete" onclick="deleteProduct(${item.id})">

Hapus

</button>

</td>

</tr>

`;

});

}

loadProducts();

// ==========================
// HAPUS
// ==========================

function deleteProduct(id){

if(confirm("Hapus produk ini?")){

products=products.filter(item=>item.id!=id);

localStorage.setItem("products",JSON.stringify(products));

loadProducts();

}

}

// ==========================
// EDIT
// ==========================

function editProduct(id){

const data=products.find(item=>item.id==id);

if(!data) return;

const nama=prompt("Nama Game",data.nama);

if(nama===null) return;

const harga=prompt("Harga",data.harga);

if(harga===null) return;

const status=prompt("Status",data.status);

if(status===null) return;

data.nama=nama;
data.harga=harga;
data.status=status;

localStorage.setItem("products",JSON.stringify(products));

loadProducts();

}
