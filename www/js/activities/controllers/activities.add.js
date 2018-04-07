(function () {

  'use strict';

  var app = angular.module('Activities');

  app.controller('ActivityAddCtrl', control);

  control.$inject = ['$ionicHistory', '$ionicPopup', 'activitiesSrvc'];

  function control($ionicHistory, $ionicPopup, activitiesSrvc) {

    // create vm object and activity object in it so that 2 way binding will handle setting the values of the properties of the activity objects
    var vm = angular.extend(this, {
      activity: {
        id: new Date().getTime().toString(),
        name: '',
        description: '',
        units: '',
        minLegalValue: '',
        maxLegalValue: ''
      },
      loading: false
    });

    vm.save = function save() {
      // show spinner
      vm.loading = true;
      // post the activity
      activitiesSrvc.postActivity(vm.activity).then(
        function success(postedActivity) {
          activitiesSrvc.addActivity(postedActivity);
          // hide spinner
          vm.loading = false;
          // go back to activity list
          $ionicHistory.goBack();
        },
        function failure(error) {
          // log error msg and show failure popup
          console.error(error);
          $ionicPopup.alert({
            title: 'Error!',
            template: 'Failed to save your activity to the database. Please check your internet connection and try again.'
          });
        }
      );
    };

  }

})();