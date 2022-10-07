const vendors = require("./vendors");

module.exports = (app) => {
    console.log("we are in apis")
    app.use("/api/vendors", vendors);
}