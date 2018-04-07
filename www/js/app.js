(function () {

  'use strict';

  var app = angular.module('EventCreatorApp', [
    'ionic',
    'restlet.sdk',
    'Events',
    'Activities',
    'EventActivityMappings'
  ]);

  // activityevents is the restlet API SDK module.js service thing . . .
  app.run(function ($ionicPlatform, activityevents) {
    
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });

    // set authentication (without this, none of the calls to the API work :D ) 
    activityevents.configureHTTP_BASICAuthentication('a4ccb4f9-f183-4505-b178-cca604d6c678', '4e39077a-383c-407c-a538-dd2c7cda3dfc');

  });

})();
