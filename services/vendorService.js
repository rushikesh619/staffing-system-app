const Vendors = require("../models/vendors");
const VendorDetails = require("../models/vendorDetails");
const path = require('path');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

async function uploadFile(file) {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: `fileupload/${Date.now()}-${file.name}`, // put all image to fileupload folder with name scanskill-${Date.now()}${file.name}`
    Body: file.data,
    ACL: 'public-read'
  };
  const data = await s3.upload(params).promise();
  return data.Location; // returns the url location
}

const getAllVendors = async () => {
  try {
    let vendors = await Vendors.find({});
    return vendors;
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

const addNewVendor = async (newVendor) => {
  try {
    let vendorResult = await Vendors.find({ vendorName: newVendor });
    console.log("newVendor: ", newVendor, "vendorResult: ", vendorResult);
    if (vendorResult.length) {
      console.log(vendorResult);
      throw { message: "Duplicate Entry" };
    }
    let VendorDetails = new Vendors({
      vendorName: newVendor,
    });
    console.log(VendorDetails);
    const result = await VendorDetails.save();
    return result;
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

const postVendorsDetails = async (fullName, vendorName, technology, file) => {
  try {
    let vendorResult = await Vendors.find({ vendorName });
    console.log( "vendorResult: ", vendorResult);
    if (!vendorResult.length) {
      console.log(vendorResult);
      throw { message: "no vendor found with this name" };
    }
    console.log(fullName, vendorName, technology, file);

    // cloudinary.config({
    //   cloud_name: process.env.CLOUDINARY_NAME,
    //   api_key: process.env.CLOUDINARY_API_KEY,
    //   api_secret: process.env.CLOUDINARY_API_SECRET,
    // });

    console.log("file: ", file);

    // const fileName = Date.now() + "-" + file.name;

    // file.mv(`./uploads/` + fileName, function(err){
    //   if(err){
    //     console.log(err);
    //     throw err;
    //   }
    // });

    const fileUrl = await uploadFile(file);
  
    let vendorDetails = new VendorDetails({
      fullName: fullName,
      vendorName: vendorName,
      technology: technology,
      resumeFile: fileUrl
    });
    
    result = await vendorDetails.save();
    const response = {
      message: "OK",
      result: result
    }
    console.log(response);
    return response;

  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

const getVendorsDetails = async () => {
  try {
    let vendors = await VendorDetails.find({});
    return vendors;
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
}

module.exports = {
  getAllVendors,
  addNewVendor,
  postVendorsDetails,
  getVendorsDetails
};
