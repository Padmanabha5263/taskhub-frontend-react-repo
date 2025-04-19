import styled from "styled-components";
import logo from "../assets/images/logo.png";

function Header() {
  const HeaderContainer: any = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100px;
    background-color: #000;
    color: #fff;

    .flex-container {
      margin: 10px;
      padding: 20px;
      font-size: 30px;
    }
  `;
  return (
    <HeaderContainer>
      <div className="logo-section flex-container">
        <img src={logo} alt="taskhub logo" height={50} width={50} />
      </div>
      <div className="app-name-section flex-container">TaskHub</div>
      <div className="logout-section flex-container">logout</div>
    </HeaderContainer>
  );
}

export default Header;
