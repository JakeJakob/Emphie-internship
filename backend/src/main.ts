import { server } from "app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log(`Express is running at http://localhost:${port}`);
});
