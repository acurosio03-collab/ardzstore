// ===============================
// ARDZ STORE - ORDERS.JS
// ===============================

// Ambil semua pesanan
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Format Rupiah
function rupiah(angka){
    return "Rp " + Number(angka).toLocaleString("id-ID");
}

// Tampilkan semua pesanan
function tampilkanOrders(){

    const list = document.getElementById("ordersList");

    if(!list) return;

    list.innerHTML = "";

    if(orders.length === 0){

        list.innerHTML = "<p>Belum ada pesanan.</p>";

        return;

    }

    orders.forEach((item,index)=>{

        list.innerHTML += `

<div class="card">

<h3>${item.game}</h3>

<p><b>User ID :</b> ${item.userid}</p>

${item.zoneid ? `<p><b>Zone ID :</b> ${item.zoneid}</p>` : ""}

<p><b>Produk :</b> ${item.produk}</p>

<p><b>Total :</b> ${rupiah(item.total)}</p>

<p><b>Pembayaran :</b> ${item.payment}</p>

<p><b>WhatsApp :</b> ${item.wa}</p>

<p><b>Status :</b>

<span id="status${index}">
${item.status}
</span>

</p>

<button class="btn"
onclick="lihatDetail(${index})">

👁 Detail

</button>

<button class="btn edit"
onclick="ubahStatus(${index})">

🔄 Ubah Status

</button>

<button onclick="hapusOrder(${index})">
Hapus
</button>

</div>

<br>

`;

    });

}

// ===============================
// Ubah Status
// ===============================

function ubahStatus(index){

    if(orders[index].status=="Menunggu"){

        orders[index].status="Diproses";

    }else if(orders[index].status=="Diproses"){

        orders[index].status="Selesai";

    }else{

        orders[index].status="Menunggu";

    }

    localStorage.setItem("orders",JSON.stringify(orders));

    tampilkanOrders();

}

// ===============================
// Hapus Pesanan
// ===============================

function hapusOrder(index){

    if(confirm("Hapus pesanan ini?")){

        orders.splice(index,1);

        localStorage.setItem("orders",JSON.stringify(orders));

        tampilkanOrders();

    function lihatDetail(index){

    let item = orders[index];

    document.getElementById("detailIsi").innerHTML=`

<p><b>🎮 Game :</b> ${item.game}</p>

<p><b>👤 User ID :</b> ${item.userid}</p>

<p><b>🆔 Zone ID :</b> ${item.zoneid || "-"}</p>

<p><b>💎 Produk :</b> ${item.produk}</p>

<p><b>💰 Total :</b> ${rupiah(item.total)}</p>

<p><b>💳 Pembayaran :</b> ${item.payment}</p>

<p><b>📱 WhatsApp :</b> ${item.wa}</p>

<p><b>📅 Waktu :</b> ${item.waktu}</p>

<p><b>📌 Status :</b> ${item.status}</p>

`;

    document.getElementById("detailModal").style.display="block";

}

function tutupModal(){

    document.getElementById("detailModal").style.display="none";

}

// Jalankan
tampilkanOrders();
