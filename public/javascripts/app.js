var app = angular.module('angularjsNodejsTutorial',[]);
app.controller('myController', function($scope, $http) {
        $scope.message="";
        $scope.Submit = function() {
        var email = !!$scope.email ? $scope.email : undefined;
        var request = $http.get('/data/'+email);
        console.log('after requts' + request);
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            console.log('err');
        });
    }; 
});

app.controller('insertController', function($scope, $http) {
        $scope.message="";
        $scope.Insert = function() {
        var data = {}
        data.login = !!$scope.login ? $scope.login : "";
        data.name = !!$scope.name ? $scope.name : "";
        data.sex = !!$scope.sex ? $scope.sex : "";
        data.RelationshipStatus = !!$scope.RelationshipStatus ? $scope.RelationshipStatus : "";
        data.Birthyear = !!$scope.Birthyear ? $scope.Birthyear : "";
        console.log(data);
        var request = $http.post('/insert/', data);
        request.success(function(data) {
            document.getElementById('insert-result-msg').textContent ='Insertion succeeded';
        });
        request.error(function(data){
            document.getElementById('insert-result-msg').textContent = 'Insertion failed';
        });
    };
});

app.controller('reportController', function($scope, $http) {
        $scope.message="";
        $scope.submit = function() {
        //var email = !!$scope.email ? $scope.email : undefined;
        var queryNumber = $scope.queryNumber;
        //var queryNumber = !!$scope.queryNumber ? $scope.queryNumber : 0;
        /*
        var queryNumber1 = !!$scope.queryNumber1 ? $scope.queryNumber1 : 0;
        var queryNumber2 = !!$scope.queryNumber2 ? $scope.queryNumber2 : 0;
        var queryNumber3 = !!$scope.queryNumber3 ? $scope.queryNumber3 : 0;
        var queryNumber4 = !!$scope.queryNumber4 ? $scope.queryNumber4 : 0;
        var queryNumber5 = !!$scope.queryNumber5 ? $scope.queryNumber5 : 0;
        var queryNumber6 = !!$scope.queryNumber6 ? $scope.queryNumber6 : 0;
        var queryNumber7 = !!$scope.queryNumber7 ? $scope.queryNumber7 : 0;
        */
        //var queryNumber = queryNumber0 + queryNumber1 + queryNumber2 + queryNumber3 + queryNumber4 + queryNumber5 + queryNumber6 + queryNumber7;
       // var queryNumber = !!$scope.queryNumber ? $scope.queryNumber : undefined;
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

// To implement "Insert a new record", you need to:
// - Create a new controller here
// - Create a corresponding route handler in routes/index.js