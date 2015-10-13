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

    sass: {
      options: {
        sourceMap: true
      },
      all: {
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/scss',
            src: ['*.scss'],
            dest: '<%= path.dist %>/css',
            ext: '.css'
          }
        ]
      }
    },

    browserify: {
      dist: {
        options: {
          transform: [
            ['babelify']
          ]
        },
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/js',
            src: ['*.js'],
            dest: '<%= path.dist %>/js'
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
      },
      sass: {
        files: ['<%= path.src %>/scss/**/*.scss'],
        tasks: ['sass']
      },
      js: {
        files: ['<%= path.src %>/js/**/*.js'],
        tasks: ['browserify']
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
            '<%= path.dist %>/**/*.html',
            '<%= path.dist %>/css/*.css'
          ]
        }
      }
    }

  });


  grunt.registerTask('default', ['eslint', 'clean']);

  grunt.registerTask('serve', ['eslint', 'clean', 'assemble', 'sass', 'browserify', 'browserSync', 'watch']);

  grunt.registerTask('build', ['eslint', 'clean', 'assemble', 'sass', 'browserify']);

};
