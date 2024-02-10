import { useEffect } from "react";
import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";
import { HomePage, LogPage, SettingsPage, UserInputsPage } from "@/pages";
import { ROUTES } from "@/pages/routes";
import { PromptLogStorageSync } from "@/features/debug";
import { TodoStorageSync } from "@/features/todo";
import { UserInputStorageSync } from "@/features/userInput";
import { bootstrap } from "@/features/bootstrap";
import { TodoOverviewPage } from "@/pages/TodoOverviewPage";
import "@/App.css";

function Layout() {
  return (
    <div className="max-w-lg bg-white min-h-screen">
      <Outlet />
    </div>
  );
}

function NoMatch() {
  return <div>Page not found!!!</div>;
}

function App() {
  
  useEffect(() => {
    PromptLogStorageSync.init();
    TodoStorageSync.init();
    UserInputStorageSync.init();
    const clean = bootstrap();
    return clean;
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={ROUTES.logs} element={<LogPage />} />
            <Route path={ROUTES.userInputs} element={<UserInputsPage />} />
            <Route path={ROUTES.todoOverview} element={<TodoOverviewPage />} />
            <Route path={ROUTES.settings} element={<SettingsPage />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
