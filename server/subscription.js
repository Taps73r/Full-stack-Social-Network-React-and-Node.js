const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    follower: { type: Number, ref: 'User', required: true }, // Using your custom userId
    following: { type: Number, ref: 'User', required: true }  // Using your custom userId
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
