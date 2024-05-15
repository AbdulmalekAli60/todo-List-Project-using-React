import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TasksContext } from "./Contexts/TasksContext";
//Hocks
import { useState } from "react";

//Library
import { v4 as uuidv4 } from "uuid";

//components
import getDate from "./components/getDateAndTime";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dd2c00",
    },
  },
});

const initialTodosValue = [
  {
    id: uuidv4(),
    title: "المهمة الأولى",
    description: "التفاصيل الخاصة بالمهمة الأولى",
    isCompleted: false,
    dateAndTime: getDate(),
  },
  {
    id: uuidv4(),
    title: "المهمة الثانية",
    description: "التفاصيل الخاصة بالمهمة الثانية",
    isCompleted: false,
    dateAndTime: getDate(),
  },
  {
    id: uuidv4(),
    title: "المهمة الثالثة",
    description: "التفاصيل الخاصة بالمهمة الثالثة",
    isCompleted: false,
    dateAndTime: getDate(),
  },
];
console.log(getDate());
function App() {
  const [Tasks, setNewTask] = useState(initialTodosValue);

  return (
    (document.dir = "rtl"),
    (
      <TasksContext.Provider value={{ Tasks, setNewTask }}>
        <ThemeProvider theme={theme}>
          <div
            className="App"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#191b1f",
              direction: "rtl",
              height: "100vh",
            }}
          >
            <TodoList />
          </div>
        </ThemeProvider>
      </TasksContext.Provider>
    )
  );
}
export default App;
