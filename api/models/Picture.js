/**
* Picture.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	name1:'string',
   	name2:'string',
	position1: 'integer',
	position2: 'integer',
   	order:'integer',
   	time:'integer',
   	owner:{
       model:'car'
   	}
  },
  beforeCreate:function(values, next){
 
  	Picture.find({ where: {},limit: 10, sort: 'order DESC' }).exec(function (err, response) {
        console.log(response[0].order)
        values.order = response[0].order+1;
        next();
    });
  	
  	
  }
};

