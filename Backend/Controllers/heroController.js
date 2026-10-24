import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import HeroSlide from '../Models/heroSlide.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAX_HERO_SLIDES = 5;

// @desc    Get all active hero slides (limit 5) for public hero section
// @route   GET /api/hero-slides
// @access  Public
export const getHeroSlides = async (_req, res) => {
  try {
    const slides = await HeroSlide.find({ isActive: true })
      .sort({ order: 1, createdAt: 1 })
      .limit(MAX_HERO_SLIDES);

    return res.status(200).json({
      success: true,
      count: slides.length,
      data: slides,
    });
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch hero carousel slides',
    });
  }
};

// @desc    Get all hero slides for admin
// @route   GET /api/admin/hero-slides
// @access  Private/Admin
export const getAdminHeroSlides = async (_req, res) => {
  try {
    const slides = await HeroSlide.find().sort({ order: 1, createdAt: 1 });
    return res.status(200).json({
      success: true,
      count: slides.length,
      maxAllowed: MAX_HERO_SLIDES,
      data: slides,
    });
  } catch (error) {
    console.error('Error fetching admin hero slides:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch hero slides for dashboard',
    });
  }
};

// @desc    Upload & create a new hero slide (Strictly max 5 slides)
// @route   POST /api/admin/hero-slides
// @access  Private/Admin
export const createHeroSlide = async (req, res) => {
  try {
    // 1. Strict backend validation: Count existing slides
    const currentCount = await HeroSlide.countDocuments();
    if (currentCount >= MAX_HERO_SLIDES) {
      // Remove newly uploaded file if over limit to prevent orphaned disk files
      if (req.file) {
        fs.unlink(req.file.path, () => {});
      }
      return res.status(400).json({
        success: false,
        error: `Maximum limit of ${MAX_HERO_SLIDES} hero carousel slides reached. Please delete an existing slide first.`,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Please upload an image file.',
      });
    }

    // Build public URL path for the uploaded file
    const relativePath = `/uploads/hero/${req.file.filename}`;
    const { title = '', subtitle = '', order = currentCount } = req.body;

    const newSlide = await HeroSlide.create({
      imageUrl: relativePath,
      title,
      subtitle,
      order: Number(order) || currentCount,
      isActive: true,
    });

    return res.status(201).json({
      success: true,
      message: 'Hero slide uploaded successfully',
      data: newSlide,
    });
  } catch (error) {
    // Clean up uploaded file on error
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }
    console.error('Error uploading hero slide:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Server error while uploading hero slide',
    });
  }
};

// @desc    Delete a hero slide and its image file
// @route   DELETE /api/admin/hero-slides/:id
// @access  Private/Admin
export const deleteHeroSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const slide = await HeroSlide.findById(id);

    if (!slide) {
      return res.status(404).json({
        success: false,
        error: 'Hero slide not found',
      });
    }

    // Attempt to delete physical file from disk if it was locally uploaded
    if (slide.imageUrl && slide.imageUrl.startsWith('/uploads/hero/')) {
      const filename = path.basename(slide.imageUrl);
      const filePath = path.join(__dirname, '..', 'uploads', 'hero', filename);
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) console.error('Failed to delete file from disk:', err);
        });
      }
    }

    await HeroSlide.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Hero slide deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting hero slide:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete hero slide',
    });
  }
};
