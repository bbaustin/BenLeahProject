$('select').change(function(event) {  
  event.preventDefault();

  $.ajax({
    url: '/',
    type: 'post',
    // dataType: 'json',
    data: { 
      state: $('select[name=state]').val() 
    },
    success: function(response) {
      console.log(typeof response);
      console.log(response);
      $('p').html("");
      $('p').append('<h3>...now choose a legislator from the list below.</h3>');
      for (var i=0; i <response.length; i++) {
        $('p').append('<li> <a href='+response[i][2] + '>' + response[i][0] + '</a> </li>');
      }
    },
    error: function(error) {
      console.log("error: " + error);
    }
  });
});
// API Key: 787675d0ccec48fca8a936dc60ec27c6

$.ajax({
  url: 'https://www.govtrack.us/api/v2/committee_member',
  type: 'get',
  dataType: 'json',
  success: function(response) {
    var params = window.location.href;
    var govtrack = parseInt(params.slice(-6));      
    var counter = 0; 
    for (var i = 0; i < response.objects.length; i++) {
      if (govtrack == response.objects[i].person.id) {
        var committee = response.objects[i].committee.name;
        var role = response.objects[i].role_label;
        var comRes = role + " of " + committee; 
        $('.committee').append('<li>' + comRes + '</li>');
        counter++;
      } 
    }
    if (counter === 0) {
      $('.committee').append('<li>This government official is not currently a member of any congressional committees.</li>');
    }
  },
  error: function(error) {
    console.log("error " + error);
  }
});


$.ajax({
  url: 'https://www.govtrack.us/api/v2/bill?sort=-introduced_date',
  type: 'get',
  dataType: 'json',
  success: function(response) {
    var params = window.location.href;
    var govtrack = parseInt(params.slice(-6));
    var counter = 0;
    for (var i = 0; i < response.objects.length; i++) { 
      if (govtrack == response.objects[i].sponsor.id) {
        $('.bill').append('<li>' + response.objects[i].title + '</li>');
        $('.bill').append('<li>' + response.objects[i].introduced_date + '</li>');
        counter++;
        console.log(counter);
        console.log(i);
      }
    }
    if (counter === 0) {
      $('.bill').append('<li>This government official has not sponsored any bills in 2016.</li>');
    }
  },
  error: function(error) {
    console.log("error " + error);
  }
});



// '<li><a href=' + response[i][2] + '>' + 
// API Key: 787675d0ccec48fca8a936dc60ec27c6
