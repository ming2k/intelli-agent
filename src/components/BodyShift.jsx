import Trans from "./Trans";

import { useGlobalContext } from "../context";
import "./BodyShift.css";

function BodyShift() {
  const { audioUrl, transAudioUrl, setAudioUrl, setTransAudioUrl } =
    useGlobalContext();
  const shift = () => {
    if (audioUrl === "" && transAudioUrl === "") {
      return (
        <div className="init">
          <h1>Welcome to Voice Translator</h1>
          <p>
            - We are from <span style={{ fontWeight: "bold" }}>Q*</span> Space
          </p>
        </div>
      );
    } else if (audioUrl !== "" && transAudioUrl === "") {
      return (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Translating...</p>
        </div>
      );
    } else if (audioUrl !== "" && transAudioUrl !== "") {
      return <Trans onTransAudioReady={(url) => setTransAudioUrl(url)} />;
    }
  };

  return shift();
}

export default BodyShift;
