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

// Components
import Todo from "./Todo";

export default function TodoList() {
  return (
    <>
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }} color="text.secondary" gutterBottom>
          <CardContent>
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
            <Todo />
            {/* ======Todos==== */}

            {/* Input + add */}
            <Grid style={{marginTop: "20px",}} container spacing={2}>
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
                <Button style={{width:"100%",height:"100%",}} variant="contained">إضافة</Button>
              </Grid>
            </Grid>
            {/*=== Input + add ===*/}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
