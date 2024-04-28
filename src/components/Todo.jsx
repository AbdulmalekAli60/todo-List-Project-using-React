import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
// Icons
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
export default function Todo() {
  return (
    <>
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
                المهة الأولى
              </Typography>
              <Typography variant="h6" style={{ textAlign: "start" }}>
                التفاصيل الخاصة بالمهمة الأولى
              </Typography>
            </Grid>

            <Grid
              xs={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <IconButton
                className="iconBtn"
                style={{
                  color: "#9bc34a",
                  background: "white",
                  border: "solid #9bc34a 3px ",
                }}
              >
                <CheckIcon color="success" />
              </IconButton>

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

              <IconButton
                className="iconBtn"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px ",
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
