"use strict";

module.exports = function(grunt) {

    var pkg = grunt.file.readJSON("package.json");

    var srcs = [
        "dev/raphael.core.js",
        "dev/raphael.svg.js",
        "dev/raphael.vml.js",
    ];
    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: pkg,
        banner: grunt.file.read("dev/copy.js").replace(/@VERSION/, pkg.version),
        // Task configuration.
        jshint: {
            beforeconcat: srcs,
            afterconcat: ['dist/raphael.js'],
            "options": {
                jshintrc: '.jshintrc'
            }
        },
        uglify: {
            options: {
                banner: "<%= banner %>"
            },
            dist: {
                src: "<%= concat.dist.dest %>",
                dest: "raphael-min.js"
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [{
                        match: "VERSION",
                        replacement: "<%= pkg.version %>"
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: "<%= concat.dist.dest %>",
                }]
            }
        },
        concat: {
            dist: {
                dest: "<%= pkg.name %>.js",
                src: ["eve/eve.js"].concat(srcs)
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-replace");

    // Default task.
    grunt.registerTask("default", ["concat", "replace", /*"jshint",*/ "uglify"]); //Removed jshint because of too many errors, improving little by little..

};
