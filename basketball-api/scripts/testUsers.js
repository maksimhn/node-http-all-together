var models = require('../models/index');

// .then version (takes 2 arguments: success and fail callbacks)
models.User.create({
  firstName: 'Bob',
  lastName: 'Feller',
  email: 'bob@bob.com'
}).then(function(user){
  console.log('User ' + user.firstName + ' has been created. Whoopee!');
}, function(err){
  console.log(err);
});

// .catch verion (1 callback for each version)
// models.User.create({
//   firstName: 'Max',
//   lastName: 'Blaushild',
//   email: 'piu@piu.com'
// }).then(function(user){
//   console.log('User ' + user.firstName + ' has been created. Whoopee!');
// }).catch(function(err){
//   console.log(err);
// });
