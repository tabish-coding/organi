import { useEffect } from "react";

export function useNavMenu() {
  useEffect(() => {
    const hamburgerOpen = document.querySelector(".humberger__open");
    const menuWrapper = document.querySelector(".humberger__menu__wrapper");
    const menuOverlay = document.querySelector(".humberger__menu__overlay");

    const openMenu = () => {
      menuWrapper?.classList.add("show__humberger__menu__wrapper");
      menuOverlay?.classList.add("active");
      document.body.classList.add("over_hid");
    };

    const closeMenu = () => {
      menuWrapper?.classList.remove("show__humberger__menu__wrapper");
      menuOverlay?.classList.remove("active");
      document.body.classList.remove("over_hid");
    };

    hamburgerOpen?.addEventListener("click", openMenu);
    menuOverlay?.addEventListener("click", closeMenu);

    return () => {
      hamburgerOpen?.removeEventListener("click", openMenu);
      menuOverlay?.removeEventListener("click", closeMenu);
    };
  }, []);
}
