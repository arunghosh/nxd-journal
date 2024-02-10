import { Link } from "react-router-dom";
import { ROUTES } from "@/pages/routes";
import { If } from "../common";
import { useCategories } from "@/features/todo/hooks/useCategories";

export function ShortCuts() {
  const categories = useCategories();
  return (
    <div className="bg-white text-blue-400">
      <If condition={categories.length}>
        <Link
          to={ROUTES.todoOverview}
          className="underline py-3 mr-2"
        >
          Todo Overview
        </Link>
      </If>
      <Link to={ROUTES.settings} className="underline py-3 mr-2">
        Settings
      </Link>
      <div className="float-right">
        <Link
          to={ROUTES.userInputs}
          className="underline py-3 mr-2"
        >
          Journals
        </Link>
        <Link to={ROUTES.logs} className="underline py-3">
          LLM Logs
        </Link>
      </div>
    </div>
  );
}
