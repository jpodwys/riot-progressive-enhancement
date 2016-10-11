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
        outfile : './views/partials/_index-critical.ejs',
        css : './assets/css/master-styles.css',
        url : 'http://localhost:3000/index-critical-css'
      },
      entryList: {
        outfile : './views/partials/_entries-critical.ejs',
        css : './assets/css/master-styles.css',
        url : 'http://localhost:3000/entries-critical-css'
      },
      viewEntry: {
        outfile : './views/partials/_entry-critical.ejs',
        css : './assets/css/master-styles.css',
        url : 'http://localhost:3000/entry-critical-css'
      },
      editEntry: {
        outfile : './views/partials/_edit-critical.ejs',
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
