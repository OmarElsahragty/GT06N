const hex2bin = (hex) => {
  const hexLength = (hex.length / 2) * 8;
  let bin = parseInt(hex, 16).toString(2);

  for (let i = 0; i < 8; i++) {
    if (bin.length < hexLength) bin = `0${bin}`;
  }

  return bin;
};

const parseDate = (packet) => {
  const parsedData = {
    year: parseInt(packet.substr(0, 2), 16),
    month: parseInt(packet.substr(2, 2), 16),
    day: parseInt(packet.substr(4, 2), 16),
    hour: parseInt(packet.substr(6, 2), 16),
    minute: parseInt(packet.substr(8, 2), 16),
    second: parseInt(packet.substr(10, 2), 16),
  };

  return `${[parsedData.year, parsedData.month, parsedData.day].join("-")} ${[
    parsedData.hour,
    parsedData.minute,
    parsedData.second,
  ].join(":")}`;
};

const parseLogin = (packet) => ({
  event: "login",
  imei: parseInt(packet.substr(8, 16)),
  serialNumber: packet.substr(24, 4),
  errorCheck: packet.substr(28, 2),
  responseMessage: Buffer.from("787805010001d9dc0d0a", "hex"),
});

const parseLocation = (packet) => {
  const courseBin = hex2bin(packet.substr(40, 4));

  return {
    event: "location",
    date: parseDate(packet.substr(8, 12)),
    satellites: parseInt(packet.substr(20, 2).substr(0, 1), 16),
    satellitesActive: parseInt(packet.substr(20, 2).substr(1, 1), 16),
    latitude: packet.substr(22, 8),
    longitude: packet.substr(30, 8),
    speed: parseInt(packet.substr(38, 2), 16),
    realTimeGps: courseBin.substr(2, 1),
    gpsPositioned: courseBin.substr(3, 1),
    eastLongitude: courseBin.substr(4, 1),
    northLatitude: courseBin.substr(5, 1),
    course: parseInt(courseBin.substr(6, 10), 2),
    mcc: packet.substr(44, 4),
    mnc: packet.substr(48, 2),
    lac: packet.substr(50, 4),
    cellId: packet.substr(54, 6),
    serialNumber: packet.substr(60, 4),
    errorCheck: packet.substr(64, 4),
  };
};

const parseAlarm = (packet) => {
  const courseBin = hex2bin(packet.substr(40, 4));

  return {
    event: "alarm",
    date: parseDate(packet.substr(8, 12)),
    satellites: parseInt(packet.substr(20, 2).substr(0, 1), 16),
    satellitesActive: parseInt(packet.substr(20, 2).substr(1, 1), 16),
    latitude: packet.substr(22, 8),
    longitude: packet.substr(30, 8),
    speed: parseInt(packet.substr(38, 2), 16),
    realTimeGps: courseBin.substr(2, 1),
    gpsPositioned: courseBin.substr(3, 1),
    eastLongitude: courseBin.substr(4, 1),
    northLatitude: courseBin.substr(5, 1),
    course: parseInt(courseBin.substr(6, 10), 2),
    mcc: packet.substr(46, 4),
    mnc: packet.substr(50, 2),
    lac: packet.substr(52, 4),
    cellId: packet.substr(56, 6),
    terminalInformation: packet.substr(62, 2),
    voltageLevel: packet.substr(64, 2),
    gpsSignal: packet.substr(66, 2),
    alarmLang: packet.substr(68, 4),
    errorCheck: packet.substr(72, 4),
  };
};

const parseStatus = (packet) => {
  const statusBin = hex2bin(packet.substr(8, 6));

  return {
    event: "status",
    realTimeGps: statusBin.substr(2, 1),
    gpsPositioned: statusBin.substr(3, 1),
    eastLongitude: statusBin.substr(4, 1),
    northLatitude: statusBin.substr(5, 1),
    course: parseInt(statusBin.substr(6, 10), 2),
  };
};

export default (packet) => {
  if (!packet.startsWith("7878")) return console.error("unknown header");
  const protocol = packet.substr(6, 2);

  switch (protocol) {
    case "01":
      return parseLogin(packet);

    case "12":
      return parseLocation(packet);

    case "13":
      return parseStatus(packet);

    case "16":
      return parseAlarm(packet);

    default:
      console.error(`unknown protocol number: ${protocol}`);
  }
};
