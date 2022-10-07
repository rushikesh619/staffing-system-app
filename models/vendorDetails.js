const mongoose = require("mongoose");

const vendorDetails = mongoose.Schema({
    fullName:{        
        type: String,  
        required: true
    },
    vendorName:{
        type: String,  
        required: true
    },    
    technology:{
        type: String,  
        required: true
    },
    resumeFile:{
        type: String,
        required: true
    }

},
{timestamps: true}
)

module.exports = mongoose.model("VendorDetails", vendorDetails);