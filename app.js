import express from 'express';
import multer from 'multer';
import path from 'path';

const app = express();

// Konfigurasi Multer untuk menyimpan file dengan nama asli
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder penyimpanan file
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Menyimpan file dengan nama aslinya
    },
});

// Middleware Multer tanpa batasan ukuran file
const upload = multer({
    storage,
    limits: { fileSize: Infinity }, // Tidak ada batasan ukuran file
});

// Endpoint untuk menerima file
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    res.status(200).send({
        message: 'File uploaded successfully!',
        filename: req.file.originalname,
        path: req.file.path,
    });
});

// Jalankan server
const PORT = 3123;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
