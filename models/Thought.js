const { Schema, model, Types } = require("mongoose");
const moment = require('moment');

const ThoughtSchema = new Schema (
{
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date, 
        default: Date.now(),
        get: (timeStamp) => moment(timeStamp).format('MMM Do YYYY, h:mm:ss a')
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema]
    ,
},
);

