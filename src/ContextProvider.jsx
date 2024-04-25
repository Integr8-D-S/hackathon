import { createContext, useContext, useState } from "react";

//  A new context named StateContext is created using createContext function
const StateContext = createContext({
  user: null,
  token: null,
  notification: null,
  project: null,
  team: null,
  testimonial: null,
  contact: null,
  role: null,
  permission: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
  setProject: () => {},
  setTeam: () => {},
  setTestimonial: () => {},
  setContact: () => {},
  setRole: () => {},
  setPermission: () => {},
});

export const ContextProvider = ({ children }) => {
  // State variables and setter functions using useState hook
  const [user, setUser] = useState({});
  const [notification, _setNotification] = useState("");
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [project, setProject] = useState({});
  const [team, setTeam] = useState({});
  const [testimonial, setTestimonial] = useState({});
  const [contact, setContact] = useState({});
  const [role, setRole] = useState({});
  const [permission, setPermission] = useState({});

  // Custom setter function for notification with auto-clear feature
  const setNotification = (message) => {
    _setNotification(message);
    setTimeout(() => {
      _setNotification("");
    }, 5000);
  };

  // Custom setter function for token with local storage handling
  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  // Providing state and setter functions as context value
  return (
    <StateContext.Provider
      value={{
        user,
        token,
        notification,
        project,
        team,
        testimonial,
        contact,
        role,
        permission,
        setUser,
        setToken,
        setNotification,
        setProject,
        setTeam,
        setTestimonial,
        setContact,
        setRole,
        setPermission,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
