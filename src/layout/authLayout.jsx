import { Avatar, Card, Grid, Link, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { Image, Stack } from "react-bootstrap";
import { color, image } from "../static";

const AuthLayout = ({
  formComponent,
  redirectComponent,
  authCardText,
  authCardImg,
}) => {
  const cardWidth = {
    width: "92%",
    "@media (max-width: 769px)": {
      width: "100%",
    },
  };
  return (
    <Box sx={{ flexGrow: 1, height: "100vh" }} className="p-3">
      <Grid container sx={{ height: "100%" }}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "block",
            "@media (max-width:769px)": { display: "none" },
          }}
        >
          <Card
            sx={{
              height: "100%",
              borderRadius: "2.5%",
              width: cardWidth,
            }}
            className="shadow "
          >
            <Stack className="h-100 px-3">
              <Box
                component="div"
                sx={{ height: "5%", width: "100%" }}
                className="px-3 mt-3"
              >
                <Image width={100} src={image.logo} />
              </Box>

              <Box
                component="div"
                sx={{ height: "95%" }}
                className="w-100 d-flex align-items-center justify-content-center"
              >
                <Box component="div">
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ fontWeight: 700 }}
                  >
                    {authCardText}
                  </Typography>
                  <Avatar sx={{ width: 400, height: 400 }} src={authCardImg} />
                </Box>
              </Box>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box component="div" className=" w-100 " sx={{ height: "4%" }}>
            <Typography
              align="right"
              variant="caption"
              className="d-flex justify-content-end"
            >
              {redirectComponent.text} {"  "}
              <Link
                href={redirectComponent.link}
                underline="none"
                fontWeight="bold"
                style={{ color: "#00ab55 !important" }}
                color={color.default}
              >
                <span style={{ color: color.default }}>
                  {redirectComponent.redirectText}
                </span>
              </Link>
            </Typography>
          </Box>
          <Box
            className=" w-100 d-flex align-items-center justify-content-center"
            sx={{ height: "96%" }}
          >
            {formComponent}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthLayout;
