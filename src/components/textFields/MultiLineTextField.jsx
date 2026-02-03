import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function MultilineTextField(props) {
  const { isFullWidth, widthParam, placeholder } = props;
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1 },
        width: `${widthParam}`,
        marginRight: 1,
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-multiline-flexible"
        multiline
        fullWidth={isFullWidth}
        maxRows={4}
        placeholder={placeholder}
      />
    </Box>
  );
}
