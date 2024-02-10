import { FaMicrophone} from "react-icons/fa";
import { useVoiceInput } from "@/hooks/useVoiceInput";

interface Props {
  onTranscript: (transcript: string) => void;
  onFinalTranscript: (transcript: string) => void;
}

export const Microphone = ({ onTranscript, onFinalTranscript }: Props) => {
  const { listening, startListening, isSpeechSupported } =
    useVoiceInput({
      onTranscript,
      onFinalTranscript,
    });

  if (!isSpeechSupported) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <button
      disabled={listening}
      className="btn bg-slate-200 text-black flex flex-row"
      onClick={startListening}
    >
      {listening ? "Listening..." : "Speak"}
      <FaMicrophone className="text-xs mt-1 ml-1" />
    </button>
  );
};
