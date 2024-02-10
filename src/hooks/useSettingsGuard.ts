import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../features/settings";
import { ROUTES } from "../pages/routes";

export function useSettingsGuard() {
  const { hasMandatorySettings } = useSettings();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!hasMandatorySettings) {
      navigate(ROUTES.settings);
    }
  }, [hasMandatorySettings]);
}