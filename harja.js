 (function () { 
 var Foursquare;
  var fs_config = {};  

    Foursquare = {
  'initialization': function(config) {
        var ClientConfig;
        ClientConfig=config;
        ClientConfig.id = config.Id;
        ClientConfig.skey = config.key;
         console.log(ClientConfig); 
     _.extend(fs_config, ClientConfig);
     
  }};
});