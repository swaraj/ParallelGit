app.controller('AdminController', function($scope, SecurityService)  {

  $scope.credential = null;

  $scope.logout = function() {
    SecurityService.logout();
    SecurityService.login();
  };

  $scope.$on('ready', function() {
    $scope.credential = SecurityService.getCredential();
  });
  $scope.$on('disconnect', function() {
    $scope.credential = null;
  });


});