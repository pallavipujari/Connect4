const h1=document.querySelectorAll('.color');
//Function to create random colors 
function randomRGB(){

   let r=Math.floor(Math.random()*256);
   let g=Math.floor(Math.random()*256);
   let b=Math.floor(Math.random()*256);
 
   return `rgb(${r},${g},${b})`;

}

setInterval(function(){
    for(let eachletter of h1)
    {
        eachletter.style.color=randomRGB();
    }
},1000);
