/**
 * Created by fortesl on 10/9/2014.
 *
 * all javascript should be included in a function
 * no global variables need be created.
 */

(function () {
    'use strict';

    var app = angular.module('peopleApp');

    app.controller('PeopleListController', ['PeopleService', '$rootScope', function(PeopleService, $rootScope) {

        var self = this;
        self.peopleList = [];

        $rootScope.appTitle = 'MyPeople';

        var people = PeopleService.people();
        if (angular.isArray(people)) {
            self.peopleList = people;
        }
        else {
            PeopleService.people().success(function (response) {
                self.peopleList = response;
            });
        }

    }]);


})();