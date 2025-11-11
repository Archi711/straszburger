import { NewGameForm } from "@/components/features/admin/new-game-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Admin = () => {
	return (
		<div className="min-h-screen">
			<Tabs>
				<TabsList>
					<TabsTrigger value="new">Stwórz nową grę</TabsTrigger>
					<TabsTrigger value="manage">Kontynuuj grę</TabsTrigger>
				</TabsList>
				<TabsContent value="new">
					<NewGameForm />
				</TabsContent>
				<TabsContent value="manage">
					<form className="grid gap-4">
						<Input />
						<Button>Przejdź do gry</Button>
					</form>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Admin;
