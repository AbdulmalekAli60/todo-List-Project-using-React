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
import { useState } from "react";
// Components
import Todo from "./Todo";

// Libraries
import { v4 as uuidv4 } from "uuid"; // i will us this library in this file as uuidv4

const initialTodosValue = [
  {
    id: uuidv4(),
    title: "المهمة الأولى",
    description: "التفاصيل الخاصة بالمهمة الأولى",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "المهمة الثانية",
    description: "التفاصيل الخاصة بالمهمة الثانية",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "المهمة الثالثة",
    description: "التفاصيل الخاصة بالمهمة الثالثة",
    isCompleted: false,
  },
];

export default function TodoList() {
  const [Tasks, setNewTask] = useState(initialTodosValue);
  const [titleInput,setTitleInput] = useState("")

  const todos = Tasks.map((todo) => {
    return (
      <Todo key={todo.id} todo={todo} handleCheck={handleCheckClick} /> //! passing a function to child so i can chaneg the state from there
    );
  });

  function handleAddClick() {
    const NewTask = {
     id: uuidv4(),
     title: titleInput,
     description:"",
     isCompleted:false, 
    };
    setNewTask([...Tasks, NewTask]);
    setTitleInput("");
  };

  function handleCheckClick(id){ // id sent from child component "Todo"
// alert("clicked  " + id)
    const updatedTodos = Tasks.map((t) => {

      if(t.id === id){
        return { ...t, isCompleted: !t.isCompleted };
      };
      return t;
    });
    setNewTask([...updatedTodos]);
  }
  return (
    <>
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
              exclusive
              aria-label="text alignment"
              style={{ marginTop: "30px", direction: "ltr" }}
            >
              <ToggleButton value="left">غير منجز</ToggleButton>
              <ToggleButton value="center">منجز</ToggleButton>
              <ToggleButton value="right">الكل</ToggleButton>
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
              >
                <TextField
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={titleInput}
                  onChange={(event) => {setTitleInput(event.target.value)}}
                />
              </Grid>

              <Grid
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
                xs={4}
              >
                <Button
                  style={{ width: "100%", height: "100%" }}
                  variant="contained"
                  onClick={() => {
                    handleAddClick();
                  }}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>
            {/*=== Input + add ===*/}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
