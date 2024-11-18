import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Avatar from "@mui/material/Avatar";
import randomUser from "../assets/randomAvatar.png";
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
          <InputAdornment position="end">
            <Avatar
              src={randomUser}
              sx={{
                width: 23,
                height: 23,
                marginRight: "5px",
              }}
            />
          </InputAdornment>
        }
      />
    </form>
  );
}

export default CustomInput;
