import { useState, useEffect, useMemo } from 'react';
import { Search, Eye, ExternalLink, RefreshCw } from 'lucide-react';
import { getOrders, updateOrderStatus } from '../../utils/api';
import { ORDER_STATUSES } from '../../utils/constants';
import styles from './Admin.module.css';

const OrdersManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updating, setUpdating] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        order.id.toLowerCase().includes(searchLower) ||
        order.customer.name.toLowerCase().includes(searchLower) ||
        order.customer.phone.toLowerCase().includes(searchLower);
      return matchesStatus && matchesSearch;
    });
  }, [orders, statusFilter, searchQuery]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert('Failed to update order status: ' + err.message);
    } finally {
      setUpdating(null);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case ORDER_STATUSES.PENDING: return 'badge-warning';
      case ORDER_STATUSES.CONFIRMED: return 'badge-primary';
      case ORDER_STATUSES.PROCESSING: return 'badge-info';
      case ORDER_STATUSES.SHIPPED: return 'badge-info';
      case ORDER_STATUSES.DELIVERED: return 'badge-success';
      case ORDER_STATUSES.CANCELLED: return 'badge-danger';
      default: return 'badge-steel';
    }
  };

  return (
    <>
      <header className={styles.contentHeader}>
        <div className={styles.headerTitle}>
          <h1>Orders Dashboard</h1>
          <p>Manage customer orders and fulfillments</p>
        </div>
        <button 
          onClick={fetchOrders}
          className="btn btn-outline"
          disabled={loading}
        >
          <RefreshCw size={16} className={loading ? 'spin' : ''} />
          Refresh
        </button>
      </header>

      {/* Filters Bar */}
      <section className={styles.tableFilters}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search by Order ID, Name, Phone..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-select"
          style={{ maxWidth: '200px', marginBottom: 0 }}
        >
          <option value="all">All Statuses</option>
          <option value={ORDER_STATUSES.PENDING}>Pending</option>
          <option value={ORDER_STATUSES.CONFIRMED}>Confirmed</option>
          <option value={ORDER_STATUSES.PROCESSING}>Processing</option>
          <option value={ORDER_STATUSES.SHIPPED}>Shipped</option>
          <option value={ORDER_STATUSES.DELIVERED}>Delivered</option>
          <option value={ORDER_STATUSES.CANCELLED}>Cancelled</option>
        </select>
      </section>

      {/* Orders Table */}
      <section className={styles.tableWrapper}>
        {loading ? (
          <div className={styles.tableLoading}>
            <span className="spinner" />
          </div>
        ) : (
          <table className={styles.productTable}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong>{order.id}</strong>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.9rem' }}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td>
                      <div className={styles.tableName}>
                        <strong>{order.customer.name}</strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{order.customer.phone}</span>
                      </div>
                    </td>
                    <td>
                      <strong>₹{order.total}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {order.items.length} items
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-steel" style={{ textTransform: 'uppercase', fontSize: '0.7rem' }}>
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <select 
                          className="form-select"
                          style={{ padding: '0.3rem 0.5rem', fontSize: '0.8rem', height: 'auto', width: 'auto', marginBottom: 0 }}
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          disabled={updating === order.id}
                        >
                          <option value={ORDER_STATUSES.PENDING}>Pending</option>
                          <option value={ORDER_STATUSES.CONFIRMED}>Confirmed</option>
                          <option value={ORDER_STATUSES.PROCESSING}>Processing</option>
                          <option value={ORDER_STATUSES.SHIPPED}>Shipped</option>
                          <option value={ORDER_STATUSES.DELIVERED}>Delivered</option>
                          <option value={ORDER_STATUSES.CANCELLED}>Cancelled</option>
                        </select>
                        {updating === order.id && <span className="spinner" style={{ width: '14px', height: '14px', borderTopColor: 'var(--color-primary)' }} />}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={styles.emptyRow}>
                    No orders found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
};

export default OrdersManager;
