import { Grid, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { IcPageHeader } from "@ukic/react";
import { Login } from "@mui/icons-material";
import axios from "axios";
import apiLocation from "../components/apiLocation";
import { useAppContext } from "../App.context";
import { useEffect } from "react";

export default function LoginView() {
  const { setCurrentUser } = useAppContext();

  const [loginErrored, setLoginErrored] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  function handleLogin() {
    setLoading(true);
    axios
      .post(
        `${apiLocation}/login/`,
        `username=${username}&password=${password}`
      )
      .then((response) => {
        const data = response.data;
        if (data.status === "success") {
          // window.localStorage.setItem("user", JSON.stringify(data.name));
          setLoginErrored(false);
          setCurrentUser(data.name);
        } else {
          setLoginErrored(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoginErrored(true);
        setLoading(false);
      });
  }

  return (
    <>
      <IcPageHeader heading="AJO Property Manager Login" />
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: 2 }}
      >
        <Grid item>
          <TextField
            error={loginErrored}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            sx={{ textAlign: "center" }}
          />
        </Grid>
        <Grid item>
          <TextField
            error={loginErrored}
            type="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            sx={{ textAlign: "center" }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<Login />}
            disabled={
              username === undefined || password === undefined || loading
            }
            onClick={() => handleLogin()}
            sx={{ textAlign: "center" }}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
