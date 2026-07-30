let slide = document.querySelectorAll(".slide");

let index = 0;

setInterval(function(){

slide[index].classList.remove("active");

index++;

if(index >= slide.length){

index = 0;

}

slide[index].classList.add("active");

},4000);
