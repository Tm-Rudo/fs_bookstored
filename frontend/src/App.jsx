import React from "react";

import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <div className="min-h-screen w-full">
      {/* bọc AuthProvider */}
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
};

export default App;
