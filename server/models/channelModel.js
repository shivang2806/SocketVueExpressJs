const mongoose = require('mongoose');

const channelSchema = mongoose.Schema(
    {
        user_one: {
            type: String,
            require: [true, "Please add user one data"]
        },
        user_two: {
            type: String,
            require: [true, "Please add user two data"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("channel", channelSchema);