import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Background video styling
const BackgroundVideo = styled("video")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: -1,
});

// Centered form styling
const FormWrapper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
  maxWidth: 400,
  margin: "auto",
  position: "relative",
  zIndex: 1,
  borderRadius: theme.shape.borderRadius,
}));

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // role: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    // if (!formData.role) {
    //   newErrors.role = "Please select a role";
    // }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      await axios.post('http://localhost:3000/api/user/login', formData)
        .then(response => {
          console.log(response.data.data)
          if (response.data.status) {
            localStorage.setItem('user', JSON.stringify(response.data.data))
            setFormData({ email: "", password: "" });
            toast.success("Login successful!");
            // if (response.data.data.role == 'organizer') {
            //   navigate("/organizer")
            // }
            // else if (response.data.data.role == "exhibitor") {
            //   navigate("/exhibitor")
            // }
            // else if (response.data.data.role == 'attendee') {
            //   navigate("/")
            // }

            if(response.data.data.role == 'attendee'){
              navigate("/")
            }else{
              navigate(`/${response.data.data.role}`) 
            }
          } else {
            toast.error(response.data.message);
          }

        })
        .catch(error => console.error("Error fetching data: ", error));
    } else {
      setErrors(validationErrors);
      Object.values(validationErrors).forEach((error) =>
        toast.error(error)
      );
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Video */}
      <BackgroundVideo autoPlay loop muted>
        <source src={"/video.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>

      {/* Login Form */}
      <FormWrapper
        sx={{ width: "400px", backgroundColor: "rgba(234, 234, 242, 0.7)" }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
        >
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.password}
            helperText={errors.password}
          />
          {/* <FormControl fullWidth required error={!!errors.role}>
            <InputLabel>Role</InputLabel>
            <Select name="role" value={formData.role} onChange={handleChange}>
              <MenuItem value="organizer">Organizer</MenuItem>
              <MenuItem value="exhibitor">Exhibitor</MenuItem>
              <MenuItem value="attendee">Attendee</MenuItem>
            </Select>
          </FormControl> */}
          <Button variant="contained" type="submit" size="large" fullWidth>
            Login
          </Button>
        </Box>
      </FormWrapper>


    </Box>
  );
};

export default LoginPage;
