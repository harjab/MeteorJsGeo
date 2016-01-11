harja = {
  find: function(options, callback) {
    Meteor.call('search', options, function(error, data) {
      callback(error, data);
    });
  }
};
