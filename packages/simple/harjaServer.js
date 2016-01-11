(function (){
	var Harja;
	var hrConfig = {};
	var userInit;

	harja = {                                                           
  init: function(config) {                                               
   	      userInit = config;
   	      userInit.id = config.id;
   	      userInit.secret = config.secret;    

   	     _.extend(hrConfig, userInit);   	 	                        
 	 }                                                                    
	};   
Meteor.methods({                                                        
  'search': function(config) {                                
    userInit.query = config.query;   
    userInit.ll = config.ll; 
                                     
                                                                 
    if(hrConfig.authOnly && !this.userId)                              
      throw new Meteor.Error('Permission denied');                     
                                                                  
    var result, query = {                                              
      client_id: hrConfig.id,                                          
      client_secret: hrConfig.secret,                                
      v: 20130815                                                  
    };                                                                  
                                                                       
    _.extend(userInit, query);                                       
                                                                       
                                                  
                                                                         
    try {                                                                
      result = HTTP.get('https://api.foursquare.com/v2/venues/search', { 
        params: userInit,                                                  
        timeout: 20000                                                  
      });                                                            
    } catch(error) {                                                     
      return error;                                                     
    }                                                                   
                                                                         
    return result.data;                                                  
  }                                                                      
});         
}).call(this);  
