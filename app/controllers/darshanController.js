'use strict';
app.controller('darshanController', ['$scope', 'localStorageService', '$location', 'authService', 'ngAuthSettings', function ($scope, localStorageService, $location, authService, ngAuthSettings) {


    $scope.GetDarshanTimings = function () {
        $scope.isload = true;
        $.ajax({
            url: serviceBase + "/api/DarshanTimings",
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {

            
                $scope.isload = false;

                debugger;

                $scope.DarshanTimings = result;


                $scope.$apply();

            },
            error: function (req) {
                $scope.isloader = false;
            },
            complete: function () {
                $scope.isloader = false;


            }
        });
    }


    $scope.FlightTiming = { ID: 0, RouteName: "", Status: true, From: "", To: "", Sort: 0, FlightNumber: "", DepartureDate: "", duration: "", DepartureTime: "", ArrivalTime: "", ArrivalDate: "" }
    $scope.GetFlightTimings = function () {
        $scope.isloader = true;
        $.ajax({
            url: serviceBase + "/api/FlightTimings",
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            success: function (result) {

                $scope.isloader = false;

                debugger;
                $scope.FlightTimings = result;


                $scope.$apply();

            },
            error: function (req) {
                $scope.isloader = false;
            },
            complete: function () {

                $scope.isloader = false;
            }
        });
    }

    $scope.GetFlightTimings();
   
}]);
