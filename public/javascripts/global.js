
var textContent = "";
// DOM Ready =============================================================
$(document).ready(function() {        // jquery .ready(handler) 
//$(function(){                         // jquery .ready(handler) equivalent syntax
//jQuery(document).ready(function ($) {   // jquery aliasing jQuery Namespace (when $ shortcut is no longer available)

  $("#textboxEnter").click(function(event){
    var value = $("#textbox_cmdline_id").val();
    if(value){
      cmdWithArgs(value);
    }
  }); 

  $("#textbox_cmdline_id").keypress(function(e) {
    //alert("handler for .keypress() called.");
    if(e.which == 13) {
      var value = $("#textbox_cmdline_id").val();
      if(value) {
        cmdWithArgs(value);
      }
    }
  });
});

function getServerOutput(cmd) {
  // Empty content string
  var textContent = '';
  
  // jQuery AJAX call for textContent
  $.get( '/cmdline/'+cmd, function( data ) {
    textContent = data;
      // Inject the whole content string into our existing HTML textArea
      $('#textArea').text(data);
  });
}

function cmdWithArgs(value){
  
  var input = value.toString(); 
  var args_array = input.split(' '); 
 
  $.ajax({
      type: 'GET',
      url:  '/cmdline/spawn',
      data: { "cmdline": input },
      success: function(response){ 
        $('#textArea').text(response);
      },
  });
}


function sampleFunc() {
  $.get('/cmdline/sample', function( data ){
    $('#textArea').text(data);
  });
}

function debugPrint(info){
  alert(info);
}

