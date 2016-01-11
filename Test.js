VenusCollection = new Mongo.Collection(null);
queryHistory = new Mongo.Collection(null);
var markers =[];

if (Meteor.isClient) {
 Template.example.events({
 'click #exporCSV' :function (event,template){
       var data = VenusCollection.find().fetch();
     var csvData = new Array();
     csvData.push('"Name","City","Street","Lat","Lng"');
     data.forEach(function(item, index, array) {
  
      csvData.push('"' + item.venueName + '","' + item.city + '","'+ item.street + '","' + item.lat + '","' + item.lng + '"');

    })
  var fileName = "GeoVenues.csv";
  var buffer = csvData.join("\n");
  var blob = new Blob([buffer], {
    "type": "text/csv;charset=utf8;"      
  });

  var link = document.createElement("a");
      
  if(link.download !== undefined) { 
    link.setAttribute("href", window.URL.createObjectURL(blob));
    link.setAttribute("download", fileName);
    }

    link.innerHTML = "Export to CSV";
  link.click();
    
 }, 
 'keypress #venueQuery':function(event,template){

   if(event.keyCode === 13){
      params = { 
               ll:"35.68949, 139.69171", 
               query:template.$('#venueQuery').val(),              
          }
    queryHistory.insert({
      name:$('#venueQuery').val(),
      ll:params.ll,
      radius:12,
      date: new Date().formatMMDDYYYY(),
    })

    harja.find(params, function(error, result) {

      if(!error){ 

          if(result.response.venues.length === 0){ 

           console.log("nothing find");

          }else{
            //clear all future
            VenusCollection.remove({});    
            for (var i = 0; i < markers.length; i++) {
               markers[i].setMap(null); 
             }
            //end 
           queryResult = result.response.venues 

            queryResult.forEach(function(venues,index){   

             street = venues.location.formattedAddress
             lat = venues.location.lat
             lng = venues.location.lng
             city = venues.location.city
             venueName = venues.name;

           VenusCollection.insert({   
                  lat : lat.toFixed(7),    
                  lng : lng.toFixed(7),
                  venueName :venueName,
                  query : params.query,
                  street : street,
                  city : city,})      
                   
            var myLatLng = {lat:lat, lng:lng};
            var marker = new google.maps.Marker({
                 position: myLatLng,
                 map: map,
                 title: venueName
                 });
            markers.push(marker);
             });       
          }
        }
      });

    }
   }

 });
Template.example.helpers({
  isRegister: function(){
    return  (Meteor.userId()) ? Meteor.userId() : null
  }
});
Template.example.helpers({
  vCount: function(){
    return  (VenusCollection.find().count() > 0) ? VenusCollection.find().count() : null
  }
});
Template.example.helpers({
  vhCount: function(){
    return  (queryHistory.find().count() > 0) ? queryHistory.find().count() : null
  }
});

Template.example.events({
  'click .delete' : function(){
    queryHistory.remove(this._id)
  }

});
Template.example.venues = function(){

    return VenusCollection.find();
 
}
Template.example.querys = function(){

    return queryHistory.find();
 
}
Date.prototype.formatMMDDYYYY = function(){
    return (this.getMonth() + 1) + 
    "/" +  this.getDate() +
    "/" +  this.getFullYear();
}
}
if (Meteor.isServer) {
  Meteor.startup(function () {
  harja.init({
  id: '5KONIFY4FJYUHAL1HUCSFNRE1CZWWKPYHW0SSUK2QIYJ0BNL',
  secret: 'UDSM3BZ4JURF1N05QXZZ3OFALM4YP4S1TUR4MK1JMLLISC13',
  authOnly: false 
})

  });
}
