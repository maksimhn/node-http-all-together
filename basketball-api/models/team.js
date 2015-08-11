'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/basketballapp');

var Schema = mongoose.Schema;

var Ownership = require('./ownership');

var playerSchema = new Schema({

  name: {
    type: String,
    required: true
  },

  team: { type: Schema.Types.ObjectId, ref: 'Team' },

  jerseyNumber: {
    type: Number,
    required: true
  },

  position: {
    type: String,
    enum: { values: 'PG SG SF PF C'.split(' '),
            message: 'enum failed at path {PATH} with value {VALUE}'
          }
  }
});

var teamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  players: [playerSchema]
});

// dependent destroy substitute
teamSchema.post('remove', function(team){
  Ownership.destroy({where : { teamId: team._id.toString()} }).then(function(){
    console.log('We are in SYNC');
  });
});



module.exports = mongoose.model('Team', teamSchema);
