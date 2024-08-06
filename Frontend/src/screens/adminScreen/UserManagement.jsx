import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditUserModal from './adminModals/EditUserModal';
import DeleteConfirmationModal from './adminModals/DeleteConfirmationModal';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Sam Wilson', email: 'sam@example.com' },
    { id: 4, name: 'Alex Johnson', email: 'alex@example.com' },
    { id: 5, name: 'Chris Lee', email: 'chris@example.com' },
    { id: 6, name: 'Pat Brown', email: 'pat@example.com' },
    { id: 7, name: 'Taylor Davis', email: 'taylor@example.com' },
    { id: 8, name: 'Jordan White', email: 'jordan@example.com' },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    setUsers(users.filter(user => user.id !== selectedUser.id));
  };

  const handleSave = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left text-gray-600 font-semibold">Name</th>
            <th className="py-3 px-4 text-left text-gray-600 font-semibold">Email</th>
            <th className="py-3 px-4 text-left text-gray-600 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b last:border-none">
              <td className="py-3 px-4">{user.name}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">
                <button onClick={() => openEditModal(user)} className="text-blue-600 hover:text-blue-800 mr-2">
                  <FaEdit className="inline" />
                </button>
                <button onClick={() => openDeleteModal(user)} className="text-red-600 hover:text-red-800">
                  <FaTrash className="inline" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          user={selectedUser}
          onSave={handleSave}
        />
      )}
      {selectedUser && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default UserManagement;
