import { useState } from "react";
import AudioRecorder from "./components/AudioRecorder";
import LangOpt from "./components/LangOpt";
import TranslateTwoToneIcon from "@mui/icons-material/TranslateTwoTone";
import BodyShift from "./components/BodyShift";
import { GlobalContext } from "./context";
import "./App.css";

function App() {
  const [lang, setLang] = useState("eng");
  const [audioUrl, setAudioUrl] = useState("");
  const [transAudioUrl, setTransAudioUrl] = useState("");
  const [transText, setTransText] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        audioUrl,
        setAudioUrl,
        transAudioUrl,
        setTransAudioUrl,
        lang,
        setLang,
        transText,
        setTransText,
      }}
    >
      <div className="app">
        <header className="header">
          <div className="header-left">
            <span
              style={{
                margin: "0 5px",
                backgroundColor: "white",
                color: "black",
                fontWeight: "bold",
                borderRadius: "5px",
              }}
            >
              Q*
            </span>
            Space Voice Translator
          </div>
          <div className="header-right">
            <TranslateTwoToneIcon style={{ marginRight: "10px" }} />
            <LangOpt
              options={[
                { value: "eng", label: "English" },
                { value: "fra", label: "Fresh" },
                { value: "spa", label: "Spanish" },
                { value: "deu", label: "German" },
                // { value: "jpn", label: "Japanese" },
                // { value: "kor", label: "Korean" },
              ]}
            />
          </div>
        </header>
        <div className="body">
          {/* <TestAu /> */}
          <BodyShift audioUrl={audioUrl} transAudioUrl={transAudioUrl} />
        </div>
        <div className="dashboard">
          <div className="line-bar">
            <AudioRecorder />
          </div>
        </div>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;