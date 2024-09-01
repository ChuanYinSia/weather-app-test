import { useContext } from "react";
import { SettingsContext } from "../components/setting/SettingsContext";

// ----------------------------------------------------------------------

const useSettings = () => useContext(SettingsContext);

export default useSettings;
