import PropTypes from "prop-types";
import { createContext, useEffect } from "react";
// hooks
import useLocalStorage from "../../hooks/useLocalStorage";
import darkBG from "../../assets/bg-dark.png";
import lightBG from "../../assets/bg-light.png";

// ----------------------------------------------------------------------

const initialState = {
  onToggleMode: () => {},
};

const SettingsContext = createContext(initialState);

// ----------------------------------------------------------------------

SettingsProvider.propTypes = {
  children: PropTypes.node,
};

function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage("settings", {
    themeMode: initialState.themeMode,
  });

  useEffect(() => {
    document.body.style.backgroundImage = settings.themeMode === "light" ? `url(${lightBG})` : `url(${darkBG})`;
    document.body.style.color = settings.themeMode === "light" ? `black` : `white`;
  }, [settings.themeMode]);

  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === "light" ? "dark" : "light",
    });
  };

  return <SettingsContext.Provider value={{ ...settings, onToggleMode }}>{children}</SettingsContext.Provider>;
}

export { SettingsProvider, SettingsContext };
