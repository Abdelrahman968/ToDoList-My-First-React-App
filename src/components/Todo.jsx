import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import React, { useContext, useState } from "react";

// ICON
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TodoContext from "../context/TodoContext";

// Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

function Todo({ toDo }) {
  const { setTodos } = useContext(TodoContext);
  const [openDel, setOpenDel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({
    title: toDo.title,
    details: toDo.details,
  });

  const handleEditStep1 = () => {
    setOpenEdit(true);
  };

  const handleEditStep2 = (id) => {
    setOpenEdit(false);
    setTodos((prev) => {
      const updatedTodos = prev.map((todo) =>
        todo.id === id
          ? { ...todo, title: updateTodo.title, details: updateTodo.details }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const handleDelStep1 = () => {
    setOpenDel(true);
  };

  const handleDelStep2 = (id) => {
    setOpenDel(false);
    setTodos((prev) => {
      const updatedTodos = prev.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const handleCheckBtn = (id) => {
    setTodos((prev) => {
      const updatedTodos = prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
      // Save after state update logic is done
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  return (
    <>
      {/* Edit Dialog */}
      <Dialog
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
        }}
        sx={{ direction: "rtl" }}
        fullWidth={true}
        maxWidth="md"
        aria-labelledby="my-dialog-edit"
        aria-describedby="my-dialog-to-edit-todo"
        disableEnforceFocus
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>تعديل المهمة</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="عنوان المهمة"
              type="text"
              fullWidth
              value={updateTodo.title}
              onChange={(e) => {
                setUpdateTodo({ ...updateTodo, title: e.target.value });
              }}
            />
            <TextareaAutosize
              id="details"
              name="details"
              label="تفاصيل المهمة"
              type="text"
              minRows={4}
              style={{
                borderRadius: "5px",
                width: "100%",
                border: "2px solid #242E84",
                padding: "10px",
                resize: "none",
                backgroundColor: "transparent",
                fontSize: "1rem",
              }}
              placeholder="تفاصيل المهمة"
              value={updateTodo.details}
              onChange={(e) => {
                setUpdateTodo({ ...updateTodo, details: e.target.value });
              }}
            />
            <DialogActions>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => {
                  setOpenEdit(false);
                }}
              >
                إلغاء
              </Button>
              <Button
                color="secondary"
                variant="contained"
                sx={{ fontWeight: "bold", mr: 1 }}
                type="submit"
                onClick={() => {
                  handleEditStep2(toDo.id);
                }}
              >
                تعديل
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {/* END Edit */}
      {/* DELETE Model */}
      <Dialog
        open={openDel}
        onClose={() => {
          setOpenDel(false);
        }}
        keepMounted
        sx={{ direction: "rtl" }}
        aria-labelledby="my-dialog-del"
        aria-describedby="my-dialog-to-del-todo"
        disableEnforceFocus
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {"هل أنت متأكد من رغبتك في حذف المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            لا يمكنك التراجع عن الحذف في حال اختيار زر: (حذف)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              setOpenDel(false);
            }}
          >
            إغلاق
          </Button>
          <Button
            color="error"
            variant="contained"
            sx={{ fontWeight: "bold", mr: 1 }}
            onClick={() => {
              handleDelStep2(toDo.id);
            }}
          >
            نعم، قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* END */}

      <Card
        sx={{
          minWidth: 275,
          background: "#242E84",
          color: "white",
          m: 2,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
            borderRadius: "2px",
            transform: "scale(1.005)",
          },
        }}
      >
        <CardContent>
          <Grid container spacing={2} sx={{ position: "relative" }}>
            <Grid size={{ xs: 9 }} sx={{ borderLeft: "1px solid white" }}>
              <Typography
                variant="h5"
                sx={{ textAlign: "right", fontWeight: 600, m: 2 }}
              >
                {toDo.isCompleted ? (
                  <div className="line-through">{toDo.title}</div>
                ) : (
                  <div>{toDo.title}</div>
                )}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {toDo.details}
              </Typography>
            </Grid>
            {/* ============ */}
            <Grid
              size={{ xs: 3 }}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                onClick={() => {
                  handleCheckBtn(toDo.id);
                }}
                sx={{
                  color: toDo.isCompleted ? "white" : "green",
                  background: toDo.isCompleted ? "green" : "white",
                  border: toDo.isCompleted ? "solid green 3px" : "solid  3px",
                  "&:hover": {
                    background: toDo.isCompleted ? "green" : "#8bc34a",
                    color: "white",
                  },
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleEditStep1();
                }}
                sx={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                  "&:hover": {
                    background: "#1769aa",
                    color: "white",
                  },
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleDelStep1();
                }}
                sx={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                  "&:hover": {
                    background: "#b23c17",
                    color: "white",
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default Todo;
