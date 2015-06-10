module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: ['dist'],
      build: ['build/<%= pkg.version %>.<%= grunt.template.today("yyyymmdd") %>'],
      release: ['releases/<%= pkg.version %>'],
      site: ['_gh_pages']
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['*.js', 'src/*.js']
    },

    jscs: {
      options: {
        config: '.jscsrc'
      },
      files: [/*'*.js', */'src/*.js']
    },

    uglify: {
      options: {
        preserveComments: 'some'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': 'src/<%= pkg.name %>.js',
          'dist/<%= pkg.name %>.data.min.js': 'src/<%= pkg.name %>.data.js'
        }
      },
      site: {
        src: 'docs/js/docs.js',
        dest: '_gh_pages/js/docs.js'
      }
    },

    replace: {
      dist: {
        options: {
          prefix: '@',
          patterns: [{
            match: 'VERSION',
            replacement: '<%= pkg.version %>'
          }, {
            match: 'YEAR',
            replacement: (new Date()).getFullYear()
          }, {
            match: 'DATE',
            replacement: (new Date()).toISOString()
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: 'dist/*',
          dest: 'dist/'
        }]
      }
    },

    autoprefixer: {
      options: {
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24', // Firefox 24 is the latest ESR
          'Explorer >= 8',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6'
        ]
      },
      core: {
        options: {
          map: false
        },
        src: 'dist/<%= pkg.name %>.css',
        dest: 'dist/<%= pkg.name %>.css'
      }
    },

    csscomb: {
      options: {
        config: '.csscomb.json'
      },
      core: {
        src: 'dist/<%= pkg.name %>.css',
        dest: 'dist/<%= pkg.name %>.css'
      }
    },

    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      files: ['src/*.css']
    },

    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*',
        noAdvanced: true
      },
      dist: {
        src: 'dist/<%= pkg.name %>.css',
        dest: 'dist/<%= pkg.name %>.min.css'
      },
      site: {
        src: 'docs/css/docs.css',
        dest: '_gh_pages/css/docs.css'
      }
    },

    htmlmin: {
      dist: {
        options: {
          minifyJS: true,
          minifyCSS: true,
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          '_gh_pages/index.html': 'docs/index.html'
        }
      }
    },

    copy: {
      dist: {
        expand: true,
        flatten: true,
        src: 'src/*',
        dest: 'dist'
      },
      build: {
        expand: true,
        flatten: true,
        src: 'dist/*',
        dest: 'build/<%= pkg.version %>.<%= grunt.template.today("yyyymmdd") %>'
      },
      release: {
        expand: true,
        flatten: true,
        src: 'dist/*',
        dest: 'releases/<%= pkg.version %>'
      },
      docsCSS: {
        expand: true,
        flatten: true,
        src: 'dist/*.css',
        dest: 'docs/css/'
      },
      docsJS: {
        expand: true,
        flatten: true,
        src: 'dist/*.js',
        dest: 'docs/js/'
      },
      siteCSS: {
        expand: true,
        flatten: true,
        src: 'dist/*.css',
        dest: '_gh_pages/css/'
      },
      siteJS: {
        expand: true,
        flatten: true,
        src: 'dist/*.js',
        dest: '_gh_pages/js/'
      }
    },

    watch: {
      files: [
        'src/<%= pkg.name %>.js'
      ],
      tasks: 'jshint'
    }
  });

  // Loading dependencies
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build', ['clean:build', 'copy:build']);
  grunt.registerTask('release', ['clean:release', 'copy:release']);
  grunt.registerTask('docs', ['copy:docsCSS', 'copy:docsJS']);
  grunt.registerTask('site', ['clean:site', 'uglify:site', 'cssmin:site', 'copy:siteCSS', 'copy:siteJS', 'htmlmin']);

  grunt.registerTask('default', ['clean:dist', 'jshint', 'jscs', 'uglify:dist', 'copy:dist', 'replace', 'csslint', 'autoprefixer', 'csscomb', 'cssmin:dist', 'build', 'release', 'docs', 'site']);
};
