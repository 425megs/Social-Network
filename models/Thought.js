const { Schema, model, Types } = require('mongoose');
// moment for timestamps
const moment = require('moment');

// Related to ThoughtSchema
const ReactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // full timestamp with date and time last accesssed
        get: (timeStamp) => moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a')
    }
},
{
    toJSON: {
        getters: true,
    }
});

// Model takes the ReactionSchema data and stores it in a key called reactions
const ThoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timeStamp) => moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
});

// Returns length of the reactions array from inividual users Thoughts
ThoughtSchema.virtual('reactionCount').get(function (){
    return this.reactions.length;
});

// Creating model with Thought's schema
const Thought = model('Thought', ThoughtSchema)

module.exports = Thought
