const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
    {
        from: {
            type: String,
            require: [true, "Please add from user data"]
        },
        to: {
            type: String,
            require: [true, "Please add to user data"]
        },
        message: {
            type: String,
            require: [true, "Please add to message"]
        },
        channel_id: {
            type: String
        },
        is_read: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("message", messageSchema);