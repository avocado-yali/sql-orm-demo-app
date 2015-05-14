angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,persistencejs) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

    for ( var i = 0; i < 5; i++) {
      var t = {};
      t.title = 'Playlists ' + i;
      t.id = i+1;
      persistencejs.add(t);
    }
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope,persistencejs) {
  this.refresh = function(){ self.$apply(); }
  persistencejs.fetchAll(function (error,playlists) {
    if(error){
      alert(error)
    }
    else{
      $scope.playlists = playlists;
    }
  })
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
