import mongoose from "mongoose";
const CertificateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  certificateUrl: String,  // URL of the generated certificate (e.g., a PDF or an image)
  issuedAt: { type: Date, default: Date.now },
});

const Certificate = mongoose.model('Certificate', CertificateSchema);

// module.exports = Certificate;
export { Certificate }

