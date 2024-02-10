import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/pages/routes";
import { useCategories } from "../hooks/useCategories";
import { COMMON_CATEGOTY } from "../models";
import { todoService } from "..";

export function TodoOverview() {
  const categories = useCategories();
  const navigate = useNavigate();

  useEffect(() => {
    if (!categories.length) navigate(ROUTES.home);
  }, [categories]);

  return (
    <div className="grid grid-cols-2">
      {categories.map((category) => (
        <Link
          className="p-3 content-center border m-1 rounded"
          key={category}
          to={{ pathname: ROUTES.home, search: `?category=${category}` }}
        >
          <div className="capitalize">
            {category?.length ? category : COMMON_CATEGOTY}
            &nbsp;
            {todoService.getTodoItems({ category }).length}
          </div>
        </Link>
      ))}
    </div>
  );
}
