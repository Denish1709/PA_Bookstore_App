import { Container, Typography, Box } from "@mui/material";

export default function Home() {
  return (
    <Container sx={{ mt: 8, textAlign: "center" }}>
      <Box>
        <Typography variant="h3" gutterBottom>
          Welcome to Bookstore Adventures
        </Typography>
        <Typography variant="h6" color="text.secondary">
          This is the homepage. Use the navigation links to explore!
        </Typography>
      </Box>
    </Container>
  );
}
