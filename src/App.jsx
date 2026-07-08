import Board from "./components/Board.jsx";
import BannerSlider from "./components/BannerSlider.jsx";
import MarqueeBanner from "./components/MarqueeBanner.jsx";

export default function App() {
  return (
    <>
      <MarqueeBanner />
      <div style={{ background: "#f6f9fc", paddingTop: 32 }}>
        <BannerSlider />
      </div>
      <Board />
    </>
  );
}
