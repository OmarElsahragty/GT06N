import { createServer } from "net";
import gt06n from "./gt06n.mjs";

createServer((connection) => {
  connection.setEncoding("hex");
  connection.on("data", (packet) => {
    const parsedData = gt06n.parse(packet);

    console.log(parsedData);

    if (parsedData.event === "login") {
      connection.write(Buffer.from("787805010001d9dc0d0a", "hex"));
    }
  });
})
  .on("listening", () => console.log("server is running on port 3333"))
  .listen(3333);
