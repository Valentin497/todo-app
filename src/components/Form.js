import { Button, TextField, Box } from "@mui/material";
import { useState } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";

function Form(props) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddTask(name);
    setName("");
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" justifyContent="center">
        <TextField
          sx={{ marginRight: "50px" }}
          label="Add task here!"
          variant="standard"
          required
          autoComplete="off"
          value={name}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" startIcon={<AddTaskIcon />}>
          Add task
        </Button>
      </Box>
    </form>
  );
}

export default Form;
