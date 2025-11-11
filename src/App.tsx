import { Layout } from "@/components/Layout";
import "./index.css";
import { FScreen } from "@/components/FScreen";
import { GList } from "@/components/GList";
export function App() {
	return (
		<Layout>
			<FScreen />
			<GList />
		</Layout>
	);
}

export default App;
