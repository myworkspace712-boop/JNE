import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdCloudUpload, MdDelete, MdImage, MdCheckCircle, MdInfo } from 'react-icons/md';

const MAX_HERO_IMAGES = 5;

export default function AdminHeroManager() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get(`${baseUrl}/api/admin/hero-slides`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSlides(res.data?.data || []);
      setError('');
    } catch (err) {
      console.error('Failed to load hero slides:', err);
      setError(err.response?.data?.error || 'Failed to fetch hero carousel slides.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  // Handle local file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image file size must be less than 5MB.');
      return;
    }

    setError('');
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Upload new slide to backend
  const handleUpload = async (e) => {
    e.preventDefault();

    if (slides.length >= MAX_HERO_IMAGES) {
      setError(`Maximum limit reached! You can have at most ${MAX_HERO_IMAGES} hero carousel images.`);
      return;
    }

    if (!selectedFile) {
      setError('Please select an image file to upload.');
      return;
    }

    try {
      setUploading(true);
      setError('');
      setSuccess('');

      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('title', title);
      formData.append('subtitle', subtitle);
      formData.append('order', slides.length);

      const res = await axios.post(`${baseUrl}/api/admin/hero-slides`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess(res.data?.message || 'Hero carousel image uploaded successfully!');
      setSelectedFile(null);
      setPreviewUrl('');
      setTitle('');
      setSubtitle('');

      // Refresh list
      fetchSlides();
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error || 'Failed to upload hero image.');
    } finally {
      setUploading(false);
    }
  };

  // Delete slide
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this hero carousel image?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${baseUrl}/api/admin/hero-slides/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Slide deleted successfully!');
      fetchSlides();
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.response?.data?.error || 'Failed to delete slide.');
    }
  };

  const isMaxReached = slides.length >= MAX_HERO_IMAGES;

  return (
    <div className="modern-card p-6 md:p-8 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-700">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-extrabold text-amber-950 dark:text-orange-300">
              Hero Section Carousel Manager
            </h2>
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full ${
                isMaxReached
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300'
              }`}
            >
              {slides.length} / {MAX_HERO_IMAGES} Slides Used
            </span>
          </div>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Upload and control hero carousel images displayed on the homepage. Strict maximum of 5 images enforced.
          </p>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-300 text-sm flex items-start gap-3">
          <MdInfo className="text-lg shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-sm flex items-start gap-3">
          <MdCheckCircle className="text-lg shrink-0 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      {/* Upload Form Box */}
      <div className="bg-stone-50/70 dark:bg-stone-800/40 rounded-2xl p-5 md:p-6 border border-stone-200 dark:border-stone-700">
        <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
          <MdCloudUpload className="text-xl text-amber-600 dark:text-orange-400" />
          Upload New Hero Slide
        </h3>

        {isMaxReached ? (
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-sm flex items-center gap-3">
            <MdInfo className="text-xl shrink-0" />
            <p>
              <strong>Limit Reached:</strong> The carousel currently has the maximum of {MAX_HERO_IMAGES} active slides. Delete an existing slide below to upload a new one.
            </p>
          </div>
        ) : (
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Image Input Area */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
                  Image File (Max 5MB) *
                </label>
                <div className="relative border-2 border-dashed border-stone-300 dark:border-stone-600 hover:border-amber-500 rounded-xl p-4 text-center cursor-pointer transition-colors bg-white dark:bg-stone-900">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {previewUrl ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-28 w-full max-w-xs object-cover rounded-lg shadow-sm mb-2"
                      />
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        {selectedFile?.name} (Click to change)
                      </span>
                    </div>
                  ) : (
                    <div className="py-4 flex flex-col items-center justify-center text-stone-500 dark:text-stone-400">
                      <MdImage className="text-3xl text-amber-600 dark:text-orange-400 mb-1" />
                      <span className="text-sm font-medium">Click or drag image here</span>
                      <span className="text-xs text-stone-400 mt-1">PNG, JPG, WebP up to 5MB</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Text Fields */}
              <div className="space-y-3 flex flex-col justify-between">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
                    Slide Headline / Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Precision Offset & Digital Printing"
                    className="modern-input"
                    disabled={uploading}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
                    Slide Subtitle / Description (Optional)
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g., Ultra-high definition printing for enterprise branding."
                    className="modern-input"
                    disabled={uploading}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={uploading || !selectedFile}
                    className="btn-primary w-full"
                  >
                    {uploading ? 'Uploading Slide...' : `Upload to Carousel (${slides.length}/${MAX_HERO_IMAGES})`}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Existing Carousel Slides Grid */}
      <div>
        <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-4">
          Current Active Slides ({slides.length} of {MAX_HERO_IMAGES})
        </h3>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-44 rounded-2xl skeleton-shimmer"></div>
            ))}
          </div>
        ) : slides.length === 0 ? (
          <div className="text-center py-10 border border-stone-200 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-800/40">
            <MdImage className="text-4xl text-stone-400 mx-auto mb-2" />
            <p className="text-stone-600 dark:text-stone-300 font-semibold">No custom carousel images uploaded yet.</p>
            <p className="text-xs text-stone-400 mt-1">The public homepage is currently displaying default fallback hero slides.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {slides.map((slide, index) => {
              const fullUrl = slide.imageUrl.startsWith('http')
                ? slide.imageUrl
                : `${baseUrl}${slide.imageUrl}`;

              return (
                <div
                  key={slide._id || index}
                  className="modern-card overflow-hidden group flex flex-col justify-between"
                >
                  <div className="relative h-40 bg-stone-900 overflow-hidden">
                    <img
                      src={fullUrl}
                      alt={slide.title || `Slide ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="glass-badge text-[10px] py-1 px-2.5">
                        Slide #{index + 1}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm line-clamp-1">
                        {slide.title || 'Untitled Slide'}
                      </h4>
                      {slide.subtitle && (
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                          {slide.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                      <span className="text-[11px] text-stone-400">
                        {new Date(slide.createdAt || Date.now()).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => handleDelete(slide._id)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 dark:text-rose-400 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="Delete Slide"
                      >
                        <MdDelete className="text-base" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
