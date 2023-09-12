import express from 'express';
import path from 'path';

const app = express();

const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.static(path.join(__dirname, 'dist')));

const port = process.env.PORT || 5173;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});