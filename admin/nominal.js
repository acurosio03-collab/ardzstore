<!DOCTYPE html>
<html lang="id">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Kelola Nominal</title>

<link rel="stylesheet" href="admin.css">

</head>

<body>

<div class="sidebar">

<div class="logo">
🎮 ARDZ STORE
</div>

<a href="dashboard.html">🏠 Dashboard</a>
<a class="active" href="nominal.html">💎 Nominal</a>
<a href="orders.html">🛒 Pesanan</a>

</div>

<div class="main">

<h1>Kelola Nominal</h1>

<div class="box">

<input
type="text"
id="search"
placeholder="Cari produk..."
onkeyup="cariProduk()">

<br><br>

<select id="filterGame" onchange="filterGame()">

<option value="Semua">Semua Game</option>

<option>Mobile Legends</option>

<option>Free Fire</option>

<option>PUBG Mobile</option>

<option>Valorant</option>

<option>Honor Of Kings</option>

<option>Roblox</option>

</select>
<div id="listNominal"></div>

  </div>
<button onclick="bukaModal()">

➕ Tambah Produk

</button>

</div>

<div id="tableNominal">

</div>

</div>

<!-- MODAL -->
<div id="modalNominal" class="modal">

<div class="modal-content">

<h2 id="judulModal">

Tambah Nominal

</h2>

<input id="game" placeholder="Game">

<input id="produk" placeholder="Nama Produk">

<input id="supplier" type="number" placeholder="Harga Supplier">

<input id="profit" type="number" placeholder="Profit">

<button onclick="simpanNominal()">

💾 Simpan

</button>

<button onclick="tutupModal()">

Batal

</button>

</div>

</div>

<script src="nominal.js"></script>

</body>
</html>
