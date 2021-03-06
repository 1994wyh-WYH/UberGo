var app = angular.module('angularjsNodejsTutorial',[]);

app.controller('reportController', function($scope, $http) {
        $scope.message="";
        $scope.submit = function() {
        var queryNumber = $scope.queryNumber;   
        var request = $http.get('/data/' + queryNumber);
        console.log('after requts' + request);
        console.log(request);
        request.success(function(data) {
            $scope.data = data;
          //  console.log("data here " + data);
        });
        request.error(function(data){
            console.log('err');
        });
    }; 
});

app.controller('myController', function($scope, $http) {
        $scope.message="";
	$scope.SubmitM = function(){
	var longitude = !!$scope.longitude ? $scope.longitude : undefined;
	var latitude = !! $scope.latitude ? $scope.latitude: undefined;
	var numRest = 0;
	var request = $http.get('/dataM/'+longitude+'/'+latitude);
	request.success(function(dataM){
	$scope.dataM=dataM;
	console.log(dataM);
});
}
        $scope.Submit = function() {
        var year = !!$scope.year ? $scope.year : undefined;
        var month = !!$scope.month ? $scope.month : undefined;
        var day = !!$scope.day ? $scope.day : undefined;
        var hour = !!$scope.hour ? $scope.hour : undefined;
        var weekday = !!$scope.weekday ? $scope.weekday : undefined;
        var fog = !!$scope.fog ? $scope.fog : undefined;
        var rain = !!$scope.rain ? $scope.rain : undefined;
        var snow = !!$scope.snow ? $scope.snow : undefined;
         
        var locations = [];

         
        var request = $http.get('/data/'+year+'/'+month+'/'+day+'/'+hour+'/'+weekday+'/'+fog+'/'+rain+'/'+snow);
        request.success(function(data) {
            
            $scope.data = data;
             // Convert the results into Google Map Format

	    
            locations = convertToMapPoints(data);
                initialize(40, -70);
        });
        request.error(function(data){
            console.log('err');
        });
        

        // Private Inner Functions
        // --------------------------------------------------------------
        // Convert a JSON of users into map points
        var convertToMapPoints = function(response){

            // Clear the locations holder
            var locations = [];

            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.length; i++) {
                var user = response[i];

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
                locations.push({
                    latlon: new google.maps.LatLng(user.PICKUP_LATITUDE, user.PICKUP_LONGITUDE),
                    message: new google.maps.InfoWindow({
                        content: "rank " + (i + 1) + " counts " + user.NUM + " lat: " 
                        + user.PICKUP_LATITUDE + " lon: " + user.PICKUP_LONGITUDE,
                        maxWidth: 320
                    }),
                    username: 'name',
                    gender: 'gender',
                    age: 'age',
                    favlang: 'favlang'
            });
        }
        // location is now an array populated with records in Google Maps format
        return locations;
    };

// Initializes the map
var initialize = function(latitude, longitude) {

    // Uses the selected lat, long as starting point
    var myLatLng = {lat: latitude, lng: longitude};

    // If map has not been created already...
    if (!map){
        // Create a new map and place in the index.html page
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 3,
            center: myLatLng
        });

       
    }
    var bounds = new google.maps.LatLngBounds();
    // Loop through each location in the array and place a marker
    locations.forEach(function(n, i){
        var marker = new google.maps.Marker({
            position: n.latlon,
            map: map,
            title: "Big Map",
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        });
        bounds.extend(marker.position);

        // For each marker created, add a listener that checks for clicks
        google.maps.event.addListener(marker, 'click', function(e){

            // When clicked, open the selected marker's message
            currentSelectedMarker = n;
            n.message.open(map, marker);
        });
    });
    map.fitBounds(bounds);

};


       
    }; 
});



// To implement "Insert a new record", you need to:
// - Create a new controller here
// - Create a corresponding route handler in routes/index.js
