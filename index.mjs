import { createServer } from "net";
import gt06n from "./lib/gt06n.mjs";

createServer((connection) => {
  connection.setEncoding("hex");
  connection.on("data", (packet) => {
    console.log("PACKET", packet);

    const parsedPacket = gt06n(packet);

    console.log("PARSED PACKET", parsedPacket);

    if (!parsedPacket) return;

    if (parsedPacket.responseMessage) {
      connection.write(parsedPacket.responseMessage);
    }
  });
})
  .on("listening", () => console.log("server is running on port 8080"))
  .listen(8080);
