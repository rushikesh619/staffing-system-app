const router = require("express").Router();
const VendorServcices = require("../services/vendorService");

router.get("/getAllVendors", async (req, res) => {
  try {
    console.log("inside getAllVendors");
    const result = await VendorServcices.getAllVendors();
    console.log(result);
    res.status(200).json({ result: result });
  } catch (ex) {
    console.log(ex);
    res.status(500).json(ex);
  }
});

router.post("/addNewVendor", async (req, res) => {
  try {
    console.log("inside addNewVendor");
    console.log("body.name", req.body.name);
    if (!req.body.name) {
      res.status(400).json({ message: "Bad Request" });
    }
    const result = await VendorServcices.addNewVendor(req.body.name);
    res.status(200).json({ result: result });
  } catch (ex) {
    console.log(ex);
    res.status(500).json(ex);
  }
});

router.post("/postVendorsDetails", async (req, res) => {
  try {
    console.log("inside postVendorsDetails");
    console.log("req: ", req);
    console.log("body", req?.body);
    const requestBody = req?.body;
    const file = req?.files?.resumeFile
    console.log("file", file);
    if (
      !requestBody?.fullName ||
      !requestBody?.vendorName ||
      !requestBody?.technology ||
      !file
    ) {
      res.status(400).json({ message: "Bad Request, Missing fields" });
    }
    const result = await VendorServcices.postVendorsDetails(
      requestBody?.fullName,
      requestBody?.vendorName,
      requestBody?.technology,
      file
    );
    res.status(200).json({ result: result });
  } catch (ex) {
    console.log(ex);
    res.status(500).json(ex);
  }
});

router.get("/getVendorsDetails", async (req, res) => {
  try {
    console.log("inside getVendorsDetails");
    const result = await VendorServcices.getVendorsDetails();
    console.log(result);
    res.status(200).json({ result: result });
  } catch (ex) {
    console.log(ex);
    res.status(500).json(ex);
  }
});

module.exports = router;
