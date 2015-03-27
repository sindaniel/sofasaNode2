/**
 * PictureController
 *
 * @description :: Server-side logic for managing pictures
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var path = require('path');
module.exports = {
	'new': function (req, res) {
		
        	res.view();

    	},

	create: function (req, res, next) {

	
			// var uploadFile = req.file('name1');
			// var img1, img2;

	  // uploadFile.upload({ dirname: '../../assets/images'},function onUploadComplete (err, files) {				
  
	  //   	if (err) return res.serverError(err);									
	  //   	//	IF ERROR Return and send 500 error
			// img1 = files[0].fd.split("/");

	  //   	console.log();
	    	

	  //   	return res.json({
   //      files: uploadedFiles,
   //      textParams: req.params.all()
   //    });


	  //   });


 var uploadOptions = {
        dirname: sails.config.appPath + '/assets/books',
        saveAs: function(file){
            return req.param('titulo')+path.extname(file.filename);
        },
        maxBytes: 20 * 1000 * 1000
    }

    req.file('name1').upload(uploadOptions,function(err,files){
        if(err){
            return res.serverError(err);
        }
        else{
            console.log(files);
        }
    });

	

	      // Picture.create( req.params.all(), function pictureCreated(err, picture) {
	      //  	if (err) {
	       	     
	      //        	req.session.flash = {
	      //              		err: err
	      //           	}

	      //           	return res.redirect('/picture/new');
	      //       }else{
	            	
	      //       }

	      //       //res.json(books);
	      //       	res.redirect('/picture/new');
	      // });
	},

};

