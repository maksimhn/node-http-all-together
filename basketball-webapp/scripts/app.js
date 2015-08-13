var App = (function(){

  var apiURL = "http://localhost:8888";

  var _renderUsers = function(users){
    var userTemplater = Handlebars.compile($('#users-template').html());
    var html = userTemplater({users: users});
    $('#content').html(html);
  }

  var _renderUser = function(user){
    var userTemplater = Handlebars.compile($('#user-show-template').html());
    var html = userTemplater({user: user});
    $('#content').html(html);
  }

  var _renderTeams = function(teams){
    var teamsTemplater = Handlebars.compile($('#teams-template').html());
    var html = teamsTemplater({teams: teams});
    $('#content').html(html);
  }

  var _renderTeam = function(team){
    var teamTemplater = Handlebars.compile($('#team-show-template').html());
    var html = teamTemplater({team: team});
    $('#content').html(html);
  }

  var _renderPlayer = function(player){
    var playerTemplater = Handlebars.compile($('#player-show-template').html());
    var html = playerTemplater({player: player});
    $('#player-list').append(html);
  }

  var _renderNewUser = function(user){
    var userTemplater = Handlebars.compile($('#new-user-template').html());
    var html = userTemplater({user: user});
    $('#user-list').append(html);
  }

  var _renderUsersTeams = function(teams){
    var teamsTemplater = Handlebars.compile($('#user-teams-template').html());
    var html = teamsTemplater({teams: teams});
    $('#teams').append(html);
  }

  var init = function(){
    //we apply users click handler
    $('#users-index').on('click', function(){
      $.ajax({
        url: apiURL + '/users',
        method: "GET"
      }).then(function(response){
        _renderUsers(JSON.parse(response));
      });
    });

    $('#teams-index').on('click', function(){
      $.ajax({
        url: apiURL + '/teams',
        method: "GET"
      }).then(function(response){
        _renderTeams(JSON.parse(response));
      });
    });

    //we apply user show click handler
    $('#content').on('click', '.user-show', function(){
      $.ajax({
        url: apiURL + '/users/' + $(this).closest('.user').data('id'),
        method: "GET"
      }).then(function(response){
        _renderUser(JSON.parse(response));
      });
    });

    //we apply team show click handler
    $('#content').on('click', '.team-show', function(){
      $.ajax({
        url: apiURL + '/teams/' + $(this).closest('.team').data('name'),
        method: "GET"
      }).then(function(response){
        _renderTeam(JSON.parse(response));
      });
    });

    //we apply team show click handler
    $('#content').on('click', '.delete-team', function(){
      var $teamProfile = $('#team-profile');
      $.ajax({
        url: apiURL + '/teams/' + $teamProfile.data('name'),
        method: "DELETE"
      }).then(function(response){
        $teamProfile.remove();
      });
    });

    $('#content').on('click', '.delete-ownership', function(){
      var $team = $(this).closest('.team');
      var $userProfile = $('#user-profile');
      $.ajax({
        url: apiURL + '/users/' + $userProfile.data('id') + '/teams/' + $team.data('name') + '/ownerships',
        method: "DELETE"
      }).then(function(response){
        $team.remove();
      });
    });

    $('#content').on('click', '.delete-user', function(){
      var $userProfile = $('#user-profile');
      $.ajax({
        url: apiURL + '/users/' + $userProfile.data('id'),
        method: "DELETE"
      }).then(function(response){
        $userProfile.remove();
      });
    });

    $('#content').on('click', '.show-teams', function(){
      var $userProfile = $('#user-profile');
      $.ajax({
        url: apiURL + '/teams?id=' + $userProfile.data('id'),
        method: "GET"
      }).then(function(response){
        _renderUsersTeams(JSON.parse(response));
      });
    });

    $('#content').on('click', '#new-player', function(e){
      e.preventDefault();
      var player = {
        name: $('#name').val(),
        position: $('#position').val(),
        jerseyNumber: $('#jersey-number').val(),
      };

      $.ajax({
        url: apiURL + '/teams/' + $('#team-profile').data('name') + '/players',
        method: "POST",
        data: JSON.stringify(player)
      }).then(function(response){
        _renderPlayer(JSON.parse(response));
      })
    })


    $('#content').on('click', '#new-user', function(e){
      e.preventDefault();
      var player = {
        firstName: $('#first-name').val(),
        lastName: $('#last-name').val(),
        email: $('#email').val(),
      };

      $.ajax({
        url: apiURL + '/users',
        method: "POST",
        data: JSON.stringify(player)
      }).then(function(response){
        _renderNewUser(JSON.parse(response));
      })
    });

    $('#content').on('click', '.delete-player', function(e){
      $player = $(this).closest('.player');
      $.ajax({
        url: apiURL + '/teams/' + $('#team-profile').data('name') + '/players/' + $player.data('number'),
        method: "DELETE",
      }).then(function(response){
        $player.remove();
      })
    });

    $('#content').on('click', '.add-ownership', function(e){
      $team = $(this).closest('.team');
      $input = $team.find('.user-id');

      var ownership = {
        userId: $input.val(),
        teamName: $team.data('name')
      }

      $.ajax({
        url: apiURL + '/ownerships',
        method: "POST",
        data: JSON.stringify(ownership)
      }).then(function(response){
        $team.remove();
      })
    });

  }

  return {
    init: init
  };

})();

$(document).ready(function(){
  App.init();
});
