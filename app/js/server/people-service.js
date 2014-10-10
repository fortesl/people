/**
 * Created by fortesl on 10/9/2014.
 *
 * all javascript should be included in a function
 * no global variables need be created.
 */

(function () {
    'use strict';

    var app = angular.module('people-service', []);

    app.factory('PeopleService', [function($http) {

        //list of people hard-coded for now
        var peopleList =
            [
                {
                    "id": 1001,
                    "firstName": "Joe",
                    "middleName": "Super",
                    "lastName": "Flaco",
                    "birthDate": "1990/04/05",
                    "emailAddress": "joe.flaco@ravens.com"
                },
                {
                    "id": 1002,
                    "firstName": "Ray",
                    "middleName": "backer",
                    "lastName": "Lewis",
                    "birthDate": "1982/12/15/",
                    "emailAddress": "ray.lewis@ravens.com"
                },
                {
                    "id": 1003,
                    "firstName": "John",
                    "middleName": "Couch",
                    "lastName": "Harbaugh",
                    "birthDate": "1971/01/22",
                    "emailAddress": "john.harbaugh@ravens.com"
                },
                {
                    "id": 1004,
                    "firstName": "Steve",
                    "middleName": "Receiver",
                    "lastName": "Smith",
                    "birthDate": "1985/08/13",
                    "emailAddress": "steve.smith@ravens.com",
                    "banned": true
                }
            ];

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
            angular.forEach(peopleList, function(p) {
                if (p.id === id) {
                    person = p;
                }
            });
            return person;
        };

        var getNewPersonId = function() {
            var lastPerson = peopleList[peopleList.length - 1];
            return lastPerson.id + 1;
        };

        return { //factory object

            people: function() {
                return peopleList;
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
                var personId = getNewPersonId();
                person.id = personId;
                peopleList.push(person);
                return personId;
            }

        }; //factory object


    }]);


})();