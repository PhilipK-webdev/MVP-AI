import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { MdMessage } from "react-icons/md";
function CustomInput({ handleInputSubmit }) {
  return (
    <form
      onSubmit={handleInputSubmit}
      style={{ display: "flex", marginTop: "10px" }}
    >
      <Input
        id="standard-adornment-amount"
        disableUnderline={true}
        type="text"
        autoFocus={true}
        name="userInput"
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          padding: "10px",
          borderRadius: "20px",
          border: "1px solid white",
          color: "white",
          width: "100%",
        }}
        startAdornment={
          <InputAdornment
            position="end"
            style={{
              backgroundColor: "rgb(240, 240, 240, 0.6)",
              borderRadius: "10px",
              fontSize: "25px",
              padding: "5px",
            }}
          >
            <MdMessage />
          </InputAdornment>
        }
      />
    </form>
  );
}

export default CustomInput;
