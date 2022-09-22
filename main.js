
let newArray=[];//json
let filtered=[];//lugar variable(let)
let favoritos= JSON.parse(localStorage.getItem("favoritosPage")) || [];//array que nos arroje .find
let details= JSON.parse(localStorage.getItem("detailsPage")) || [];//parse---texto a objeto

//llamar las variables
const containerPrincipal=document.getElementById('containerPrincipal')
const inputSearch=document.getElementById('inputSearch')
const btnSearch=document.getElementById('btnSearch') //botón de busqueda del filtro
const selectLocation=document.getElementById('selectLocation')//contenedor del select 


//OBTENER Y CONSUMIR API
const info=async()=>{
    try{
    const URL_API='http://localhost:3000';
    const response=await fetch(`${URL_API}/arriendos`);//pedir información e ingresa en formato JSON
    newArray=await response.json();//cambiar json a formato digerible por js
    filtered=newArray;
    printCards();
    console.log(newArray)
    
    }catch(error){
        console.log(error);
        console.log('error')

    }
}
info();

//PINTAR API
const printCards=()=>{
    containerPrincipal.innerHTML='';
    filtered.forEach((element)=>{
        containerPrincipal.innerHTML +=`
        <article class="targets">
        <figure>
          <img src="${element.image}" alt="">
        </figure>
        <div class="infoTargets">
         <ul>
          <li>${element.type}</li>
          <li>${element.location}</li>
          <li>${element.area}</li>
          <li>${element.price}</li>
         </ul>
         <button class="buttonDetails" name="${element.id}">Details</button>
           <button class="buttonFavorites" name="${element.id}">Favorites</button>
        </div>
      </article>
      `;
    })
}

//función filtrar
const filterArray = (word,text) => {
    filtered = filtered.filter((object) =>
      object.location.toLowerCase().includes(word.toLowerCase()) && object.type.includes(text)
      
    );
    console.log(filtered);
  };

//recibir informacion botón
const handle=()=>{
    let infoButton=selectLocation.value; //llamar el valor del contenedor select
    let infoInput=inputSearch.value;//llamar el valor del input
    console.log(infoButton,infoInput);
    filterArray(infoButton,infoInput);
    printCards();
}
btnSearch.addEventListener('click',handle)



//escuchar eventos click del documento 
document.addEventListener('click',({target})=>{

  if (target.classList.contains("buttonFavorites")) {
    const saveFavorites=filtered.find(
      (item)=>item.id==target.getAttribute("name")); //find devuelve objeto y se debe almacenar en constante(espacio de memoria)
   
    //guardar en local
    const elementExist=favoritos.some(item=>item.id===saveFavorites.id)
    console.log(elementExist);
    if (elementExist==false){
      favoritos.push(saveFavorites)
      localStorage.setItem('favoritosPage',JSON.stringify(favoritos))//stringify--objeto a texto

    }
    
  }
  
})



