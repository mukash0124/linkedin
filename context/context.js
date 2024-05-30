import { createContext } from "react";

export const LinkedinContext = createContext();

export const LinkedinProvider = ({ children }) => {
  const requestToCreateUserProfile = async (walletAddress, name) => {
    try {
      await fetch(`/api/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userWalletAddress: walletAddress,
          name: name,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LinkedinContext.Provider
      value={{
        requestToCreateUserProfile,
      }}
    >
      {children}
    </LinkedinContext.Provider>
  );
};
