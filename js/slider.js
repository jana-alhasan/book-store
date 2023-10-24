const slider=document.querySelector(".slider");
const sliderImg=document.querySelector(".slider-img");
const myImg =document.querySelectorAll(".book-item-img");
const close=document.querySelector(".close");

for(let i=0; i< myImg.length; i++){
myImg[i].addEventListener('click', function(){
  slider.style.display='block';
  sliderImg.src=this.src;

})
}
close.addEventListener('click',function(){
  slider.style.display='none';
})