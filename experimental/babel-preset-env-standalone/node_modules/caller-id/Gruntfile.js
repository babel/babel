module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: grunt.file.readJSON('jshint.json'),
            all: {
                options: {
                    ignores: ['node_modules/**/*.js']
                },
                src: ['**/*.js']
            }
        },
        simplemocha: {
            options: {
                globals: ['should'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            },
            all: { src: 'test/**/*.js' }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-simple-mocha');

    // Default task(s)
    grunt.registerTask('test', ['jshint:all', 'simplemocha:all']);
    grunt.registerTask('build', ['test']);
    grunt.registerTask('default', ['build']);

};
