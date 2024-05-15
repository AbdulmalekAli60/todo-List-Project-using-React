import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TasksContext } from "../Contexts/TasksContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// Components
import Todo from "./Todo";
import Alert from "./Alert";
import getDate from "./getDateAndTime";
// Libraries
import { v4 as uuidv4 } from "uuid"; // i will us this library in this file as uuidv4

//Hocks
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

export default function TodoList() {
  const { Tasks, setNewTask } = useContext(TasksContext);
  const [showAlert, setShowAlert] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [addDialogInputs, setAddDialogInputs] = useState({
    title: "",
    description: "",
  });

  const [displayedTasksType, setDisplayedTasksType] = useState("all");

  //filtering array
  function ChangedDisplayedType(event) {
    // console.log(event.target.value)
    setDisplayedTasksType(event.target.value);
  }

  const completedTasks = Tasks.filter((t) => {
    return t.isCompleted; //checks each element (t) in the array and keeps only the elements where the isCompleted is true
  });

  const notCompleted = Tasks.filter((t) => {
    return !t.isCompleted;
  });

  let tasksToBeRendered = Tasks;

  if (displayedTasksType === "completed") {
    tasksToBeRendered = completedTasks;
  } else if (displayedTasksType === "notCompleted") {
    tasksToBeRendered = notCompleted;
  } else {
    tasksToBeRendered = Tasks;
  }
  //filtering array

  const todos = tasksToBeRendered.map((todo) => {
    return <Todo key={todo.id} todo={todo} />;
  });

  useEffect(() => {
    const stroageTasks = JSON.parse(localStorage.getItem("tasks"));
    setNewTask(stroageTasks);
  }, []); // the second parameter is for when you want to call the the function, and its alwaye an array and you put inside it the "dependencies" determining when to call the function when they change

  function handleAddDialogClose() {
    //Clicking at any location will close the dialog
    setShowAddDialog(false);
  }
  function handleAddConfirm() {
    //confrim inside dialog

    if (addDialogInputs.title === "" && addDialogInputs.description === "") {
      alert("يجب عليك إضافة عنوان أو تفاصيل المهمة");
      return;
    }
    const NewTask = {
      id: uuidv4(),
      title: addDialogInputs.title,
      description: addDialogInputs.description,
      isCompleted: false,
      dateAndTime: getDate(),
    };

    setNewTask([...Tasks, NewTask]);
    localStorage.setItem("tasks", JSON.stringify([...Tasks, NewTask]));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    setShowAddDialog(false);
  }
  function showAddingDialog() {
    setShowAddDialog(true);
  }
  //Handlers

  return (
    <>
      {/* Add Dialog */}
      <Dialog
        onClose={handleAddDialogClose}
        open={showAddDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> اضافة مهمة جديدة </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="العنوان"
            fullWidth
            variant="standard"
            value={addDialogInputs.title}
            onChange={(event) => {
              setAddDialogInputs({
                ...addDialogInputs,
                title: event.target.value,
              });
            }}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="تفاصيل المهمة"
            fullWidth
            variant="standard"
            value={addDialogInputs.description}
            onChange={(event) => {
              setAddDialogInputs({
                ...addDialogInputs,
                description: event.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>إغلاق</Button>
          <Button
            onClick={handleAddConfirm}
            style={{ color: "#8bc34a" }}
            autoFocus
          >
            أضافة
          </Button>
        </DialogActions>
      </Dialog>
      <Alert message="تم تغيير بيانات المهمة بنجاح" openSnack={showAlert} />

      {/* === Add Dialog === */}
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Card sx={{ minWidth: 275 }} color="text.secondary" gutterBottom>
          <CardContent
            style={{
              height: "calc(100vh - 130px)",
              overflow: "scroll",
              scrollbarWidth: "none",
            }}
          >
            <Typography style={{ fontWeight: "bold" }} variant="h2">
              مهامي
            </Typography>
            <Divider />

            {/* Filter Buttons */}
            <ToggleButtonGroup
              value={displayedTasksType}
              exclusive
              aria-label="text alignment"
              style={{ marginTop: "30px", direction: "ltr" }}
              onChange={ChangedDisplayedType}
              color="secondary"
            >
              <ToggleButton value="notCompleted">غير منجز</ToggleButton>
              <ToggleButton value="completed">منجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
            {/*==== Filter Buttons====*/}

            {/* Todos */}
            {/* <Todo /> */}
            {todos}
            {/* ======Todos==== */}

            {/* Input + add */}
            <Grid style={{ marginTop: "20px" }} container spacing={2}>
              <Grid
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
                xs={8}
              ></Grid>

              <Grid
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
                xs={12}
              >
                <Button
                  style={{ width: "100%", height: "100%" }}
                  variant="contained"
                  onClick={() => {
                    showAddingDialog();
                  }}
                >
                  إضافة
                </Button>
                <Alert message="تمت الاضافة بنجاح" openSnack={showAlert} />
              </Grid>
            </Grid>
            {/*=== Input + add ===*/}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
