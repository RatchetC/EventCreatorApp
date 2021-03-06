(function () {

  'use strict';

  var app = angular.module('Events');

  app.controller('EventAddCtrl', control);

  control.$inject = ['$state', '$ionicPopup', '$ionicHistory', 'eventsSrvc'];

  function control($state, $ionicPopup, $ionicHistory, eventsSrvc) {

    var vm = angular.extend(this, {
      title: "Add Event",
      btnSaveText: 'Save Event',
      datePlaceholder: new Date(),
      event: {},
      noActivities: true,
      dateRegex: /(\d\d\d\d-\d\d-\d\d)/,
      postcodeRegex: /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/
    });

    vm.save = function save() {
      vm.event.date = vm.datePlaceholder.toISOString().match(vm.dateRegex)[0];
      if (vm.event.postcode.match(vm.postcodeRegex) !== null) {
        // show spinner
        vm.loading = true;
        // post the event
        eventsSrvc.postEvent(vm.event).then(
          function success(postedEvent) {
            eventsSrvc.addEvent(postedEvent);
            // hide spinner
            vm.loading = false;
            // show success popup
            $ionicPopup.alert({
              title: 'Success!',
              template: 'Your event has been saved!'
            });
            // go back to event list
            $state.go('event-list');
          },
          function failure(error) {
            // log error msg and show failure popup
            console.error(error);
            $ionicPopup.alert({
              title: 'Error',
              template: 'Falied to save the event to the database. Please check your internet connection and try again.'
            });
          }
        );
      } else {
        $ionicPopup.alert({
          title: 'Error!',
          template: 'Inavlid postcode. Please enter a valid UK postcode'
        });
      }
    };

    // save the event before going to the activity list.
    vm.gotoActivityList = function gotoActivityList() {
      vm.event.date = vm.datePlaceholder.toISOString().match(vm.dateRegex)[0];
      if (vm.postcode.match(vm.postcodeRegex) !== null) {
        vm.loading = true;
        eventsSrvc.postEvent(vm.event).then(
          function success(postedEvent) {
            eventsSrvc.addEvent(postedEvent);
            vm.loading = false;
            // stop the user from going back to the add event screen as it is not populated when it is loaded and it is not cached
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            $state.go('activity-list', { eventID: postedEvent.id });
            // no success popup as the screen is changing to the activity list view
          },
          function failure(error) {
            // log error msg and show failure popup
            console.error(error);
            $ionicPopup.alert({
              title: 'Error',
              template: 'Falied to save the event to the database. Please check your internet connection and try again.'
            });
          }
        );
      } else {
        $ionicPopup.alert({
          title: 'Error!',
          template: 'Inavlid postcode. Please enter a valid UK postcode'
        });
      }
    };
    
  }

})();