var express = require('express');
var router = express.Router();
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/upload', (req, res) =>{

  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true
  })

  // Ver o que parse faz
  form.parse(req, (err, fileds, files) =>{

    res.json({files})

  })

 

})

module.exports = router;
