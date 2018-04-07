(function () {

  'use strict';

  var app = angular.module('Activities');

  app.controller('ActivityListCtrl', control);

  control.$inject = ['$state', '$ionicPopup', '$timeout', '$ionicHistory', 'activitiesSrvc', 'eventActivityMappingsSrvc', 'thisEventsMappings'];

  function control($state, $ionicPopup, $timeout, $ionicHistory, activitiesSrvc, eventActivityMappingsSrvc, thisEventsMappings) {

    var vm = angular.extend(this, {
      activities: [],
      loading: true
    });

    function init() {
      activitiesSrvc.getAllActivities().then(
        function success(data) {
          vm.activities = data;
          // hide spinner once data has been received
          vm.loading = false;
        },
        function failure(error) {
          // error message
          console.error(error);
          $ionicPopup.alert({
            title: 'Error',
            template: 'Failed to load the activities. Please check your internet connection and try again.'
          });
          // go to edit view as if the user came from the add view in the history stack then $ionicHistory.goBack() is blocked, so redirect them to the edit screen which does not block that.
          $state.go('event-edit', { eventID: $state.params.eventID } );
        }
      );
    }

    init();

    vm.addActivityToEvent = function addActivityToEvent(activity) {

      // check if the activity is already associated with the event. if it is show an error message and return
      for (var i = 0; i < thisEventsMappings.length; i++) {
        if (thisEventsMappings[i].activity === activity.id) {
          $ionicPopup.alert({
            title: 'Duplicate Activity',
            template: 'This activity has already been added to your event. There is no need to add it twice.'
          });
          return;
        }
      }

      // create the mapping object that will sent to the API
      var mapping = {
        id: new Date().getTime().toString(),
        event: $state.params.eventID,
        activity: activity.id
      };

      // ask the user to confirm that they want to add the activity to their event, just in case they misclicked.
      $ionicPopup.confirm({
        title: 'Add Activity To Event',
        template: 'Are you sure you want to add ' + activity.name + ' to your event?'
      }).then(function (response) {
        var YES = true; // makes the if statement more readable than 'if (response) {'
        if (response === YES) {
          // show spinner
          vm.loading = true;
          // post the mapping
          eventActivityMappingsSrvc.postEventActivityMapping(mapping).then(
            function success(postedMapping) {
              // delay for a second because restlet is slow
              $timeout(function () {
                $ionicHistory.nextViewOptions({
                  disableBack: true
                });
                $state.go('event-edit', { eventID: $state.params.eventID });
              }, 1000);
            },
            function failure(error) {
              // log the error msg and show the error popup
              console.error(error);
              $ionicPopup.alert({
                title: 'Error',
                template: 'Failed to add the activity to your event. Please check your internet connection and try again.'
              });
            }
          );
        }
      });

    };

  }

})();