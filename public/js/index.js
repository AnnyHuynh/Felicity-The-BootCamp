toggleVisibility = function(id) {
  var e = document.getElementById(id);

  if (e.id === 'signin') {
    e.style.display = 'none';
    $('#signup').css('display', 'block');
  } else {
    e.style.display = 'none';
    $('#signin').css('display', 'block');
  }

  if (e.id === 'userprofile') {
    if (e.style.display === 'none') {
      $('#userprofile').css('display', 'block');
      $('.findgroups').css('display', 'none');
    } else {
      $('#userprofile').css('display', 'none');
      $('.findgroups').css('display', 'block');
    }
  }
};

$('#register-button').click(function(event) {
  event.preventDefault();
  $('#register').removeClass('register-display');
  $('.login-form').hide('slow');
});

$('#sign-in').click(function() {
  console.log('sign me in please');
  $('#register').addClass('register-display');
  $('.login-form').show('slow');
});
