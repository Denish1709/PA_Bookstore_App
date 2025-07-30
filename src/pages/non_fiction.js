import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function NonFiction() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      let url = `https://cu2-pa-b13-express-pip.onrender.com/non-fiction-books?`;

      const params = [];
      if (search) params.push(`search=${search}`);
      params.push(`page=${page}`);
      params.push(`limit=${limit}`);
      url += params.join("&");

      try {
        const res = await fetch(url);
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Failed to fetch non-fiction books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [search, page, limit]);

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (books.length === limit) setPage(page + 1);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Non-Fiction Books
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        mb={3}
      >
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <Typography>Search:</Typography>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Title or Author"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </Stack>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Books Per Page</InputLabel>
          <Select
            value={limit}
            label="Books Per Page"
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
          >
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {loading ? (
        <Stack alignItems="center" justifyContent="center" my={5}>
          <CircularProgress size={60} sx={{ color: "#D797FF" }} />
        </Stack>
      ) : (
        <Grid container spacing={3}>
          {books.map((book, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Author: {book.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {book.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {book.rating}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
        <Button variant="outlined" onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </Button>
        <Button variant="outlined" onClick={handleNextPage} disabled={books.length < limit}>
          Next
        </Button>
      </Stack>
    </Container>
  );
}
