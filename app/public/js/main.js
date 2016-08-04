// $('button').click(function(event){
$('select').change(function(event){  
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




  // $.ajax({
  //   url:'https://www.govtrack.us/api/v2/vote/?congress=114&order_by=-created&limit=10',
  //   // https://www.govtrack.us/api/v2/vote
  //   // ***** URL for 114th congress last 10 votes
  //   type: 'get',
  //   dataType: 'json',
  //   // data: {
  //   //   legislator: params[:govtrack_id]
  //   // },
  //   success: function(response) {
  //     bill = response.objects[0].question;
  //     link = response.objects[0].link;
  //     console.log(response);
  //     console.log(bill);
  //     $('#question').append(bill);
  //     $('#link').append(link);

  //   },
  //   error: function(error) {
  //     console.log("error " + error );
  //   }
  // });

  $.ajax({
    url: 'https://www.govtrack.us/api/v2/committee_member',
    type: 'get',
    dataType: 'json',
    success: function(response) {
       params = window.location.href;
       govtrack = parseInt(params.slice(-6));
      
      console.log(response);

        var match = [];
        for (var i = 0; i < response.objects.length; i++) {

          if (govtrack == response.objects[i].person.id) {
            var committee = response.objects[i].committee.name;
            var role = response.objects[i].role;
            var comRes = role + " of " + committee; 
            $('.committee').append(comRes);
            console.log(committee);
            console.log(role);
          } 
          else 
            console.log('no committee')        
          }
      // console.log(match);
      // console.log(response);
      // console.log(response.objects.length)
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
    params = window.location.href;
    govtrack = parseInt(params.slice(-6));
    for (var i = 0; i < response.objects.length; i++) { 
      if (govtrack == response.objects[i].sponsor.id) {
        $('.bill-title').append(response.objects[i].title);
        $('.bill-date').append(response.objects[i].introduced_date);
        console.log(i);
      }
    }
  },
  error: function(error) {
    console.log("error " + error);
  }
});



// '<li><a href=' + response[i][2] + '>' + 
// API Key: 787675d0ccec48fca8a936dc60ec27c6
