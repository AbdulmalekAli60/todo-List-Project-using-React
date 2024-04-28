import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme({
 typography:{
  fontFamily:[
    'Alexandria',
  ],
 },
 direction: "rtl",
});

function App() {
  
  return (
    document.dir = "rtl",
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#191b1f",
          height: "100vh",
          direction: "rtl",          
        }}
      >
        <TodoList />
      </div>
    </ThemeProvider>
  );
}

export default App;
