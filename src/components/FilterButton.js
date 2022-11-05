import { Button, Box } from "@mui/material";

function FilterButton(props) {
  return (
    <Box m="5px" p="5px">
      <Button
        xs={1}
        variant="contained"
        size="small"
        type="button"
        aria-pressed={props.isPressed}
        onClick={() => props.setFilter(props.name)}
      >
        Show {props.name}
      </Button>
    </Box>
  );
}

export default FilterButton;
