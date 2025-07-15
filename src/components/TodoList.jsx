import {
  Card,
  CardContent,
  Container,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Grid,
  TextField,
  Button,
  TextareaAutosize,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import TodoContext from "../context/TodoContext";

function TodoList() {
  const { todos, setTodos } = useContext(TodoContext);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDetails, setTodoDetails] = useState("");
  const [filter, setFilter] = useState("all");
  const [rotated, setRotated] = useState(false);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storageTodos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddBtn = () => {
    const trimmedTitle = todoTitle.trim();
    if (!trimmedTitle) return;

    const newTodo = {
      id: uuidv4(),
      title: trimmedTitle,
      details: todoDetails,
      isCompleted: false,
    };

    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });

    setTodoDetails("");
    setTodoTitle("");
  };

  const reverseTodos = () => {
    setRotated((prev) => !prev);
    setTodos((prev) => [...prev].reverse());
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "done") return todo.isCompleted;
    if (filter === "not_done") return !todo.isCompleted;
    return true;
  });

  return (
    <Container maxWidth="md">
      <Card sx={{ minWidth: 275, textAlign: "center", position: "relative" }}>
        <CardContent>
          <Tooltip title="تغيير ترتيب المهام" placement="left">
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                borderRadius: "10px",
                background: "#242E84",
              }}
            >
              <IconButton
                sx={{
                  color: "white",
                }}
                onClick={reverseTodos}
              >
                <FlipCameraAndroidIcon
                  sx={{
                    transition: "transform 0.3s ease-in-out",
                    transform: rotated ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </IconButton>
            </div>
          </Tooltip>

          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              borderRadius: "10px",
              padding: "10px",
              background: "#242E84",
            }}
          >
            <Typography sx={{ color: "white" }}>
              عدد المهام الحاليه: {todos.length}
            </Typography>
          </div>

          <Typography variant="h2" fontWeight="bold">
            مهامي
          </Typography>

          <Divider sx={{ my: 2 }} />

          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(e, newFilter) => {
              if (newFilter !== null) setFilter(newFilter);
            }}
            sx={{ direction: "ltr", m: 2 }}
          >
            <ToggleButton
              value="not_done"
              className={`${filter === "not_done" ? "active" : ""}`}
              sx={{ fontWeight: filter === "not_done" ? "bold" : "normal" }}
            >
              غير منجز
            </ToggleButton>
            <ToggleButton
              value="done"
              className={`${filter === "done" ? "active" : ""}`}
              sx={{ fontWeight: filter === "done" ? "bold" : "normal" }}
            >
              منجز
            </ToggleButton>
            <ToggleButton
              value="all"
              className={`${filter === "all" ? "active" : ""}`}
              sx={{ fontWeight: filter === "all" ? "bold" : "normal" }}
            >
              الكل
            </ToggleButton>
          </ToggleButtonGroup>

          {/* عرض المهام حسب الفلتر */}
          <div
            style={{
              width: "100%",
              maxHeight: "170px",
              overflowY: "auto",
              paddingRight: "8px",
            }}
          >
            {filteredTodos.length > 0 ? (
              filteredTodos.map((item) => <Todo key={item.id} toDo={item} />)
            ) : (
              <Typography
                variant="body1"
                sx={{ mt: 2, fontSize: "1rem", fontWeight: "bold" }}
              >
                لا توجد مهام مطابقة.
              </Typography>
            )}
          </div>

          {/* إضافة مهمة جديدة */}
          <Grid container spacing={2} sx={{ m: 2 }}>
            <Grid size={{ xs: 9 }}>
              <TextField
                fullWidth
                variant="outlined"
                label="إضافة مهمة"
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddBtn();
                }}
              />
            </Grid>
            <Grid size={{ xs: 3 }}>
              <Button
                fullWidth
                sx={{ height: "100%", background: "#242E84", color: "white" }}
                variant="contained"
                onClick={handleAddBtn}
                disabled={!todoTitle.trim()}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextareaAutosize
                value={todoDetails}
                onChange={(e) => setTodoDetails(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleAddBtn();
                  }
                }}
                minRows={4}
                placeholder="اكتب التفاصيل هنا..."
                style={{
                  width: "100%",
                  border: "2px solid #242E84",
                  borderRadius: "10px",
                  padding: "10px",
                  resize: "none",
                  backgroundColor: "transparent",
                  fontSize: "1rem",
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default TodoList;
