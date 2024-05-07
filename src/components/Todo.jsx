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
// Icons
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { TasksContext } from "../Contexts/TasksContext";
import { useContext } from "react";
import { useState } from "react";

//Components

export default function Todo({ todo }) {
  const { Tasks, setNewTask } = useContext(TasksContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  //Event Handlers
  function handleCheckClick() {
    const updatedTodos = Tasks.map((t) => {
      if (t.id === todo.id) {
        return { ...t, isCompleted: !t.isCompleted };
      }
      return t;
    });
    setNewTask([...updatedTodos]);
  }

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleClose() {
    //Clicking at any location will close the dialog
    setShowDeleteDialog(false);
  }

  function handelDeleteConfirm() {
    setNewTask(Tasks.filter((t) => t.id !== todo.id)); //creates a new array by filtering the Tasks array. It checks each element (t) in the array and keeps only the elements where the id doesn't match the id of the todo item
  }
  // Event Handelers

  return (
    <>
      {/* confirm Delete Dialog */}
      <Dialog
        onClose={handleClose}
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
          <Button onClick={handleClose}>إغلاق</Button>
          <Button
            onClick={handelDeleteConfirm}
            style={{ color: "red" }}
            autoFocus
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>
      {/*=== confirm Delete Dialog === */}

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
              <Typography variant="h5" style={{ textAlign: "start" }}>
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

              <IconButton
                className="iconBtn"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px ",
                }}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>

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
        </CardContent>
      </Card>
    </>
  );
}
