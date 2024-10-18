import React from "react";
import ReAudio from "./ReAudio";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useGlobalContext } from "../context";
import CloudDownloadTwoToneIcon from '@mui/icons-material/CloudDownloadTwoTone';

function Trans({ text, lang }) {

  const { audioUrl, transAudioUrl, setAudioUrl, setTransAudioUrl, transText, setTransText } =
  useGlobalContext();
  // Add your translation logic here

  return (
    <div>
      <ReAudio audioUrl={audioUrl}/>
      <KeyboardDoubleArrowDownIcon className="trans-arrow-icon" />
      <ReAudio audioUrl={transAudioUrl}/>
      <span style={{color: 'lightgray', width: '50vw', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{transText}</span>
      {/* <CloudDownloadTwoToneIcon /> */}
    </div>
  );
}

export default Trans;
