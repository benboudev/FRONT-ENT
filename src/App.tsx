import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import CustomerList from './components/customers/CustomerList';
import MaterialList from './components/materials/MaterialList';
import MaterialCategoryList from './components/materials/MaterialCategoryList';
import OrderList from './components/orders/OrderList';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/materials" element={<MaterialList />} />
          <Route path="/categories" element={<MaterialCategoryList />} />
          <Route path="/orders" element={<OrderList />} />
        </Routes>
      </Layout>
    </Router>
  );
}
