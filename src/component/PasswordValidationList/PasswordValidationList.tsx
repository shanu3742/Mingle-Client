import { LinearProgress } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";

export const passwordRules = [
  { message: "Minimum 8 characters", validate: (value:string) => value.length >= 8 },
  {
    message: "At least one uppercase letter",
    validate: (value:string) => /[A-Z]/.test(value),
  },
  {
    message: "At least one lowercase letter",
    validate: (value:string) => /[a-z]/.test(value),
  },
  {
    message: "At least one number",
    validate: (value:string) => /[0-9]/.test(value),
  },
  {
    message: "At least one special character",
    validate: (value:string) => /[@$!%*?&]/.test(value),
  },
];

export const onValidatedRules = (password:string) => {
  return passwordRules.filter(({ validate }) => validate(password));
};
const PasswordValidationList = ({ password }:{password:string}) => {
  const validatedRules = onValidatedRules(password);
  return (
    <>
      <div>
        {validatedRules.length !== 0 && (
          <LinearProgress
            variant="buffer"
            value={(100 / passwordRules.length) * validatedRules.length}
            valueBuffer={Math.min(
              (100 / passwordRules.length) * validatedRules.length + 10,
              100
            )}
            color={
              validatedRules.length < 3
                ? "error"
                : validatedRules.length === passwordRules.length
                ? "success"
                : "warning"
            }
          />
        )}
        {passwordRules.map(({ message, validate }) => (
          <div
            key={message}
            className={`flex items-center ${
              validate(password) ? "text-green-500" : "text-red-500"
            } text-transition`}
          >
            {validate(password) ? <FaCheck /> : <RxCross2 />}
            <div>
              <b>{message}</b>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PasswordValidationList;
