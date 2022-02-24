const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema(
{
    username: {
        type: string,
        unique: true,
        allowNull: false,
        trim: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        //must match a valid email address (regex?)
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    },
    { 
    toJSON: {
        virtual:true,
    }
    });

    module.exports = UserSchema;