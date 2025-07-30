import {
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function Fiction() {
  const [fiction, setFiction] = useState([]);
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          "https://cu2-pa-b13-express-pip.onrender.com/fiction-books"
        );
        const data = await res.json();
        const genres = [...new Set(data.map((book) => book.genre))];
        setGenreList(genres);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      let url = `https://cu2-pa-b13-express-pip.onrender.com/fiction-books`;

      const link = [];
      if (genre) link.push(`genre=${genre}`);
      if (sort) link.push(`sort=${sort}`);
      if (link.length > 0) url += `?${link.join("&")}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setFiction(data);
      } catch (err) {
        console.error("Failed to fetch fiction books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [genre, sort]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Fiction Books
      </Typography>

      <Stack spacing={2} direction={{ xs: "column", sm: "row" }} mb={3}>
        <FormControl fullWidth>
          <InputLabel>Genre</InputLabel>
          <Select
            value={genre}
            label="Genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {genreList.map((g, i) => (
              <MenuItem key={i} value={g}>
                {g}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sort}
            label="Sort By"
            onChange={(e) => setSort(e.target.value)}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="title">Title (A-Z)</MenuItem>
            <MenuItem value="rating">Rating (High to Low)</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {loading ? (
        <Stack alignItems="center" my={5}>
          <CircularProgress size={80} sx={{ color: "#D797FF" }} />
        </Stack>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f3f3f3" }}>
              <TableRow>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Author</strong></TableCell>
                <TableCell><strong>Genre</strong></TableCell>
                <TableCell><strong>Rating</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fiction.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>{book.rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
