import { SubmitHandler, useForm } from "react-hook-form";
import { useSettings } from "..";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/pages/routes";

interface IFormInput {
  openAiKey: string;
}

export function SettingsForm() {
  const navigate = useNavigate();
  const { setOpenAiKey, openAiKey } = useSettings();
  const { register, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      openAiKey: openAiKey ?? "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setOpenAiKey(data.openAiKey);
    setImmediate(() => {
      navigate(ROUTES.home);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-5 flex flex-col">
      <label
        htmlFor="open-ai-key"
        className="block text-sm font-medium leading-6 text-slate-900"
      >
        Open AI Token
      </label>
      <div className="mt-1">
        <input
          {...register("openAiKey")}
          id="open-ai-key"
          type="password"
          className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>

      <button type="submit" className="btn btn-primary mt-2">
        Submit
      </button>
    </form>
  );
}
