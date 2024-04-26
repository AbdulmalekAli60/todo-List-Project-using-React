import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, green } from '@mui/material/colors';
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: blue[500],
      },
      secondary: {
        main: '#f44336',
      },
      success: {
        main: green[700],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:"#191b1f",
        height:"100vh",
        direction:"rtl",
      }}
    >
      <TodoList />
    </div>
    </ThemeProvider>
  );
}

export default App;
