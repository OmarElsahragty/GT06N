import { connect } from "net";
import gt06n from "../lib/gt06n.mjs";

[
  "78780D01012345678901234500018CDD0D0A", // login
  "78781F120B081D112E10CC027AC7EB0C46584900148F01CC00287D001FB8000380810D0A", // location
  "787825160B0B0F0E241DCF027AC8870C4657E60014020901CC00287D001F726506040101003656A40D0A", // alarm
  "787808134B040300010011061F0D0A", // status
].forEach((packet) => console.log(gt06n(packet)));

const socket = connect(10203, "127.0.0.1")
  .on("error", function (err) {
    console.error("error", err);
    socket.end();
  })
  .on("connect", function () {
    console.log("connected");
    socket.write(Buffer.from("78780D01012345678901234500018CDD0D0A", "hex"));
  })
  .on("error", (err) => console.error(err))
  .on("data", function (data) {
    console.log("data:", data);
  });
