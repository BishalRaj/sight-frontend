import {
  FormControl,
  InputLabel,
  Link,
  Grid,
  Typography,
  TextField,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthLayout from "../layout/authLayout";
import { FcGoogle } from "react-icons/fc";
import { CgFacebook } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { color, image } from "../static";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
const Login = () => {
  const formWidth = {
    width: "50%",
    "@media (max-width: 426px)": {
      width: "80%",
    },
  };
  const { register, handleSubmit } = useForm();
  const handleLogin = (data) => {
    alert(`email: ${data.email}  pwd: ${data.password} `);
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
      onSubmit={handleSubmit(handleLogin)}
    >
      <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
        Sign in to Sight
      </Typography>
      <Typography variant="body2" component="div" className="mb-3 mt-2">
        Enter your details below.
      </Typography>
      <Box container>
        <Grid container>
          <Grid xs={4} md={4} lg={4} className=" d-flex justify-content-start">
            <Button
              variant="outlined"
              className="py-2"
              sx={{ borderColor: "#D5DADF", width: "95%" }}
            >
              <FcGoogle size={30} />
            </Button>
          </Grid>
          <Grid xs={4} md={4} lg={4} className=" d-flex justify-content-center">
            <Button
              variant="outlined"
              className="py-2"
              sx={{
                borderColor: "#D5DADF",
                width: "95%",
                color: "#2D88FF",
              }}
            >
              <CgFacebook size={30} />
            </Button>
          </Grid>
          <Grid xs={4} md={4} lg={4} className=" d-flex justify-content-end">
            <Button
              variant="outlined"
              className="py-2"
              sx={{
                borderColor: "#D5DADF",
                width: "95%",
                color: "#161B22",
              }}
            >
              <BsGithub size={30} />
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Divider flexItem className="py-1" sx={{ color: "#808080" }}>
        OR
      </Divider>
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

      <Box container>
        <Grid container>
          <Grid md={6}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    sx={{ color: `${color.default} !important` }}
                  />
                }
                label={<Typography variant="caption">Remember me</Typography>}
              ></FormControlLabel>
            </FormGroup>
          </Grid>
          <Grid md={6}>
            <Typography
              variant="caption"
              align="right"
              className="h-100 d-flex align-items-center justify-content-end"
            >
              <Link
                href="/register"
                underline="none"
                color={color.default}
                fontWeight="bold"
              >
                Forgot Password?
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Button
        variant="contained"
        sx={{ textTransform: "none", backgroundColor: color.default }}
        className="py-2"
        type="submit"
      >
        <Typography>Login</Typography>
      </Button>
    </Stack>
  );

  const redirectComponent = {
    text: "Don't have an account?",
    redirectText: "Get started",
    link: "/register",
  };
  return (
    <AuthLayout
      formComponent={formComponent}
      redirectComponent={redirectComponent}
      authCardText={"Hi, Welcome back"}
      authCardImg={image.login}
    />
  );
};

export default Login;
