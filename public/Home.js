function openbtn(){
    document.getElementById("mySidebar").style.width = "200px";
    document.getElementById("hamburger").style.visibility = "hidden";
}
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("hamburger").style.marginLeft= "0";
    document.getElementById("hamburger").style.visibility = "visible";
  }