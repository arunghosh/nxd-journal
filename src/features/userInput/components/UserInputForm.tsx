import { FormEvent, useState } from "react";
import { useUserInput } from "../hooks/useUserInput";
import { capitalizeFirstLetter, sufixSeprator } from "@/utils/string";
import { Microphone } from "./Microphone";

export function UserInputForm() {
  const [userInput, setUserInput] = useState("");
  const { addUserInput } = useUserInput();
  const [transcript, setTranscript] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addUserInput(userInput);
    setUserInput("");
  }

  function onFinalTranscript(finalTranscript: string) {
    setTranscript("");
    setUserInput((ui) => {
      return ui + sufixSeprator(capitalizeFirstLetter(finalTranscript));
    });
  }

  function onTranscript(transcript: string) {
    setTranscript(capitalizeFirstLetter(transcript));
  }

  return (
    <form onSubmit={onSubmit} className="bg-white">
      <textarea
        rows={3}
        className="p-2 font w-full"
        onChange={(e) => setUserInput(e.target.value)}
        value={userInput + transcript}
        placeholder={`Click on "Speak" and convey your todo. \nE.g. "I need to buy some gorceries." \nMake edits if required and click "Send"'`}
      />
      <div>
        <button
          className="btn btn-primary float-right"
          disabled={!userInput.length}
        >
          Send
        </button>
        <Microphone
          // onListeningChange={onListeningChange}
          onFinalTranscript={onFinalTranscript}
          onTranscript={onTranscript}
        />
      </div>
    </form>
  );
}
