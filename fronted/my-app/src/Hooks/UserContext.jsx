import { createContext, useState } from "react";

export const UserContext = createContext();

function getInitialUser() {
  try {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return { id: null, name: "", email: "" };
    
    const parsed = JSON.parse(savedUser);
    return {
      id: parsed.id,
      name: parsed.name,
      email: parsed.email
    };
  } catch (error) {
    localStorage.removeItem("user");
    return { id: null, name: "", email: "" };
  }
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}