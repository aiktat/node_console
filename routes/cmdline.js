var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;
var events = require('events');
var eventEmitter = new events.EventEmitter();

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

eventEmitter.on('server_exec completed', function(cmd){
  var timestamp = new Date();
  console.log(timestamp.getTime() + ":" + cmd);
});


// child process: exec
function server_exec(cmd, callback) {
  var child;

  var timestamp = new Date();
  console.log(timestamp.getTime() + ":" + "server_exec");
  
  child = exec(cmd, {timeout: 2000}, function(error, stdout, stderr){
    callback(stdout + stderr);
    eventEmitter.emit('server_exec completed', cmd);
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


