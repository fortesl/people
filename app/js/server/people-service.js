/**
 * Created by fortesl on 10/9/2014.
 *
 * all javascript should be included in a function
 * no global variables need be created.
 */

(function () {
    'use strict';

    var app = angular.module('people-service', []);

    app.factory('PeopleService', ['$http', function($http) {

        var self = this;

        var getAge = function(birthDay) {
            var today = new Date();
            var birthDate = new Date(birthDay);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        };

        var getPerson = function(personId) {
            var id = parseInt(personId);
            var person = null;
            angular.forEach(self.peopleList, function(p) {
                if (p.id === id) {
                    person = p;
                }
            });
            return person;
        };

        return { //factory object

            people: function() {
                if (!self.peopleList) {
                    var promise = $http.get('js/server/dataStore/people.json');
                    promise.success(function (response) {
                        self.peopleList = response;
                        self.lastPersonId = self.peopleList[self.peopleList.length - 1].id;
                    });
                    return promise;
                }
                else {
                    return self.peopleList;
                }
            },

            person: function(personId) {
                return getPerson(personId);
            },

            personAge: function(birthDate, callback) {
                var age = getAge(birthDate);
                if (callback && typeof(callback) === "function") {
                    callback(age);
                }
            },

            addPerson: function(person) {
                person.id = ++self.lastPersonId;
                self.peopleList.push(person);
                return person.id;
            }

        }; //factory object


    }]);


})();