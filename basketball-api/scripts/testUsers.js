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

models.User.create({
  firstName: 'Max',
  lastName: 'Blaushild',
  email: 'hello@hello.com'
}).then(function(user){
  console.log('whoppeee!!!!!!! ' + user.firstName + ' has been created!');
}).catch(function(err){
  console.log(err);
});
