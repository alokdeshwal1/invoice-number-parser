// Karma configuration
// Generated on Sun Jun 14 2015 15:31:59 GMT+0300 (IDT)
//require("babel/polyfill");

module.exports = function (config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha'],


		// list of files / patterns to load in the browser
		files: [
			'node_modules/babel-core/browser-polyfill.js',
			'tests/karma-tests.js'
		],


		// list of files to exclude
		exclude: [],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'tests/karma-tests.js': ['webpack', 'sourcemap']
		},

		webpack: { //kind of a copy of your webpack config
			devtool: 'inline-source-map', //just do inline source maps instead of the default
			module: {
				loaders: [
					{ exclude: /node_modules/, test: /\.js$/, loader: 'babel-loader' }
				]
			}
		},
		webpackServer: {
			noInfo: true //please don't spam the console when running in karma!
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['PhantomJS'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true
	});
};