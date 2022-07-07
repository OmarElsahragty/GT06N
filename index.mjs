import { createServer } from "net";
import gt06n from "./lib/gt06n.mjs";

createServer((connection) => {
  connection.setEncoding("hex");
  connection.on("data", (packet) => {
    const parsedData = gt06n(packet);

    console.log(parsedData);

    if (parsedData.responseMessage) {
      connection.write(parsedData.responseMessage);
    }
  });
})
  .on("listening", () => console.log("server is running on port 3333"))
  .listen(3333);
