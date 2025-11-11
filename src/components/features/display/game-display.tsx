import { useParams } from "react-router";

export const GameDisplay = () => {
	const { gameId } = useParams();

	return <div>Gra {gameId}</div>;
};
export default GameDisplay;
