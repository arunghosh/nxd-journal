import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { If } from "@/components";
import { useQuery } from "@/hooks";
import { ROUTES } from "@/pages/routes";
import { useCategories } from "../hooks/useCategories";

export function TodoCategorySwitcher() {
  const categories = useCategories();
  const category = useQuery().get("category") as string ?? "";
  const navigate = useNavigate();

  function selectCategory(e: ChangeEvent<HTMLSelectElement>) {
    const selectedCategory = e.target.value;
    if (selectedCategory.length) {
      navigate({
        pathname: ROUTES.home,
        search: "?category=" + e.target.value,
      });
    } else {
      navigate(ROUTES.home);
    }
  }

  const options = [{ display: "All", value: "" }];
  categories.forEach((c) => options.push({ display: c, value: c }));

  return (
    <If condition={categories.length > 1}>
      <select
        className="ml-1 focus:outline-none capitalize text-blue-600"
        value={category}
        onChange={selectCategory}
      >
        {options.map((option) => (
          <option
            key={option.display}
            value={option.value}
            className="capitalize ml-1 inline-block text-blue-600"
          >
            {option.display}
          </option>
        ))}
      </select>
    </If>
  );
}
