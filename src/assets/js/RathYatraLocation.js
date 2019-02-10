var URL;
var Token;
var clat;
var clon;
function updateLocation(Url,token) {
  URL = Url;Token=token;
  alert(Url);
  geocoder = new google.maps.Geocoder();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(updateRathYatraLocation, error,{});
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function updateRathYatraLocation(position) {
//        x.innerHTML = "Latitude: " + position.coords.latitude +
//            "<br>Longitude: " + position.coords.longitude;
  clat=position.coords.latitude;
  clon=position.coords.longitude;
   alert("hare krishna "+clat);
  $.ajax({url: URL+"/updateLocation/"+clat+'/'+clon,type:'put', headers: {"Authorization": 'Basic ' +Token}, success: function(result){
      alert(result + 'response');
    }});
}
