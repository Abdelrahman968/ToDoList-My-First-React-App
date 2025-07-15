import React, { useState } from "react";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TodoContext from "./context/TodoContext";
import { v4 as uuidv4 } from "uuid";

const initialTodos = [
  {
    id: uuidv4(),
    title: "المهمة الأولي",
    details: "نص تجريبي موجود في وصف المهم",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "المهمة الثانية",
    details: "مثال على مهمة أخري",
    isCompleted: false,
  },
];

function App() {
  const theme = createTheme({
    direction: "rtl",
    typography: {
      fontFamily: "ProFont",
    },
  });

  const [todos, setTodos] = useState(initialTodos);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="flex justify-between items-center h-screen bg-[#191b1f] overflow-hidden"
        style={{ direction: "rtl" }}
      >
        <TodoContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodoContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
