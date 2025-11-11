/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "@/components/Layout";
import { App } from "./App";

const Admin = React.lazy(() => import("src/components/features/admin/admin"));
const Display = React.lazy(
	() => import("src/components/features/display/display"),
);
const GameDisplay = React.lazy(
	() => import("src/components/features/display/game-display"),
);
const qc = new QueryClient();

// biome-ignore lint/style/noNonNullAssertion: We care about it, but not that much
const elem = document.getElementById("root")!;
const app = (
	<StrictMode>
		<QueryClientProvider client={qc}>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route index Component={App}></Route>
						<Route path="/admin" Component={Admin}></Route>
						<Route index path="/display" Component={Display}></Route>
						<Route path="/display/:gameId" Component={GameDisplay}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>
);

if (import.meta.hot) {
	// With hot module reloading, `import.meta.hot.data` is persisted.
	// biome-ignore lint/suspicious/noAssignInExpressions: This is how they did so
	const root = (import.meta.hot.data.root ??= createRoot(elem));
	root.render(app);
} else {
	// The hot module reloading API is not available in production.
	createRoot(elem).render(app);
}
