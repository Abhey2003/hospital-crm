import { createPortal } from "react-dom";

function NavbarPortal({ children }) {
  const portalRoot = document.getElementById("navbar-root");

  if (!portalRoot) return null;

  return createPortal(children, portalRoot);
}

export default NavbarPortal;