$(document).ready(function(){
  var uuid = $('#progressBar').data('progress_bar_uuid');
  // form submission
  $('form.progressbar').submit(function(){
    // Prevent multiple submits
    if ($.data(this, 'submitted')) return false;
    // Append X-Progress-ID uuid form action
    // POST DEFAULT
    this.action = this.action.split('?')[0];
    this.action += '?X-Progress-ID=' + uuid;
    // Update progress bar
    function update_progress_info() {
      $.getJSON(upload_progress_url, {'X-Progress-ID': uuid}, function(data, status){
        //console.log(data);
        if(data){
          $('#progressBar').removeAttr('hidden');  // show progress bar if there are datas
          var progress = parseInt(data.received, 10)/parseInt(data.size, 10)*100;
          $('#progressBar').attr('value', progress);
        }
        else {
          $('#progressBar').attr('hidden', '');  // hide progress bar if no datas
        }
        window.setTimeout(update_progress_info, 1000*0.5);
      });
    }
    window.setTimeout(update_progress_info, 1000*0.5);
    $.data(this, 'submitted', true); // mark form as submitted.
    return true;
  });
});