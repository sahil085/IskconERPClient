var URL;
var Token;
function updateLocation(Url,token) {
  URL = Url;Token=token;
  geocoder = new google.maps.Geocoder();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
//        x.innerHTML = "Latitude: " + position.coords.latitude +
//            "<br>Longitude: " + position.coords.longitude;
  clat=position.coords.latitude;
  clon=position.coords.longitude;

  $.ajax({url: URL+"/updateLocation/"+clat+'/'+clon,type:'put', headers: {"Authorization": 'Basic ' +Token}, success: function(result){
      alert(result);
    }});
}
