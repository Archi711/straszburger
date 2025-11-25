import React from "react";
import { Outlet } from "react-router";

// YEAH I KNOW

const P = "1234";

export const AdminGuard = () => {
	const [pwd, setPwd] = React.useState("");
	return (
		<div className="min-h-screen grid place-items-center">
			{" "}
			{pwd === P ? (
				<Outlet />
			) : (
				<input value={pwd} onChange={(e) => setPwd(e.target.value)} />
			)}
		</div>
	);
};
