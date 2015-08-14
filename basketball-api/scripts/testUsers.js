var models = require('../models/index');

models.User.create({
  firstName: 'Bob',
  lastName: 'Feller',
  email: 'bob@bob.com'
}).then(function(user){
  console.log('User ' + user.firstName + ' has been created. Whoopee!');
}, function(err){
  console.log(err);
});
