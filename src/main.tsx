import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "jotai";
import { BrowserRouter, Route, Routes } from "react-router";
import { AdminGuard } from "./features/AdminGuard";

const App = lazy(() => import("./App"));
const Admin = lazy(() => import("./features/Admin"));

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider>
			<BrowserRouter>
				<Routes>
					<Route index Component={App} />
					<Route path="/admin" Component={AdminGuard}>
						<Route index Component={Admin} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	</StrictMode>,
);
