const box = document.getElementById("storico")

let storico = JSON.parse(localStorage.getItem("storicoAllenamenti")) || []

if(storico.length===0){
 box.innerHTML="Nessun allenamento salvato"
}

storico.reverse().forEach(s=>{

 let html = `<h3>${s.data}</h3><ul>`

 s.workout.forEach(e=>{
   html+=`<li>${e.ex} ${e.s}x${e.r}</li>`
 })

 html+="</ul>"

 box.innerHTML += html
})
