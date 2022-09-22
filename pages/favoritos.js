let container=document.getElementsByClassName('container')[0];
let favoritos= JSON.parse(localStorage.getItem("favoritosPage")) || [];//se llama el array de favoritos
console.log(favoritos)

//funcion pintar cards 
const printCards=()=>{
    container.innerHTML='';
    favoritos.forEach((element)=>{
        container.innerHTML +=`
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

document.addEventListener('DOMContentLoaded',printCards)
