const { Schema, model, Types } = require('mongoose');

// New user model
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        // removes white space
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        //Regex email verification
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    // Refrences Thought model, allows user to have more than one thought
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],

    // Self referencing User model array to retrieve friends
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

},
{
    //display on client side
    toJSON: {
        virtuals: true,
    }
});

// Returns length of friends array
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length
});

const User = model('User', UserSchema);

module.exports = User