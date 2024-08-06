import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import UserManagement from './UserManagement';
import PaymentTracking from './PaymentTracking';
import RecipeStats from './RecipeStats';

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('UserManagement');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'UserManagement':
        return <UserManagement />;
      case 'PaymentTracking':
        return <PaymentTracking />;
      case 'RecipeStats':
        return <RecipeStats />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="flex">
      <AdminSidebar setActiveComponent={setActiveComponent} />
      <div className="p-4 sm:ml-64 w-full">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
