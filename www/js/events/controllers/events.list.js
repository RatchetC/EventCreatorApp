(function () {

  'use strict';

  var app = angular.module('Events');

  app.controller('EventListCtrl', control);

  control.$inject = ['$state', '$ionicPopup', 'eventsSrvc'];

  function control($state, $ionicPopup, eventsSrvc) {

    var vm = angular.extend(this, {
      events: [],
      loading: true // show spinner whilst events and loading
    });

    function init() {
      eventsSrvc.getAllEvents().then(
        function success(data) {
          vm.loading = false; // hide spinner
          vm.events = data; // set events array to data received from the API
          // no success popup needed
        },
        function failure(error) {
          // log error msg and show failure popup
          console.error(error);
          $ionicPopup.alert({
            title: 'Error',
            template: 'Falied to retrieve all events from the database. Please check your internet connection and try again.'
          });
        }
      );
    }

    init();

    vm.editEvent = function (eventID) {
      vm.loading = true; // show spinner whilst data needed for edit view loads in state machine
      $state.go('event-edit', { eventID: eventID });
    };

    vm.deleteEvent = function (eventID) {
      $ionicPopup.confirm({
        title: 'Delete Event',
        template: 'Are you sure you want to delete this event?'
      }).then(function (response) {
        var YES = true;
        if (response === YES) { // makes the if statement more readable than 'if (response) {'
          eventsSrvc.deleteEvent(eventID);
        }
      });
    };

  }

})();