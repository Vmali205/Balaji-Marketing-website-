import { useState } from 'react';
import { LogOut, Package, ShoppingCart, Settings } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Logo from '../../components/Logo/Logo';
import ProductsManager from './ProductsManager';
import OrdersManager from './OrdersManager';
import styles from './Admin.module.css';

const Dashboard = () => {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState('products');

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsManager />;
      case 'orders':
        return <OrdersManager />;
      case 'settings':
        return (
          <div className={styles.contentHeader}>
            <div className={styles.headerTitle}>
              <h1>Settings</h1>
              <p>Store configuration and preferences</p>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <p>Settings module coming soon...</p>
            </div>
          </div>
        );
      default:
        return <ProductsManager />;
    }
  };

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Logo variant="light" />
        </div>
        
        <nav className={styles.sidebarNav}>
          <button 
            className={`${styles.navItem} ${activeTab === 'products' ? styles.active : ''}`}
            onClick={() => setActiveTab('products')}
            style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer' }}
          >
            <Package size={20} />
            <span>Products</span>
          </button>
          
          <button 
            className={`${styles.navItem} ${activeTab === 'orders' ? styles.active : ''}`}
            onClick={() => setActiveTab('orders')}
            style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer' }}
          >
            <ShoppingCart size={20} />
            <span>Orders</span>
          </button>
          
          <button 
            className={`${styles.navItem} ${activeTab === 'settings' ? styles.active : ''}`}
            onClick={() => setActiveTab('settings')}
            style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer' }}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
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
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
