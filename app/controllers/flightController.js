'use strict';
app.controller('flightController', ['$scope', 'ordersService', function ($scope) {
  
    $scope.FlightTimings = [];
    $scope.Searchstring = "";
   
    function CheckScopeBeforeApply() {
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.isloader = false;
    $scope.FlightTiming = { ID: 0, RouteName: "", Status: true, From: "", To: "", Sort: 0, FlightNumber: "", DepartureDate: "", duration: "", DepartureTime: "", ArrivalTime: "", ArrivalDate:"" }
    $scope.GetFlightTimings= function ()
    {
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
               

                CheckScopeBeforeApply();

            },
            error: function (req) {
                $scope.isloader = false;
            },
            complete: function () {
               
                $scope.isloader = false;
            }
        });
    }

    function ResetFlightTiming()
    {
        $scope.FlightTiming = { ID: 0, RouteName: "", Status: true, From: "", To: "", Sort: 0, FlightNumber: "", DepartureDate: "", duration: "", DepartureTime: "", ArrivalTime: "", ArrivalDate: "" }
        CheckScopeBeforeApply();
        $("#myModal").modal('hide');
    }

    
    $scope.SaveFlightTiming = function ()
    {
        if ($scope.FlightTiming.ID == 0) {

            $.ajax({
                url: serviceBase + "/api/FlightTimings",
                data: JSON.stringify($scope.FlightTiming),
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                success: function (result) {
                    debugger;
                    if (result.ID!=-1) {
                        toastr.success("Added successfully");
                        $scope.GetFlightTimings();
                        ResetFlightTiming();
                    }
                    else {
                        toastr.error("Error occurred");
                        toastr.error(result.RouteName);
                    }

                    CheckScopeBeforeApply();

                },
                error: function (req) {
                },
                complete: function () {


                }
            });
        }
        else {
            debugger;
            $.ajax({
                url: serviceBase + "/api/FlightTimings/" + $scope.FlightTiming.ID,
                data: JSON.stringify($scope.FlightTiming),
                type: 'PUT',
                contentType: 'application/json',
                dataType: 'json',
                success: function (result) {
                    debugger;
                        if (result.ID != -1) {
                            toastr.success("updated successfully");
                            $scope.GetFlightTimings();
                            ResetFlightTiming();
                        }
                        else {
                            toastr.error("Error occurred");
                            toastr.error(result.RouteName);
                        }
                    

                        CheckScopeBeforeApply();

                },
                error: function (req) {
                },
                complete: function () {


                }
            });
        }
    }
    


    
    $scope.OpenCreateEditModal=function(timing)
    {
        if (timing != undefined)
        {
            $scope.FlightTiming = angular.copy(timing);
            CheckScopeBeforeApply();
        }
            $("#myModal").modal('show');
    }
    
    $scope.GetFlightTimings();

    $scope.DeleteFlightTiming = function (id)
    {
        bootbox.confirm("Are you sure you want to delete this FlightTimings?", function (obj) {
            if (obj) {


                $.ajax({
                    url: serviceBase + "/api/FlightTimings/" + id,
                    //data: JSON.stringify(id),
                    type: 'DELETE',
                    contentType: 'application/json',
                    dataType: 'json',
                    success: function (result) {
                        if (result.ID != -1) {
                            toastr.success("Removed Success fully");
                            $scope.GetFlightTimings();
                        }
                        else {
                            toastr.error(result.RouteName);
                        }
                        CheckScopeBeforeApply();

                    },
                    error: function (req) {
                    },
                    complete: function () {


                    }
                });
            }
        });
    }
  
}]);