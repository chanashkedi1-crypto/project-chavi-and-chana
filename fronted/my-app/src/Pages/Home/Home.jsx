import { Outlet} from "react-router-dom";
import Header from "../Home/Header.jsx";

export default function Home() {
  return (
    <div className="home-container">
      <Header />
      <main className="main-content" style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}