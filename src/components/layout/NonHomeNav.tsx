import { Link } from "react-router-dom";

export function NonHomeNav() {
  return (
    <div className="p-2 py-3 bg-white shadow border-t">
      <Link to="/" className="underline text-blue-500">
        &lt; Home
      </Link>
      <div className="float-right text-slate-400">v{APP_VERSION}</div>
    </div>
  );
}
