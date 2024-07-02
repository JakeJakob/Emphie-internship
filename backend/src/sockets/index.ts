import { io } from "main";

// TODO: Some token middleware

io.on("connection", (socket) => {
	console.log("a user connected");

	socket.on("disconnect", (reason) => {
		console.log("a user disconnected");
	});
});
