import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <span
      onClick={() => navigate(-1)}
      className="cursor-pointer font-extrabold"
    >
      <KeyboardBackspaceIcon />
    </span>
  );
};

export default BackButton;
