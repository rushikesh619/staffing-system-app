import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import {
  Typography,
  TextField,
  Button,
  Divider,
  Box,
  MenuItem
} from "@mui/material";
import axios from "axios";

const DevContainer = styled("div")({
    textAlign: "center",
    maxHeight: "50%",
    maxWidth: "50%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    margin: "auto"
});

export default function VendorDetails() {
  useEffect(() => {
    axios
      .get("/api/vendors/getAllVendors")
      .then((res) => {
        const allVendors = res.data.result.map((e) => {
          return e.vendorName;
        });

        console.log("allVendors: ", allVendors);

        setVendorsList(allVendors);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [newVendor, setNewVendor] = useState("");
  const [fullName, setFullName] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [technology, setTechnology] = useState("");
  const [vendorsList, setVendorsList] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);

  const handleEnter = (event, field) => {
    if (event.keyCode === 13) {
      switch (field) {
        case "newVendor":
          setNewVendor(event.target.value);
          break;
        case "fullName":
          setFullName(event.target.value);
          break;
        case "vendorName":
          setVendorName(event.target.value);
          break;
        case "technology":
          setTechnology(event.target.value);
          break;
        default:
          console.log("field not match");
      }
    }
  };

  const handleAddNewVendor = () => {
    axios
      .post("/api/vendors/addNewVendor",{name:newVendor})
      .then((res) => {
        console.log("addNewVendor: ", res);
        setVendorsList([...vendorsList, newVendor]);
        setNewVendor("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePostVendorsDetails = () => {
    let data = new FormData();
    data.append("resumeFile", resumeFile);
    data.set("fullName", fullName);
    data.set("vendorName", vendorName);
    data.set("technology", technology);
    axios
    .post("/api/vendors/postVendorsDetails",data)
    .then((res) => {
      console.log("postVendorsDetails: ", res);
      setResumeFile(null);
      setFullName("");
      setVendorName("");
      setTechnology("");
      window.location.href = "/"
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <DevContainer>
      <Box m={2} pt={3}>
        <Typography variant="h4" align="center" gutterBottom mt={4}>
          You can add new Vendors from here
        </Typography>

        <TextField
          id="newVendor"
          required
          label="Vendor Name"
          variant="outlined"
          margin="normal"
          fullWidth
          value={newVendor}
          onKeyDown={(e) => handleEnter(e, "newVendor")}
          onChange={(e) => {
            setNewVendor(e.target.value);
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => handleAddNewVendor()}
          defaultValue="will focus"
          disabled={!newVendor}
        >
          Save Vendor
        </Button>
      </Box>

      <Divider />

      <Box m={2}>
        <TextField
          id="fullName"
          required
          label="Full Name"
          variant="outlined"
          margin="normal"
          fullWidth
          value={fullName}
          onKeyDown={(e) => handleEnter(e, "fullName")}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />

        <TextField
          id="technology"
          required
          label="Technology"
          variant="outlined"
          margin="normal"
          fullWidth
          value={technology}
          onKeyDown={(e) => handleEnter(e, "technology")}
          onChange={(e) => {
            setTechnology(e.target.value);
          }}
        />

        <TextField
          id="vendorName"
          required
          select
          label="Vendor Name"
          margin="normal"
          fullWidth
          value={vendorName}
          onChange={(e) => {
            setVendorName(e.target.value);
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {vendorsList.map((e) => (
            <MenuItem value={e}>{e}</MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ marginBottom: 2, marginTop: 2 }}
        >
          Upload
          <input
            hidden
            accept="application/msword, application/pdf"
            multiple
            type="file"
            onChange={(e) => {
              setResumeFile(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
          />
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={()=>handlePostVendorsDetails()}
          defaultValue="will focus"
          disabled={!fullName || !vendorName || !technology || !resumeFile}
        >
          Save Details
        </Button>
      </Box>
    </DevContainer>
  );
}
