const esercizio = document.getElementById("esercizio")
const serie = document.getElementById("serie")
const rip = document.getElementById("rip")
const lista = document.getElementById("lista")

let sessione = []

document.getElementById("aggiungi").onclick = ()=>{

 if(!esercizio.value) return

 sessione.push({
   ex:esercizio.value,
   s:serie.value,
   r:rip.value
 })

 render()

 esercizio.value=""
 serie.value=""
 rip.value=""
}

function render(){

 lista.innerHTML=""

 sessione.forEach(e=>{
   const li=document.createElement("li")
   li.textContent=`${e.ex} ${e.s}x${e.r}`
   lista.appendChild(li)
 })
}

document.getElementById("salva").onclick = ()=>{

 if(sessione.length===0) return alert("Sessione vuota")

 let storico = JSON.parse(localStorage.getItem("storicoAllenamenti")) || []

 storico.push({
   data:new Date().toLocaleDateString(),
   workout:sessione
 })

 localStorage.setItem("storicoAllenamenti",JSON.stringify(storico))

 alert("Sessione salvata")

 sessione=[]
 render()
}
