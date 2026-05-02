import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  X, 
  Package,
  AlertCircle,
  Check
} from 'lucide-react';
import { createProduct, updateProduct, getProducts } from '../../utils/api';
import { CATEGORIES } from '../../utils/constants';
import styles from './Admin.module.css';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    sizes: '',
    amazonLink: ''
  });
  
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        try {
          const data = await getProducts();
          const products = data.products || data;
          const product = products.find(p => p.id === id);
          
          if (product) {
            setFormData({
              name: product.name,
              category: product.category,
              description: product.description || '',
              sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : product.sizes || '',
              amazonLink: product.amazonLink || ''
            });
            setImagePreview(product.image || '');
          } else {
            setError('Product not found');
          }
        } catch (err) {
          setError('Failed to fetch product details');
        } finally {
          setInitialLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('sizes', formData.sizes);
      data.append('amazonLink', formData.amazonLink);
      
      if (image) {
        data.append('image', image);
      }

      if (isEdit) {
        await updateProduct(id, data);
      } else {
        await createProduct(data);
      }

      setSuccess(true);
      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } catch (err) {
      setError(err.message || 'Failed to save product');
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className={styles.adminContainer} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <span className="spinner" />
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <main className={styles.formContent}>
        <header className={styles.contentHeader}>
          <div className={styles.headerTitle}>
            <Link to="/admin/dashboard" className={styles.backLink}>
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
            <h1>{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
          </div>
        </header>

        <div className={styles.formWrapper}>
          {error && (
            <div className={`${styles.errorMessage} ${styles.formError}`}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className={styles.successOverlay}>
              <div className={styles.successMsg}>
                <Check size={48} />
                <h2>Product Saved!</h2>
                <p>Redirecting to dashboard...</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.productForm}>
            <div className={styles.formGrid}>
              {/* Left Column: Details */}
              <div className={styles.formMain}>
                <div className="form-group">
                  <label className="form-label">Product Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="form-input"
                    placeholder="e.g. Premium Tri-Ply Kadai 24cm"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select 
                    name="category"
                    required
                    className="form-select"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea 
                    name="description"
                    className="form-textarea"
                    placeholder="Enter product features, materials, and benefits..."
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Available Sizes</label>
                    <input 
                      type="text" 
                      name="sizes"
                      className="form-input"
                      placeholder="e.g. 20cm, 22cm, 24cm"
                      value={formData.sizes}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Amazon Link (Optional)</label>
                    <input 
                      type="url" 
                      name="amazonLink"
                      className="form-input"
                      placeholder="https://amazon.in/..."
                      value={formData.amazonLink}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Image */}
              <div className={styles.formSide}>
                <div className="form-group">
                  <label className="form-label">Product Image</label>
                  <div className={styles.imageUpload}>
                    {imagePreview ? (
                      <div className={styles.previewContainer}>
                        <img src={imagePreview} alt="Preview" className={styles.previewImg} />
                        <button 
                          type="button" 
                          className={styles.removeImg}
                          onClick={() => {
                            setImage(null);
                            setImagePreview('');
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className={styles.uploadPlaceholder}>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageChange}
                          hidden
                        />
                        <Upload size={32} />
                        <span>Upload Image</span>
                        <p>PNG, JPG up to 5MB</p>
                      </label>
                    )}
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%' }}
                  >
                    {loading ? (
                      <span className="spinner" style={{ width: '20px', height: '20px' }} />
                    ) : (
                      <>
                        <Save size={18} />
                        {isEdit ? 'Update Product' : 'Save Product'}
                      </>
                    )}
                  </button>
                  <Link to="/admin/dashboard" className="btn btn-ghost" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProductForm;
