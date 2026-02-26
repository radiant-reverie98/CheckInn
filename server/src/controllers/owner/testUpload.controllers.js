import uploadToCloudinary from "../../utils/uploadToCloudinary.utils.js";

export const testUpload = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Missing photos",
      });
    }

    const uploadImages = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer)),
    );

    res.status(200).json({
      success: true,
      message: "Upload successful",
      images: uploadImages.map((img) => ({
        url: img.secure_url,
        public_id: img.public_id,
      })),
    });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ message: "Upload failed" });
  }
};
