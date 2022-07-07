import { createServer } from "net";
import gt06n from "./gt06n.mjs";

createServer((connection) => {
  connection.setEncoding("hex");
  connection.on("data", (packet) => {
    const parsedData = gt06n.parse(packet);

    console.log(parsedData);

    if (parsedData.event === "login") {
      connection.write(Buffer.from(parsedData.imei, "utf8"));
    }
  });
})
  .on("listening", () => console.log("server is running on port 3333"))
  .listen(3333);
