// src/app/admin/dashboard/AdminDashboard.tsx
import { useState, useEffect } from "react";
import AdminStatus from "@/components/admin/AdminStatus";  // Component AdminStatus

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AdminStatus />
    </div>
  );
};

export default AdminDashboard;
