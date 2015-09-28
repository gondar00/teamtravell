// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','angular-table','ui.bootstrap'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('app.bus', {
      url: '/bus',
      views: {
        'menuContent': {
          templateUrl: 'templates/bus.html',
          controller: 'BusCtrl'
        }
      }
    }).state('app.bustrips', {
      url: '/bus/bustrips',
      views: {
        'menuContent': {
          templateUrl: 'templates/bustrips.html',
          controller: 'BusTripCtrl'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
    .state('app.planner', {
    url: '/tripplanner',
    views: {
      'menuContent': {
        templateUrl: 'templates/planner.html',
        controller: 'todoController'
      }
    }
  }).state('app.team', {
    url: '/team',
    views: {
      'menuContent': {
        templateUrl: 'templates/team.html',
        controller: 'teamController'
      }
    }
  }).state('app.teamTravel', {
    url: '/team/teamTravel',
    views: {
      'menuContent': {
        templateUrl: 'templates/teamTravel.html',
        controller: 'teamController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
}).filter('fromNow', function() {
    return function(date) {
      return moment(date).fromNow();
    }
  });
