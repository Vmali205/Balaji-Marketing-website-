import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  LogOut, 
  ShoppingBag,
  ExternalLink,
  Package
} from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import useProducts from '../../hooks/useProducts';
import { deleteProduct } from '../../utils/api';
import Logo from '../../components/Logo/Logo';
import { CATEGORIES } from '../../utils/constants';
import styles from './Admin.module.css';

const Dashboard = () => {
  const { logout, user } = useAuth();
  const { products, loading, refetch } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, categoryFilter, searchQuery]);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        alert('Failed to delete product: ' + err.message);
      }
    }
  };

  const stats = useMemo(() => {
    return {
      total: products.length,
      categories: CATEGORIES.length,
      recent: products.slice(0, 5)
    };
  }, [products]);

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Logo variant="light" />
        </div>
        
        <nav className={styles.sidebarNav}>
          <div className={`${styles.navItem} ${styles.active}`}>
            <Package size={20} />
            <span>Products</span>
          </div>
          {/* Future expansion: <div className={styles.navItem}>...</div> */}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              {user?.username?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className={styles.userDetails}>
              <p className={styles.userName}>{user?.username || 'Admin'}</p>
              <p className={styles.userRole}>Store Manager</p>
            </div>
          </div>
          <button onClick={logout} className={styles.logoutBtn}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.contentHeader}>
          <div className={styles.headerTitle}>
            <h1>Product Dashboard</h1>
            <p>Manage your cookware catalogue</p>
          </div>
          <button 
            onClick={() => navigate('/admin/products/new')}
            className="btn btn-primary"
          >
            <Plus size={18} />
            Add New Product
          </button>
        </header>

        {/* Stats Grid */}
        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(201, 169, 110, 0.1)', color: 'var(--color-accent)' }}>
              <Package size={24} />
            </div>
            <div className={styles.statInfo}>
              <h3>{stats.total}</h3>
              <p>Total Products</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: 'rgba(74, 222, 128, 0.1)', color: 'var(--color-success)' }}>
              <ShoppingBag size={24} />
            </div>
            <div className={styles.statInfo}>
              <h3>{stats.categories}</h3>
              <p>Categories</p>
            </div>
          </div>
        </section>

        {/* Filters Bar */}
        <section className={styles.tableFilters}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search by name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="form-select"
            style={{ maxWidth: '200px', marginBottom: 0 }}
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </section>

        {/* Products Table */}
        <section className={styles.tableWrapper}>
          {loading ? (
            <div className={styles.tableLoading}>
              <span className="spinner" />
            </div>
          ) : (
            <table className={styles.productTable}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Sizes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className={styles.tableImg}>
                          {product.image ? (
                            <img src={product.image} alt={product.name} />
                          ) : (
                            <Package size={20} />
                          )}
                        </div>
                      </td>
                      <td>
                        <div className={styles.tableName}>
                          <strong>{product.name}</strong>
                          {product.amazonLink && (
                            <a href={product.amazonLink} target="_blank" rel="noreferrer" className={styles.externalLink}>
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-steel">
                          {CATEGORIES.find(c => c.id === product.category)?.name || product.category}
                        </span>
                      </td>
                      <td>
                        <div className={styles.tableSizes}>
                          {Array.isArray(product.sizes) ? product.sizes.join(', ') : product.sizes}
                        </div>
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <button 
                            onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                            className={styles.actionBtn}
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id, product.name)}
                            className={`${styles.actionBtn} ${styles.delete}`}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={styles.emptyRow}>
                      No products found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
