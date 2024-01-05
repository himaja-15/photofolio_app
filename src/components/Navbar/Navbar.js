import navbarStyle from "./navbar.module.css";

function Navbar() {
  return (
    <div className={navbarStyle.navbarHeader}>
      <img src={require("../../components/images/logo.png")} alt="Albums" className={navbarStyle.navbarImg}></img>
      <span>PhotFolio</span>
    </div>
  );
}

export default Navbar;
