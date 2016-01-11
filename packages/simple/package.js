Package.describe({
  name: 'mplatts:simple',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('underscore');
  api.use('http')
  api.addFiles('harjaClient.js', 'client');
  api.addFiles('harjaServer.js', 'server');
  
 
	  api.export ('harja');
	  api.export ('capitalise','server');
  
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('mplatts:simple');
  api.addFiles('simple-tests.js');
});
