import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
export default function TodoList() {
  return (
    <>
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }} color="text.secondary" gutterBottom>
          <CardContent>
            <Typography variant="h2">مهامي</Typography>
            <Divider />

            {/* Filter Buttons */}
            <ToggleButtonGroup
              exclusive
              aria-label="text alignment"
              style={{ marginTop: "30px",direction:"ltr" }}
            >
              <ToggleButton value="left">غير منجز</ToggleButton>
              <ToggleButton value="center">منجز</ToggleButton>
              <ToggleButton value="right">الكل</ToggleButton>
            </ToggleButtonGroup>
            {/*==== Filter Buttons====*/}
          </CardContent>

          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
