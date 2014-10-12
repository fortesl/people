/**
 * Created by fortesl on 10/9/2014.
 *
 * all javascript should be included in a function
 * no global variables need be created.
 */

(function () {
    'use strict';

    var fs = require('fs');

    module.exports = function(grunt) {

        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-contrib-htmlmin');
        grunt.loadNpmTasks('grunt-jsonmin');
        grunt.loadNpmTasks('grunt-contrib-concat-sourcemaps');
        grunt.loadNpmTasks('grunt-processhtml');
        grunt.loadNpmTasks('grunt-angular-templates');

        grunt.initConfig({

            srcjsFiles: ['app/js/**/*.js'],
            srchtmlFiles: ['app/**/*.html'],
            srccssFiles: ['app/css/**/*.css'],

            // For dist, concat to 1 js resource to reduce the number of requests.
            concat: {
                people: {
                    dest: 'dist/js/people.min.js',
                    src: '<%= srcjsFiles %>'
                }
            },

            // For dist, prepare dist index.html
            processhtml: {
                people: {
                    files: {'dist/index.html': ['app/index.html']}
                }
            },

            // For dist, minimize json, css, html, and js resources, to reduce number of bytes loaded
            jsonmin: {
                people: {
                    files: [ {expand: true, cwd: 'app/js/server/dataStore', src: ['**/*.json'], dest: 'dist/js/server/dataStore/'} ]
                }
            },

            cssmin: {
                people: {
                    files: {
                        'dist/css/people.min.css': ['<%= srccssFiles %>']
                    }
                }
            },

            htmlmin: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    removeOptionalTags: true,
                    removeScriptTypeAttributes:     true,
                    removeStyleLinkTypeAttributes:  true,
                    removeEmptyAttributes:          true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true
                },
                index: {
                    files: {'dist/index.html': 'dist/index.html'}
                }
            },

            uglify: {
                options: {
                    mangle: true,
                    preserveComments: false,
                    compress: true
                },
                js: {
                    files: {'<%= concat.people.dest %>': ['<%= concat.people.dest %>']}
                }
            },

            ngtemplates:  {
                peopleApp:        {
                    cwd: 'app',
                    src:      'views/**/*.html',
                    dest:     'app/js/templates.js',
                    options: {
                        htmlmin: {
                            removeComments: true,
                            collapseWhitespace: true,
                            collapseBooleanAttributes: true,
                            removeAttributeQuotes: true,
                            removeRedundantAttributes: true,
                            removeOptionalTags: true,
                            removeScriptTypeAttributes: true,
                            removeStyleLinkTypeAttributes: true,
                            removeEmptyAttributes: true
                        }
                    }
                }
            },

            clean: {
                build: ['dist'],
                postbuild: ['<%= ngtemplates.peopleApp.dest %>']
            },

            // The grunt server settings for running the app
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
                },
                dist: {
                    options: {
                        livereload: true,
                        keepalive: true,
                        port: 9004,
                        open: true,
                        base: 'dist'
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

        grunt.registerTask('log-build', function() {
            this.requires('ngtemplates');
            this.requires('clean:build');
            this.requires('concat');
            this.requires('processhtml');
            this.requires('jsonmin');
            this.requires('cssmin');
            this.requires('htmlmin');
            this.requires('lintjs');
            this.requires('uglify');
            grunt.task.run('clean:postbuild');
            var message = 'Built on ' + new Date();
            fs.appendFileSync('build.log', message + '\n');
            grunt.log.writeln(message);
        });

        // makes jshint optional
        grunt.registerTask('lintjs', function() {
            if (grunt.file.exists('.jshintrc')) {
                grunt.task.run('jshint');
            }
            else {
                grunt.log.writeln('Warning: .jshintrc file not found. Javascript not linted!');
            }
        });

        //run source app
        grunt.registerTask('serve', 'start a connect web server', function () {
            grunt.task.run([
                'connect:livereload',
                'watch'
            ]);
        });

        grunt.registerTask('dist', ['ngtemplates', 'clean:build', 'concat', 'processhtml', 'jsonmin', 'cssmin', 'htmlmin', 'lintjs', 'uglify', 'log-build', 'connect:dist']);


    }; //module.export



    })();