<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>MONOLITO</title>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
body{
background:#1b1b1b;
color:white;
font-family:Arial,Helvetica,sans-serif;
margin:0;
padding:0;
text-align:center;
}

header{
background:#111;
padding:20px;
font-size:28px;
font-weight:bold;
letter-spacing:2px;
}

.panel{
display:grid;
grid-template-columns:repeat(2,1fr);
gap:15px;
padding:20px;
}

button{
height:80px;
font-size:18px;
border-radius:12px;
border:none;
background:#2e2e2e;
color:white;
box-shadow:0 4px 10px rgba(0,0,0,0.6);
}

button:active{
transform:scale(0.95);
background:#444;
}

.radar{
background:#7a0000;
}

.aviso{
background:#c58b00;
}
</style>

</head>

<body>

<header>MONOLITO</header>

<div class="panel">

<button>PROVEEDORES</button>
<button>PEDIDOS</button>

<button>PAGOS</button>
<button>ARTÍCULOS</button>

<button>COMPARADOR</button>
<button>DIARIO</button>

<button class="radar">RADAR</button>
<button>HISTÓRICO</button>

<button>CONFIGURACIÓN</button>
<button class="aviso">A TENER EN CUENTA</button>

</div>

</body>
</html>
