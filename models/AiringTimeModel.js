const mongoose = require('mongoose');
const { Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const airingTimeSchema = new Schema({
    movie_id: {
        type: String,
        required: true
    },
    a_id: {
        type: Number, 
        index: true
    }, 
    a_type: {
        type:String,
        required: false
    },   
    a_date: {
        type: Date,
        required: false
    }, 
    a_starttime: {
        type: Date,
        required: false
    },
    a_endtime: {
        type: Date,
        required: false
    }, 
    a_price: {
        type: Number,
        required: false
    },
    a_cinema: {
        type: Number,
        required: false
    },
    a_seat: [
        {
            s_id:{
                type: Number, 
                index: true
            },
            position: {
                type: String,
                required: false
            },
            is_occupied: {
                type: Boolean,
                required: false
            }
        }
    ]
}, { timestamps: true });
airingTimeSchema.plugin(AutoIncrement, { inc_field: 'a_id' });
airingTimeSchema.path('a_seat').schema.plugin(AutoIncrement, { inc_field: 's_id' });

module.exports = mongoose.model('AiringTime', airingTimeSchema);
