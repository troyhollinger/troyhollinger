module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist : {
                src : [
                    'js/plugins.js',
                    'js/main.js'
                ],
                dest: 'production/app.js'
            }
        },

        uglify: {
            build: {
                src: 'production/app.js',
                dest: 'production/app.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style:'compressed'
                },
                files: {
                    'css/style.css' : 'css/style.scss'
                }
            }
        },
        cssmin : {
            combine : {
                files : {
                    'production/app.css' : ['css/style.css', 'css/reset.css']
                }
            }
        },
        watch: {
            
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            },
            css : {
                files : ['css/*.scss'],
                tasks : ['sass', 'cssmin'],
                options : {
                    spawn : false
                }
            }
        }


    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin', 'watch']);

};