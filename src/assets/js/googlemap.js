var clat,clon,long,latt;
var flightPath;
var URL;
var geocoder;
var x = document.getElementById("demo");
var viewongoogle = document.getElementById("viewongoogle");
// Handler for .ready() called.
function getLocation(Url) {
  URL = Url;
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

}
setTimeout(function () {
  setInterval(function () {
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;

    parameters();

    function parameters() {

      $.ajax({url: URL+"/location", headers: {"Authorization": 'Basic ' +localStorage.getItem('Authorization')}, success: function(result){
          console.log(result);

          long = result.substring(0,result.indexOf("^"))*1;
          latt = result.substring(result.indexOf("^")+1,result.length)*1;
          $("#viewongoogle").empty();
          $("#yatraheader").empty();
          $("#yatraheader").text('Iskcon Ghaziabad Rath Yatra Live Tracking');
          $('#viewongoogle').append('<b>Click Here To Get Direction <br><a target="_blank" href="https://maps.google.com/maps?q='+latt+','+long+'&hl=es;z=14&amp;/" >Get Directions</a></b>');
          initialize(latt,long);
        }});

    }
    function initialize(lat,longi) {
      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var labelIndex = 0;
      var India = { lat:lat, lng:longi};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: India
      });
      // This event listener calls addMarker() when the map is clicked.
//        google.maps.event.addListener(map, 'click', function(event) {
//            addMarker(event.latLng, map);
//        });
      // Add a marker at the center of the map.
      addMarkerToRathYatra(India, map);
      var clocation={lat:clat,lng :clon};
      addMarkerToYourLocation(clocation,map);
    }
    // Adds a marker to the map.
    function addMarkerToRathYatra(location, map) {
      // Add the marker at the clicked location, and add the next-available label
      // from the array of alphabetical characters.
      var marker = new google.maps.Marker({
        position: location,
        label: "Yatra",
        map: map
      });
    }
    function addMarkerToYourLocation(location, map) {
      // Add the marker at the clicked location, and add the next-available label
      // from the array of alphabetical characters.
      var marker = new google.maps.Marker({
        position: location,
        label: "You",
        map: map
      });
      var flightPlanCoordinates = [
        {lat: clat, lng: clon},
        {lat: latt, lng: long}
      ];
      flightPath= new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      flightPath.setMap(map);
//        distance(latt,long,clat,clon);
      $("#addr").empty();
      codeLatLng(latt,long);
    }
    function codeLatLng(lat, lng) {
      var latlng = new google.maps.LatLng(lat, lng);
      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          console.log(results)
          if (results[1]) {
            //formatted address
            $("#addr").text(results[0].formatted_address);
            //find country name
            for (var i=0; i<results[0].address_components.length; i++) {
              for (var b=0;b<results[0].address_components[i].types.length;b++) {
                //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                  //this is the object you are looking for
                  city= results[0].address_components[i];
                  break;
                }
              }
            }
            //city data
//                        alert(city.short_name + " " + city.long_name)
          } else {
//                        alert("No results found");
          }
        } else {
//                    alert("Geocoder failed due to: " + status);
        }
      });
      distance(latt,long,clat,clon);
    }
    google.maps.event.addDomListener(window, 'load', initialize);
    function distance(lat1,lon1,lat2,lon2) {
      var R = 6371; // km (change this constant to get miles)
      var dLat = (lat2-lat1) * Math.PI / 180;
      var dLon = (lon2-lon1) * Math.PI / 180;
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      if (d>1) {
        document.getElementById("distance").innerHTML="You Are "+Math.round(d)+"km Far From Rath yatra";
      }
      else if (d<=1)
      {
        document.getElementById("distance").innerHTML="You Are "+Math.round(d*1000)+"m Far From Rath yatra";
      }
      else {
        document. getElementById("distance").innerHTML="You Are "+d+"meter Far From Rath yatra";

      }

    }
    //      function distance(lat1, lon1, lat2, lon2, unit) {
    //          var radlat1 = Math.PI * lat1 / 180
    //          var radlat2 = Math.PI * lat2 / 180
    //          var theta = lon1 - lon2
    //          var radtheta = Math.PI * theta / 180
    //          var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    //          dist = Math.acos(dist)
    //          dist = dist * 180 / Math.PI
    //          dist = dist * 60 * 1.1515
    //          unit="K";
    //          if (unit == "K") {
    //              dist = dist * 1.609344
    //          }
    //          if (unit == "N") {
    //              dist = dist * 0.8684
    //          }
    //          document.getElementById("distance").innerHTML="You Are "+dist+" Far From Rath yatra";
    //      }
  }, 10000);

},2000);
