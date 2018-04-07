(function () {

  'use strict';

  var app = angular.module('Events');

  app.controller('EventEditCtrl', control);

  control.$inject = ['$state', '$ionicPopup', '$ionicHistory', 'eventsSrvc', 'activitiesSrvc', 'eventActivityMappingsSrvc', 'selectedEvent', 'activities', 'mappings'];

  function control($state, $ionicPopup, $ionicHistory, eventsSrvc, activitiesSrvc, eventActivityMappingsSrvc, selectedEvent, activities, mappings) {

    var vm = angular.extend(this, {
      title: 'Edit Event', // needed because the template is shared with the EventAddCtrl
      btnSaveText: 'Save Changes', // ^
      event: selectedEvent, // event passed in from the state machine
      activities: activities, // the activities for this event passed in from the state machine
      noActivities: false, // for UI
      loading: false // spinner is not shown when view is first shown as the view would not be shown if the data it needed wasn't available thanks to the resolve property in the state machine
    });

    function init() {
      if (vm.activities.length === 0) {
        vm.noActivities = true; // for displaying slightly different ui
      }
    }

    init();

    vm.save = function save() {
      vm.loading = true; // show spinner
      
      // PUT request to API with updated info about event
      eventsSrvc.putEvent(vm.event).then(
        function success(data) {
          
          eventsSrvc.updateEvent(data); // update local copy
          vm.loading = false; // hide spinner
          $ionicPopup.alert({ // show success popup
            title: 'Success!',
            template: 'Your changes have been saved!'
          });

          // disable the ability to go back to this view from the event list.
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('event-list');
        },

        function failure(error) {
          // log error msg and show failure popup
          console.error(error);
          $ionicPopup.alert({
            title: 'Error',
            template: 'An error occurred when trying to save your changes. Please check your internet connection and try again.'
          });
        }
      );
    };

    vm.gotoActivityList = function gotoActivityList() {
      $state.go('activity-list', { eventID: $state.params.eventID });
    };

    vm.deleteActivityFromEvent = function deleteActivityFromEvent(activityID) {
      $ionicPopup.confirm({
        title: 'Delete Activity',
        template: 'Are you sure you want to delete this activity from your event?'
      }).then(function (response) {
        var YES = true; // makes the if statement more readable than 'if (response) {'
        if (response === YES) {
          // remove the activity fromt the list on screen
          for (var i = 0; i < vm.activities.length; i++) {
            if (vm.activities[i].id === activityID) {
              vm.activities.splice(i, 1);
            }
          }
          // if that list is empty then set this to true to change the UI
          if (vm.activities.length === 0) {
            vm.noActivities = true;
          }
          // find the mapping and delete it
          for (var j = 0; j < mappings.length; j++) {
            if (mappings[j].activity === activityID) {
              eventActivityMappingsSrvc.deleteEventActivityMapping(mappings[j].id).then(
                function success(response) {
                  $ionicPopup.alert({
                    title: 'Success',
                    template: 'Successfully deleted your activity from your event'
                  });
                },
                function failure(error) {
                  console.error(error);
                  $ionicPopup.alert({
                    title: 'Error',
                    template: 'An error occurred while trying to delete your activity from your event. Please check your internet connection and try again.'
                  });
                }
              );
            }
          }
        }
      });
    };

  }

})();