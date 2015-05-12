var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;
var url = require('url');

module.exports = router;

var textContent="something";

router.get('/', function(req, res) {
  res.render('cmdline', { title: 'cmdline' });
 
});

router.get('/sample', function(req, res){
  console.log(req);
  res.end("string from server");
});

router.get('/spawn', function(req, res){
  var cmd = req.query["cmdline"];
  server_exec(cmd, function(return_value){
    res.end(return_value);
  });
});

router.get('/*', function(req, res){
  var cmd = server_getCmd(req.url);

  server_exec(cmd, function(return_value){
    res.end(return_value);
  });  
});

function server_execWithArgs(cmd, callback){
  var child;
  child =  exec(cmd, {timeout: 1000}, function(error, stdout, stderr){
      callback(stdout + stderr);
      if(error!== null)
        console.log('exec error:' + error);          
    });
}

// child process: exec
function server_exec(cmd, callback) {
  var child;
  child = exec(cmd, {timeout: 1000}, function(error, stdout, stderr){
    callback(stdout + stderr);
    if(error !== null){ 
      console.log('exec error:' + error);
    }
  });
} 

// extract cmd from string
function server_getCmd(data) {
  var input = data.toString();
  var args_array = input.split('+');
  var cmd = args_array[0].replace('/', '');
  return cmd;
}

