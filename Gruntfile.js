module.exports = function (grunt) {

  require('jit-grunt')(grunt, {
    browserSync: 'grunt-browser-sync'
  });
  require('time-grunt')(grunt);


  grunt.initConfig({

    path: {
      src: './src',
      dist: './dist'
    },

    eslint: {
      target: ['*.js']
    },

    clean: {
      all: ['<%= path.dist %>']
    },

    assemble: {
      options: {
        layoutdir: '<%= path.src %>/layouts',
        partials: [
          '<%= path.src %>/partials/*.hbs',
          '<%= path.src %>/sub-partials/*.hbs'
        ],
        helpers: [
        ],
        plugins: [
        ]
      },
      all: {
        options: {
          layout: 'default.hbs'
        },
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/pages',
            src: '**/*.hbs',
            dest: '<%= path.dist %>'
          }
        ]
      }
    },

    watch: {
      options: {
        spawn: false
      },
      html: {
        files: ['<%= path.src %>/**/*.hbs'],
        tasks: ['assemble']
      }
    },

    browserSync: {
      all: {
        options: {
          watchTask: true,
          server: '<%= path.dist %>',
          open: false
        },
        bsFiles: {
          src: [
            '<%= path.dist %>/**/*.html'
          ]
        }
      }
    }

  });


  grunt.registerTask('default', ['eslint', 'clean']);
  grunt.registerTask('serve', ['eslint', 'clean', 'assemble', 'browserSync', 'watch']);
};
