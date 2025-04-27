import { createContext, useContext, useState } from "react";

// Mock user data for now (later replace this with real auth)
const mockUser = {
  _id: "6634d2abf7b1c2a9f63ea899",
  name: "Ashish Bhusal",
  email: "ashish@example.com",
  type: "job_seeker", // or "job_poster"
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(mockUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
