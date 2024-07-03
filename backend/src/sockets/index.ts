import { io } from "main";


io.on("connection", (socket) => {
	console.log("a user connected");

	socket.on("disconnect", (_reason) => {
		console.log("a user disconnected");
	});
});
