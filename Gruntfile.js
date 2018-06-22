module.exports = function(grunt) {
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      filename: 'sticky-micky-table',
      banner: '/*!\n' +
            ' * Responsive Tables v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * <%= pkg.description %>\n' +
            ' * Authors: Nadan Gergeo <nadan@blimp.se> (www.blimp.se), Lucas Wiener <lucas@blimp.se> & "Maggie Wachs (www.filamentgroup.com)"\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */',
      jshint: {
          options: {
              jshintrc: true,
              reporterOutput: ""
          },
          all: ['src/js/*.js']
      },
      uglify: {
        build: {
          src: 'src/js/<%= filename %>.js',
          dest: 'dist/js/<%= filename %>.min.js'
        }
      },
      less: {
          development: {
            options: {
              compress: false
            },
            files: {
              // target.css file: source.less file
              "dist/css/<%= filename %>.css": "src/less/<%= filename %>.less"
            }
          },
          production: {
            options: {
              compress: true
            },
            files: {
              // target.css file: source.less file
              "dist/css/<%= filename %>.min.css": "src/less/<%= filename %>.less",
            }
          }
      },
      copy: {
        dist: {
            src: 'src/js/<%= filename %>.js',
            dest: 'dist/js/<%= filename %>.js',
        }
      },
      usebanner: {
        dist: {
          options: {
            position: 'top',
            banner: '<%= banner %>',
            linebreak: true
          },
          files: {
            src: [ 'dist/css/*.css', 'dist/js/*.js']
          }
        }
      },
      watch: {
          src: {
            // rebuild if files in src changes
            files: ['src/**'],
            tasks: ['build'],
            options: {
              livereload: {
                animate: true
              }
            }
          }
      },
      bump: {
          options: {
            files: ['package.json', 'bower.json'],
            updateConfigs: ['pkg','banner'],
            commit: true,
            commitMessage: 'Release v%VERSION%',
            commitFiles: ['-a'], // '-a' for all files
            createTag: true,
            tagName: 'v%VERSION%',
            tagMessage: 'Version %VERSION%',
            push: false,
            pushTo: 'upstream',
            gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
          }
      },
      connect: {
        server: {
          options: {
            port: 8000,
            keepalive: true
          }
        }
      }
    });

    grunt.registerTask('build', [
        'uglify',
        'less',
        'copy:dist',
        'usebanner'
    ]);

    grunt.registerTask('serve', [
        'connect'
    ]);

    grunt.registerTask('patch', [
        'bump-only:patch',
        'build',
        'bump-commit'
    ]);

    grunt.registerTask('minor', [
        'bump-only:minor',
        'build',
        'bump-commit'
    ]);

    grunt.registerTask('major', [
        'bump-only:major',
        'build',
        'bump-commit'
    ]);

    // Default task(s).
    grunt.registerTask('default', ['build']);
};

