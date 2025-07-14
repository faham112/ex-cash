import { createContext, useContext } from "react";

const AuthContext = createContext(null);

// ✅ Yeh hook bana rahe hain jo baad mein import hoga
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
