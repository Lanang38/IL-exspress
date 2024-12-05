import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "gambar") {
      cb(null, "uploads/materi/images");
    } else if (file.fieldname === "video") {
      cb(null, "uploads/materi/videos");
    } else if (file.fieldname === "file") {
      cb(null, "uploads/materi/pdf");
    } else {
      cb(new Error("Invalid file type!"), false);
    }
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().getMilliseconds();
    const fileName = `${timestamp}-${file.originalname}`;
    console.log(file);
    cb(null, fileName); // Simpan file dengan nama ini
  },
});

const fileFilter = (req, file, cb) => {
  const imageTypes = ["image/jpeg", "image/png", "image/gif"];
  const videoTypes = ["video/mp4", "video/mkv", "video/avi"];
  const pdfType = ["application/pdf"];

  if (file.fieldname === "gambar" && imageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else if (file.fieldname === "video" && videoTypes.includes(file.mimetype)) {
    cb(null, true);
  } else if (file.fieldname === "file" && pdfType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type for field: ${file.fieldname}`), false);
  }
};

export const upload = multer({ storage, fileFilter }).fields([
  { name: "gambar", maxCount: 1 },
  { name: "video", maxCount: 1 },
  { name: "file", maxCount: 1 },
]);

export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};
