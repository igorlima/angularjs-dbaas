/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */

// Add the backand and angular-cookies dependencies to angular app definition
angular.module('todomvc', ['ngRoute', 'backand', 'ngCookies'])
	.config(function ($routeProvider, BackandProvider) {
		'use strict';

		var routeConfig = {
			controller: 'TodoCtrl',
			templateUrl: 'todomvc-index.html',
			resolve: {
				store: function (todoStorage) {
					// Get the correct module (API or localStorage).
					return todoStorage.then(function (module) {
						module.get(); // Fetch the todo records in the background.
						return module;
					});
				}
			}
		};

		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});

		// Update Angular configuration section
		BackandProvider.manageDefaultHeaders();
		BackandProvider.setAppName('myfirstbackand');
	});
