let plan = {}

const nomeScheda = document.getElementById("nomeScheda")
const gruppo = document.getElementById("gruppo")
const giorno = document.getElementById("giorno")
const esercizio = document.getElementById("esercizio")
const serie = document.getElementById("serie")
const rip = document.getElementById("rip")
const rest = document.getElementById("rest")
const preview = document.getElementById("preview")

document.getElementById("add").onclick = ()=>{

 if(!giorno.value || !esercizio.value){
   alert("Inserisci giorno ed esercizio")
   return
 }

 if(!plan[giorno.value]) plan[giorno.value]=[]

 plan[giorno.value].push({
   ex:esercizio.value,
   s:serie.value,
   r:rip.value,
   rest:Number(rest.value)||60
 })

 esercizio.value=""
 serie.value=""
 rip.value=""
 rest.value=""

 render()
}

function render(){

 preview.innerHTML=""

 Object.keys(plan).forEach(d=>{

   let html=`<h4>${d}</h4><ul>`

   plan[d].forEach(e=>{
     html+=`<li>${e.ex} ${e.s}x${e.r} — Recupero ${e.rest}s</li>`
   })

   html+="</ul>"
   preview.innerHTML+=html
 })
}

document.getElementById("salva").onclick=()=>{

 if(!nomeScheda.value || !gruppo.value){
   alert("Nome scheda e gruppo obbligatori")
   return
 }

 if(Object.keys(plan).length===0){
   alert("Aggiungi almeno un esercizio")
   return
 }

 let archivio = JSON.parse(localStorage.getItem("schede")) || []

 archivio.push({
   id:Date.now(),
   nome:nomeScheda.value,
   gruppo:gruppo.value,
   giorni:plan
 })

 localStorage.setItem("schede",JSON.stringify(archivio))

 alert("Scheda salvata 💪")

 plan={}
 preview.innerHTML=""
 nomeScheda.value=""
 gruppo.value=""
 giorno.value=""
}
