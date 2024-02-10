import { FormEvent, useState } from "react";
import {
  FaMicrophone,
  FaCheck,
  FaPlusCircle as PlusIcon,
} from "react-icons/fa";
import { useVoiceInput } from "@/hooks/useVoiceInput";
import { todoService } from "../services";

export function AddTodoItemInput({ category }: { category: string }) {
  const [text, setText] = useState("");
  const { listening, startListening } = useVoiceInput({
    onTranscript,
    onFinalTranscript: onTranscript,
  });

  function onTranscript(transcript: string) {
    setText(transcript);
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    todoService.addItem(text, category);
    setText("");
  }

  return (
    <form className="flex border border-x-0" onSubmit={submit}>
      <label
        htmlFor="newTodoInput"
        className="text-md pr-4 pl-0.5 pt-2 text-slate-400 text-lg"
      >
        <PlusIcon />
      </label>
      <input
        value={text}
        type="text"
        id="newTodoInput"
        className="p-1 py-2 flex-grow focus:outline-0 pl-0"
        placeholder={`Add todo to ${category}`}
        onChange={(e) => setText(e.target.value)}
      />
      {listening ? (
        ""
      ) : (
        <button onClick={startListening} type="button" className="p-1 px-3">
          <FaMicrophone className="text-slate-400" />
        </button>
      )}
      {text.trim().length ? (
        <button type="submit" className="p-1 px-3">
          <FaCheck className="text-green-600" />{" "}
        </button>
      ) : (
        ""
      )}
    </form>
  );
}
