'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/');

var Schema = mongoose.Schema;

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



module.exports = mongoose.model('Team', teamSchema);
