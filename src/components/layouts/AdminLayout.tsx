import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        <ul className="mt-4">
          <li className="mt-2">Quản lý người dùng</li>
          <li className="mt-2">Quản lý nội dung</li>
          <li className="mt-2">Cài đặt hệ thống</li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
