const mongoose = require("mongoose");

const vendors = mongoose.Schema({
    vendorName:{        
        type: String,  
        required: true
    },

},
{timestamps: true}
)

module.exports = mongoose.model("Vendors", vendors);