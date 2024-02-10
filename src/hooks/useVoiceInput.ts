import { useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface Props {
  onTranscript: (transcript: string) => void;
  onFinalTranscript: (transcript: string) => void;
}

export function useVoiceInput({ onFinalTranscript, onTranscript }: Props) {
  const isEnabledRef = useRef(false);

  const {
    transcript,
    browserSupportsSpeechRecognition,
    listening,
    resetTranscript,
    finalTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    if (finalTranscript.length && isEnabledRef.current) {
      isEnabledRef.current = false;
      onFinalTranscript(finalTranscript);
      resetTranscript();
    }
  }, [finalTranscript]);

  function startListening() {
    isEnabledRef.current = true;
    SpeechRecognition.startListening();
  }

  useEffect(() => {
    isEnabledRef.current && onTranscript(transcript);
  }, [transcript]);

  return {
    startListening,
    listening: listening && isEnabledRef.current,
    isSpeechSupported: browserSupportsSpeechRecognition,
  };
}
