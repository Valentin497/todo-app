import { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { Box, List, Typography } from "@mui/material";

const FILTER_MAP = {
  All: () => true,
  Ongoing: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun}`;

  return (
    <Box display="flex" justifyContent="center" marginTop="50px">
      <Box
        width="30vw"
        minWidth="330px"
        backgroundColor="lightGray"
        borderRadius="12px"
        p="20px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        flexWrap="nowrap"
      >
        <Typography variant="h3" m="12px" marginBottom="50px" align="center">
          Today's tasks
        </Typography>
        <Form onAddTask={addTask} />
        <Box display="flex" justifyContent="center" m="12px" p="12px">
          {filterList}
        </Box>
        <Typography component="h4" variant="h4" align="center">
          {headingText}
        </Typography>

        <List>{taskList}</List>
      </Box>
    </Box>
  );
}

export default App;
