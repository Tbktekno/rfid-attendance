const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const packageDefinition = protoLoader.loadSync("i:/rfid_v3/src/proto/platform.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const client = new protoDescriptor.platform.EmployeeService("localhost:50051", grpc.credentials.createInsecure());

client.ListEmployees({ search: "" }, (err, response) => {
  if (err) console.error(err);
  else console.log(JSON.stringify(response, null, 2));
});
