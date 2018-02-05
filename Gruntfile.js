module.exports = function(grunt) {
  grunt.initConfig({
    wait: {
      options: {
        delay: 10000
      },
      pause: {
        options: {
          before: function(options) {
            console.log('pausing %dms', options.delay);
          },
          after: function() {
            console.log('pause end');
          }
        }
      }
    },

    penthouse: {
      all: {
        width : 768,
        height : 10000,
        keepLargerMediaQueries: true,
        outfile : './assets/css/styles.css',
        css : './assets/css/master-styles.css',
        url : 'http://localhost:4000/all-critical-css'
      },
      index : {
        width : 768,
        height : 10000,
        keepLargerMediaQueries: true,
        outfile : './views/partials/_index-critical.ejs',
        css : './assets/css/master-styles.css',
        url : 'http://localhost:4000/index-critical-css'
      },
      entryList: {
        width : 768,
        height : 10000,
        keepLargerMediaQueries: true,
        outfile : './views/partials/_entries-critical.ejs',
        css : './assets/css/master-styles.css',
        url : 'http://localhost:4000/entries-critical-css'
      },
      viewEntry: {
        width : 768,
        height : 10000,
        outfile : './views/partials/_entry-critical.ejs',
        css : './assets/css/master-styles.css',
        url : 'http://localhost:4000/entry-critical-css'
      },
      editEntry: {
        width : 768,
        height : 10000,
        keepLargerMediaQueries: true,
        outfile : './views/partials/_edit-critical.ejs',
        css : './assets/css/master-styles.css',
        url : 'http://localhost:4000/edit-critical-css'
      }
    },

    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: './assets/css',
            src: ['styles.css'],
            dest: './assets/css',
            ext: '.css'
          },
          {
            expand: true,
            cwd: './views/partials',
            src: ['_index-critical.ejs'],
            dest: './views/partials',
            ext: '.ejs'
          },
          {
            expand: true,
            cwd: './views/partials',
            src: ['_entries-critical.ejs'],
            dest: './views/partials',
            ext: '.ejs'
          },
          {
            expand: true,
            cwd: './views/partials',
            src: ['_entry-critical.ejs'],
            dest: './views/partials',
            ext: '.ejs'
          },
          {
            expand: true,
            cwd: './views/partials',
            src: ['_edit-critical.ejs'],
            dest: './views/partials',
            ext: '.ejs'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-wait');
  grunt.loadNpmTasks('grunt-penthouse');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['wait', 'penthouse', 'cssmin']);
};
