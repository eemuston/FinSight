import express from 'express';
import multer from 'multer';
const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(express.json());

const PORT = 3000;

app.post('/pdf', upload.single('pdf'), (req, res) => {
    console.log(req.file)
    res.send(req.file)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
