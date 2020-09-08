const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HouseSchema = new Schema({
    houseTitle:{
        type:String,
    },
    price:{
        type:Number
    },
    location:{
        type:String,
    },
    image_url:{
        type:String,
    },
    desc:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    createdBy:{
        type:String,
    },
    updatedBy:{
        type:String, 
    }

})

const House = mongoose.model('house', HouseSchema);

module.exports = House;