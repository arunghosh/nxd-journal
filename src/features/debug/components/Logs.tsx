import dayjs from "dayjs";
import { useLogs } from "../hooks/useLogs";

export default function Logs() {
  const { logs } = useLogs();
  if (!logs.length)
    return <div className="text-lg text-slate-300">Haven't got any logs !!!</div>;

  const reversed = logs.slice().reverse();

  return (
    <div className="text-xs font-mono">
      {reversed.map((log) => (
        <div key={log.id} className="border p-2 mb-1 rounded bg-slate-50">
          <div className="float-right">
            <span className="text-slate-400">{dayjs(log.date).fromNow()}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(log.data);
              }}
              className="text-blue-400 pl-2"
            >
              copy
            </button>
          </div>
          <pre className="whitespace-break-spaces">
            {typeof log.data === "object" ? JSON.stringify(log.data) : log.data}
          </pre>
        </div>
      ))}
    </div>
  );
}
