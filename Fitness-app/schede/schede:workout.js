const lista = document.getElementById("lista")
let schede = JSON.parse(localStorage.getItem("schede")) || []

if(lista){

 schede.forEach(s=>{

   const div=document.createElement("div")
   div.className="todo"

   div.innerHTML=`
   <strong>${s.nome}</strong><br>
   ${s.gruppo}<br>
   <button>Apri</button>
   <button>Cancella</button>
   `

   div.querySelectorAll("button")[0].onclick=()=>{
     localStorage.setItem("schedaAttiva",s.id)
     location.href="workout.html"
   }

   div.querySelectorAll("button")[1].onclick=()=>{
     if(confirm("Eliminare scheda?")){
       schede=schede.filter(x=>x.id!==s.id)
       localStorage.setItem("schede",JSON.stringify(schede))
       location.reload()
     }
   }

   lista.appendChild(div)
 })
}

/* WORKOUT MODE */

const titolo=document.getElementById("titolo")
const box=document.getElementById("box")
const timer=document.getElementById("timer")

if(box){

 const id=Number(localStorage.getItem("schedaAttiva"))
 const scheda=schede.find(x=>x.id===id)

 titolo.textContent=scheda.nome+" — "+scheda.gruppo

 let timerInt=null

 Object.keys(scheda.giorni).forEach(g=>{

   const h=document.createElement("h3")
   h.textContent=g
   box.appendChild(h)

   scheda.giorni[g].forEach(e=>{

     const d=document.createElement("div")
     d.className="todo"

     d.innerHTML=`
     <label>
     <input type="checkbox">
     ${e.ex} ${e.s}x${e.r}
     </label>
     <div>Recupero ${e.rest}s</div>
     <button>Start</button>
     `

     d.querySelector("button").onclick=()=>start(e.rest)

     box.appendChild(d)
   })
 })

 function start(sec){

   clearInterval(timerInt)

   let r=sec
   show(r)

   timerInt=setInterval(()=>{

     r--
     show(r)

     if(r<=0){
       clearInterval(timerInt)
       alert("Recupero finito 💪")
     }

   },1000)
 }

 function show(s){

   const m=String(Math.floor(s/60)).padStart(2,"0")
   const r=String(s%60).padStart(2,"0")

   timer.textContent=`${m}:${r}`
 }
}
