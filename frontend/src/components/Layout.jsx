import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
        <Outlet />
        <img className="spider-corner" src="/images/Spider-Silhouette.svg" alt="" aria-hidden="true" />
    </>
  )
}
export default Layout;