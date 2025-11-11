import "./index.css";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
export function App() {
	return (
		<Card className="">
			<CardHeader>
				<CardTitle>Familiada</CardTitle>
				<CardDescription>
					Wybierz tryb administruj, jeśli będziesz zarządzać grą - lub
					wyświetlaj jeśli tylko podłączasz się do tablicy.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-2">
				<Button asChild variant={"outline"}>
					<Link to="/display">Wyświetlaj</Link>
				</Button>
				<Button asChild variant={"ghost"}>
					<Link to="/admin">Administruj</Link>
				</Button>
			</CardContent>
		</Card>
	);
}

export default App;
