/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  admin: function(req, res, next){
    res.view();

    
     User.findOne(1).exec(function(e,userOne){
       });   
  },
  connectSocket: function(req, res, next){

    if (req.isSocket){

        User.find({}).exec(function(e,listOfUsers){
          User.subscribe(req.socket,listOfUsers);
          console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'users\'.');


            User.findOne(1).exec(function(e,userOne){
              console.log("aqui-----");
              console.log(userOne);
              var subscribers = User.subscribers(userOne);
              var listSockets =[];
              var flag = 0
               _.each(subscribers, function(subscriber) {
                  listSockets.push({id: subscriber.id, position: flag})
                  console.log(listSockets)

                  sails.sockets.emit(subscriber.id, 'setPosition', {id: subscriber.id, position: flag});
                  flag= flag+1;
                });
               User.publishUpdate(1,listSockets);

             });          
          
        });
     
    }

  },
	test: function(req, res, next){

	
		
        var send = req.param('send');
        var message = req.param('message');
        var socketId;


        User.findOne({id: 1}).exec(function(err, userInstance) {
        console.log(userInstance)
});


        if (send && req.isSocket){

          // User.update(1,{name:'Heisenberg'}).exec(function update(err,updated){
          // 	console.log(updated)
          //   User.publishUpdate(2,{ name:'daniel' });
          // });

        if(send == 1){
          console.log('entro auqi y manda '+message)
          sails.sockets.emit(message, 'privateMessage', {from: req.session.userId, msg: 'Hi!'});
          //User.publishUpdate(message,"hola");
        }


 User.findOne(1).exec(function(e,userOne){
              // Get all of the sockets that are subscribed to user #1

            
                var subscribers = User.subscribers(userOne);
            
             _.each(subscribers, function(subscriber) {
                 User.publishUpdate(1,{id:subscriber.id});
                 sails.sockets.emit(subscriber.id, 'privateMessage', {id:subscriber.id});
              });





              // Subscribe them all to userOne's best friend, too
            
          });



       // User.publishUpdate(1,"hola");

    //       User.create({name:nameSent})
				//     .exec(function(error,data_from_client){
				// 	console.log(data_from_client);

          

				// }); 



        } else if (req.isSocket){

        User.find({}).exec(function(e,listOfUsers){
          User.subscribe(req.socket,listOfUsers);
        console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'users\'.');
         

        });
     
        } else{
   
        res.view();






      }
	},
  listSockets: function(req, res, next){


       User.findOne(1).exec(function(e,userOne){
              var subscribers = User.subscribers(userOne);
              var listSockets =[];
              var flag = 0
               _.each(subscribers, function(subscriber) {
                  listSockets.push({id: subscriber.id, position: flag})
                  console.log(listSockets)
                  flag= flag+1;
                });
               User.publishUpdate(1,listSockets);

             });




  },
  SendMessage: function(req, res, next){
      
  var data = req.param('data');
  
 



        User.findOne(1).exec(function(e,userOne){
              var subscribers = User.subscribers(userOne);

              

             
              var flag = 0
               _.each(subscribers, function(subscriber) {

                 console.log("sockets list")
               console.log(subscriber.id)
                  
                  sails.sockets.emit(subscriber.id, 'slide', {data:data[flag]});
                  flag= flag+1;
                });
             

             });          


  }
};

