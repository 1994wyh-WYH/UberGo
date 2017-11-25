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

// To implement "Insert a new record", you need to:
// - Create a new controller here
// - Create a corresponding route handler in routes/index.js