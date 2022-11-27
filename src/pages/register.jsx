import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layout/authLayout";
import authService from "../services/auth.service";
import { color, image } from "../static";
const Register = () => {
  const formWidth = {
    width: "50%",
    "@media (max-width: 426px)": {
      width: "80%",
    },
  };
  let navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const handleRegister = async (data) => {
    // alert(`email: ${data.email}  pwd: ${data.password} `);
    let res = await authService.register(data);
    if (res.token == null || res.msj) {
      alert(res.msj);
      return;
    }

    localStorage.setItem("user", res.token);
    navigate("/dashboard");
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formComponent = (
    <Stack
      spacing={2}
      sx={formWidth}
      component="form"
      onSubmit={handleSubmit(handleRegister)}
    >
      <Typography
        variant="h4"
        component="div"
        color={color.default}
        sx={{ fontWeight: 700 }}
      >
        Sign up
      </Typography>

      <TextField
        id="outlined-basic"
        label="Full Name"
        variant="outlined"
        type="text"
        sx={{ width: "100%" }}
        {...register("name", { required: true })}
      />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        type="email"
        sx={{ width: "100%" }}
        {...register("email", { required: true })}
      />

      <FormControl sx={{ width: "100%" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          {...register("password", { required: true })}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <Button
        variant="contained"
        sx={{ textTransform: "none", backgroundColor: color.default }}
        className="py-2"
        type="submit"
      >
        <Typography>Register</Typography>
      </Button>
    </Stack>
  );

  const redirectComponent = {
    text: "Already an account?",
    redirectText: "Login",
    link: "/",
  };
  return (
    <AuthLayout
      formComponent={formComponent}
      redirectComponent={redirectComponent}
      authCardText={"Hi, Welcome back"}
      authCardImg={image.register}
    />
  );
};

export default Register;
