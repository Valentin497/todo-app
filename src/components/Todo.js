import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  InputAdornment,
  InputLabel,
  ListItem,
} from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const Todo = (props) => {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column">
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">
            Editing {props.name}
          </InputLabel>
          <Input
            id={props.id}
            value={newName}
            required
            onChange={handleChange}
            startAdornment={<InputAdornment position="start"></InputAdornment>}
          />
        </FormControl>
        <Box>
          <Button
            type="button"
            color="error"
            startIcon={<CancelIcon />}
            onClick={() => setEditing(false)}
          >
            Cancel
          </Button>
          <Button type="submit" color="success" startIcon={<SaveIcon />}>
            Save
          </Button>
        </Box>
      </Box>
    </form>
  );

  const viewTemplate = (
    <Box>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked={props.completed} />}
          label={props.name}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
      </FormGroup>
      <Box>
        <Button
          size="medium"
          color="success"
          startIcon={<EditIcon />}
          onClick={() => setEditing(true)}
        >
          Edit
        </Button>
        <Button
          size="medium"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => props.deleteTask(props.id)}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );

  return <ListItem>{isEditing ? editingTemplate : viewTemplate}</ListItem>;
};
export default Todo;
