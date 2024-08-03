let button = document.querySelectorAll('.color-buttons')
button.forEach((btn)=>{
  console.log(btn)
  btn.addEventListener('click' , ()=>{
  document.body.style.backgroundColor = btn.id ;
  document.getElementById('editable').textContent = btn.textContent; 
  });
});