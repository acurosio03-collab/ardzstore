function tampilNominal(){

    const list = document.getElementById("listNominal");

    let data = JSON.parse(localStorage.getItem("nominal")) || [];

    list.innerHTML = "";

    if(data.length==0){
        list.innerHTML="<p>Belum ada nominal.</p>";
        return;
    }

    data.forEach((item,index)=>{

        const hargaJual =
        Number(item.supplier)+Number(item.margin);

        list.innerHTML += `
        <div class="card">

            <h3>${item.game}</h3>

            <b>${item.produk}</b>

            <p>Harga Supplier : ${formatRupiah(item.supplier)}</p>

            <p>Margin : ${formatRupiah(item.margin)}</p>

            <h2>${formatRupiah(hargaJual)}</h2>

            <button onclick="hapus(${index})">
            🗑 Hapus
            </button>

        </div>
        `;

    });

}
