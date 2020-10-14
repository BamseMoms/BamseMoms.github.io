function closeAlert(self){
  var i = self.parentElement;
  i.style.opacity = "0";
  setTimeout(function(){
    i.style.display = "none";
  },800);
}
