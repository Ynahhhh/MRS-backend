const mongoose = require('mongoose')
const { Schema } = mongoose
const AutoIncrement = require('mongoose-sequence')(mongoose);


// attributes
//  {m_title, m_desc, m_genre, m_mpa, m_hrs, m_poster}
const moviesSchema = new Schema({
    m_id: {
        type: Number, 
        index: true
    }, 
    m_title: {
        type: String,
        required: false
    },
    m_desc: {
        type: String,
        required: false
    },
    m_genre: {
        type:String,
        required: false
    },
    m_mpa: {
        type: String,
        required: false
    },
    m_hrs: {
        type: Number,
        required: false
    },
    m_poster: {
        type: String,
        required: false
    },
    startdate: {
        type: Date,
        required: false
    },
    enddate: {
        type: Date,
        required: false
    }
}, {timestamps: true});

moviesSchema.plugin(AutoIncrement, { inc_field: 'm_id' });
module.exports = mongoose.model('Movies', moviesSchema);