import RadioButtonCheckedTwoToneIcon from "@mui/icons-material/RadioButtonCheckedTwoTone";
import RadioButtonUncheckedTwoToneIcon from "@mui/icons-material/RadioButtonUncheckedTwoTone";
import { useState, useRef } from "react";
import "./AudioRecorder.css";
import { useGlobalContext } from "../context";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const { audioUrl, transAudioUrl, setAudioUrl, setTransAudioUrl, lang, setLang, transText, setTransText } =
    useGlobalContext();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setIsPlaying(true);

        function blobToBase64(blob, callback) {
          const reader = new FileReader();

          // Define what happens when the reading is complete
          reader.onloadend = () => {
            // reader.result contains the data URL (base64 encoded string)
            // The format of reader.result will be "data:[<MIME-type>][;charset=<encoding>][;base64],<encoded-data>"
            const base64String = reader.result.split(",")[1]; // Extract base64 string
            callback(base64String); // Call the callback with the base64 string
          };

          // Start reading the Blob as a Data URL
          reader.readAsDataURL(blob);
        }

        const base64ToBlob = (base64, mimeType) => {
          const byteCharacters = atob(base64);
          const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
          const byteArray = new Uint8Array(byteNumbers);
          return new Blob([byteArray], { type: mimeType });
        };

        blobToBase64(blob, (base64String) => {
          // WARN Network
          fetch("http://47.236.190.190:3766/data", {
            method: "POST", // Specifies the HTTP method
            headers: {
              "Content-Type": "application/json", // Specifies the type of the request body
              "Authorization": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            },
            body: JSON.stringify({
              target: lang,
              audio: base64String,
            }), // Converts JavaScript object to JSON string
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              const audioBlob = base64ToBlob(data.result, 'audio/wav');
              const transAudioUrl = URL.createObjectURL(audioBlob);
              setTransAudioUrl(transAudioUrl);
              setTransText(data.text);
            });
          // You can use the base64String for further processing
        });

        // Clear recorded chunks
        recordedChunks.current = [];

        // Optionally stop the media stream
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      setTransAudioUrl("")
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      {isRecording ? (
        <RadioButtonUncheckedTwoToneIcon
          className="icon"
          onClick={stopRecording}
          disabled={!isRecording}
        />
      ) : (
        <RadioButtonCheckedTwoToneIcon
          className="icon"
          onClick={startRecording}
          disabled={isRecording}
        />
      )}
    </div>
  );
};

export default VoiceRecorder;
