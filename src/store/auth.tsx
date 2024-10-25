import { createContext, useContext, useEffect, useState } from "react";

interface UserInfo {
  username: string;
  role: "ADMIN" | "USER";
  isAdmin: boolean;
}

interface AuthInfo {
  user?: UserInfo;
  setSession: (user: Omit<UserInfo, "isAdmin">) => void;
  removeSession: () => void;
}

const authContext = createContext<AuthInfo>({
  setSession: () => {},
  removeSession: () => {},
});

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<UserInfo | undefined>();

  function setSession(e: Omit<UserInfo, "isAdmin">) {
    setUser({ ...e, isAdmin: e.role === "ADMIN" });
    localStorage.setItem("user", JSON.stringify(e));
  }

  function removeSession() {
    setUser(undefined);
  }

  useEffect(() => {
    const session = localStorage.getItem("user");

    if (session) {
      try {
        setSession(JSON.parse(session));
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <authContext.Provider
      value={{
        user,
        removeSession,
        setSession,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
