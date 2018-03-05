


module.exports = function(grunt) {

	grunt.initConfig({

		clean: {
			js: ['stella.min.js']
		},

		concat : {
			options: {
				separator: '',
			},
			dist: {
				src : ['src/stella.js', 'src/*.js', 'src/**/*.js','export.js'],
				dest : 'stella.min.js'
			}
		},

		uglify: {
			options: {
				sourceMap: false,
				sourceMapName: 'stella.map',
				compress: {
					drop_console: false
				}
			},
			my_target : {
				files : {
					//'stella.min.js' : ['src/stella.js', 'src/*.js', 'src/**/*.js','src/export.js']
					'stella.min.js' : ['stella.min.js']
				}
			}
		},

		watch: {
			js: {
				options: {
					nospawn: true
				},
				files: ['src/stella.js', 'src/*.js', 'src/**/*.js'],
				tasks: [
					'clean:js',
					'concat',
					//'uglify'
				]
			}
		}

	});



	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);



};
