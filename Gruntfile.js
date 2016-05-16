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
      index : {
        outfile : './views/partials/index-critical.ejs',
        css : './assets/css/master-styles.css',
        url : 'http://localhost:3000/index-critical-css'
      },
      entryList: {
        outfile : './views/partials/entries-critical.ejs',
        css : './assets/css/master-styles.css',
        url : 'http://localhost:3000/entries-critical-css'
      },
      viewEntry: {
        outfile : './views/partials/entry-critical.ejs',
        css : './assets/css/master-styles.css',
        url : 'http://localhost:3000/entry-critical-css'
      },
      editEntry: {
        outfile : './views/partials/edit-critical.ejs',
        css : './assets/css/master-styles.css',
        url : 'http://localhost:3000/edit-critical-css'
      }
    },

    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: './views/partials',
            src: ['index-critical.ejs', 'index-critical.min.ejs'],
            dest: './views/partials',
            ext: '.min.css'
          },
          {
            expand: true,
            cwd: './views/partials',
            src: ['entries-critical.ejs', 'entries-critical.min.ejs'],
            dest: './views/partials',
            ext: '.min.css'
          },
          {
            expand: true,
            cwd: './views/partials',
            src: ['entry-critical.ejs', 'entry-critical.min.ejs'],
            dest: './views/partials',
            ext: '.min.css'
          },
          {
            expand: true,
            cwd: './views/partials',
            src: ['edit-critical.ejs', 'edit-critical.min.ejs'],
            dest: './views/partials',
            ext: '.min.css'
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
