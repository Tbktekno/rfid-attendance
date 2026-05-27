import path from "node:path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const protoPath = path.resolve(process.cwd(), "src/proto/platform.proto");

const packageDefinition = protoLoader.loadSync(protoPath, {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

export const grpcPackage = grpc.loadPackageDefinition(packageDefinition) as any;
export const platformProto = grpcPackage.platform;
