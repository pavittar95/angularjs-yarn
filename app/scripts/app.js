'use strict';

/**
 * @ngdoc overview
 * @name yarnAngularApp
 * @description
 * # yarnAngularApp
 *
 * Main module of the application.
 */
angular.module('yarnAngularApp', [
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch'
]).config(function($routeProvider, $locationProvider) {
  var globalRouteResolver = {
    RouteInspector: [
      '$location',
      function($location) {
        return true;
      }
    ]
  };

  var MMRouteProvider = angular.extend({}, $routeProvider, {
    when: function(path, route) {
      route.resolve = (route.resolve)
        ? route.resolve
        : {};
      angular.extend(route.resolve, globalRouteResolver);
      $routeProvider.when(path, route);
      return this;
    }
  });

  MMRouteProvider.when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main'
  }).when('/about', {
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl',
    controllerAs: 'about'
  }).otherwise({redirectTo: '/'});
  // use the HTML5 History API
  $locationProvider.html5Mode(true);
});
