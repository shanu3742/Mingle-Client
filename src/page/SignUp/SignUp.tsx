//react import
import React, { useState } from "react";
//app file import
import { AuthLayout } from "../../layout";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PasswordValidationList from "../../component/PasswordValidationList/PasswordValidationList";

const SignUp = () => {
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    confirmPassword: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoginPending, setIsLoginPending] = useState(false);

  // event handle
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onInputUpdate = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setRegisterInfo((p) => {
      return { ...p, [name]: value };
    });
  };
  console.log("register info", registerInfo);
  return (
    <AuthLayout
      pageTitle="Create Account"
      pageDescription="Create an account and explore app"
    >
      <form className="py-4 px-4 relative">
        <div className="my-4">
          <TextField
            id="standard-basic"
            name="email"
            autoComplete="email"
            value={registerInfo.email}
            label="Enter Email/user id"
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) => onInputUpdate(e)}
          />
        </div>
        <div className="my-4">
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel htmlFor="password-input">Enter Password</InputLabel>
            <OutlinedInput
              id="password-input"
              name="password"
              type={showPassword ? "text" : "password"}
              value={registerInfo.password}
              onChange={(e) => onInputUpdate(e)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Enter Password"
            />
          </FormControl>
        </div>
        <div className="my-4">
          <TextField
            id="confirm-password"
            name="confirmPassword"
            autoComplete="confirm password"
            value={registerInfo.confirmPassword}
            label="Enter confirm password"
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) => onInputUpdate(e)}
          />
        </div>

        <div className="my-4 flex justify-center">
          <LoadingButton
            loading={isLoginPending}
            disabled={isLoginPending}
            type="submit"
            variant="contained"
            sx={{ background: "var(--mingle-primary-color)", width: "100%" }}
            startIcon={<AppRegistrationIcon />}
          >
            Log in
          </LoadingButton>
        </div>
      </form>
      <div className="my-4">
        <PasswordValidationList password={registerInfo.password} />
      </div>
    </AuthLayout>
  );
};

export default SignUp;
