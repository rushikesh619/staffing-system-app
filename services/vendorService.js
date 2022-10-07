const Vendors = require("../models/vendors");
const VendorDetails = require("../models/vendorDetails");
var os = require("os");

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
    const domain = os.hostname();
    console.log("domain: ", domain)

  
    let vendorDetails = new VendorDetails({
      fullName: fullName,
      vendorName: vendorName,
      technology: technology,
      resumeFile: `https://staffing-system-app-rushikesh.herokuapp.com/resume/${/[^/]*$/.exec(file.tempFilePath)[0]}`
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
