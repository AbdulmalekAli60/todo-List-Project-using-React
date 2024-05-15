import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// Icons
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { TasksContext } from "../Contexts/TasksContext";
import { useContext } from "react";
import { useState } from "react";

//Components
import Alert from "./Alert";
export default function Todo({ todo }) {
  const { Tasks, setNewTask } = useContext(TasksContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [UpdateDialogInputs, setUpdateDialogInputs] = useState({
    title: todo.title, //inisital values
    description: todo.description,
  });
  const [showAlert, setShowAlert] = useState(false);

  //Event Handlers
  function handleCheckClick() {
    const updatedTodos = Tasks.map((t) => {
      if (t.id === todo.id) {
        return { ...t, isCompleted: !t.isCompleted };
      }
      return t;
    });
    setNewTask([...updatedTodos]);
    localStorage.setItem("tasks", JSON.stringify(updatedTodos));
  }

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleDeleteDialogClose() {
    //Clicking at any location will close the dialog
    setShowDeleteDialog(false);
  }

  function handelDeleteConfirm() {
    const UpdatedTodos = Tasks.filter((t) => t.id !== todo.id); //creates a new array by filtering the Tasks array. It checks each element (t) in the array and keeps only the elements where the id doesn't match the id of the todo item
    setNewTask(UpdatedTodos);
    localStorage.setItem("tasks", JSON.stringify(UpdatedTodos));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  }

  function handleUpdateClose() {
    // for closing insode the dialog
    setShowUpdateDialog(false);
  }

  function handleUpdateClick() {
    // for the button on the card
    setShowUpdateDialog(true);
  }
  function handleUpdateConfirm() {
    // for clicking confirm inside the update dialog
    const UpdateExistigTodo = Tasks.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          title: UpdateDialogInputs.title,
          description: UpdateDialogInputs.description,
        };
      } else {
        // if the id doesn't match the id of the todo item i clicked, it will return the original todo item
        return t;
      }
    });
    setNewTask(UpdateExistigTodo);
    localStorage.setItem("tasks", JSON.stringify(UpdateExistigTodo));
    setShowUpdateDialog(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  }
  // Event Handelers

  return (
    <>
      {/* confirm Delete Dialog */}
      <Dialog
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متأكد من حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن هذه العملية
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>إغلاق</Button>
          <Button
            onClick={handelDeleteConfirm}
            style={{ color: "red" }}
            autoFocus
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>
      <Alert message={"تم حذف المهمة بنجاح"} openSnack={showAlert} />

      {/*=== confirm Delete Dialog === */}

      {/* Update Dialog */}
      <Dialog
        onClose={handleUpdateClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تغيير بيانات المهمة</DialogTitle>
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
            value={UpdateDialogInputs.title}
            onChange={(event) => {
              setUpdateDialogInputs({
                ...UpdateDialogInputs,
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
            value={UpdateDialogInputs.description}
            onChange={(event) => {
              setUpdateDialogInputs({
                ...UpdateDialogInputs,
                description: event.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>إغلاق</Button>
          <Button
            onClick={handleUpdateConfirm}
            style={{ color: "#8bc34a" }}
            autoFocus
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      <Alert message="تم تغيير بيانات المهمة بنجاح" openSnack={showAlert} />

      {/* === Update Dialog === */}

      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
        color="text.secondary"
        gutterBottom
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Typography
                variant="h5"
                style={{
                  textAlign: "start",
                  textDecoration: todo.isCompleted
                    ? "line-through black"
                    : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" style={{ textAlign: "start" }}>
                {todo.description}
              </Typography>
            </Grid>

            <Grid
              xs={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "5px",
              }}
            >
              {/* Check icon */}
              <IconButton
                onClick={() => {
                  handleCheckClick(Tasks.id);
                }}
                className="iconBtn"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px ",
                }}
              >
                <CheckIcon />
              </IconButton>
              {/*== Check icon ==*/}

              {/* Edit icon */}
              <IconButton
                className="iconBtn"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px ",
                }}
                onClick={handleUpdateClick}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              {/* == Edit icon == */}

              {/* Delete icon */}
              <IconButton
                className="iconBtn"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px ",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/* == Delete icon == */}
            </Grid>
          </Grid>
          <Typography
            style={{ textAlign: "start", color: "#00e676" }}
            variant="body2"
          >
            {todo.dateAndTime}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
