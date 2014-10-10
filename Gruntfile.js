/**
 * Created by fortesl on 10/9/2014.
 *
 * all javascript should be included in a function
 * no global variables need be created.
 */

(function () {
    'use strict';

    module.exports = function(grunt) {

        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-connect');

        grunt.initConfig({

            srcjsFiles: ['app/js/**/*.js'],
            srchtmlFiles: ['app/**/*.html'],
            srccssFiles: ['app/css/**/*.css'],


            // The actual grunt server settings
            connect: {
                options: {
                    // Change this to '0.0.0.0' to access the server from outside.
                    hostname: 'localhost',
                    livereload: 35729
                },
                livereload: {
                    options: {
                        port: 9002,
                        open: true,
                        base: 'app'
                    }
                }
            },

            //watch
            watch: {
                js: {
                    files: ['<%= srcjsFiles %>'],
                    tasks: ['lintjs']
                },
                livereload: {
                    options: {
                        livereload: '<%= connect.options.livereload %>'
                    },
                    files: [
                        '<%= srcjsFiles %>',
                        '<%= srchtmlFiles %>',
                        '<%= srccssFiles %>'
                    ]
                }
            },

            //jshint
            jshint: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['<%= srcjsFiles %>']
            }


        }); //initConfig


        // makes jshint optional
        grunt.registerTask('lintjs', function() {
            if (grunt.file.exists('.jshintrc')) {
                grunt.task.run('jshint');
            }
            else {
                grunt.log.writeln('Warning: .jshintrc file not found. Javascript not linted!');
            }
        });

        //run webapp
        grunt.registerTask('serve', 'start a connect web server', function () {
            grunt.task.run([
                'connect:livereload',
                'watch'
            ]);
        });

    }; //module.export



    })();