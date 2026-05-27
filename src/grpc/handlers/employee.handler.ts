import { employeeService } from "../../shared/container";
import { toGrpcError } from "../../shared/grpc/grpc-error";

const mapEmployee = (employee: any) => ({
  id: employee.id,
  fullName: employee.fullName,
  name: employee.fullName, // Alias for backward compatibility
  department: employee.department ?? "",
  className: employee.department ?? "", // Alias for backward compatibility (class_name)
  position: employee.position ?? "",
  rfidUid: employee.rfidUid,
  faceImagePath: employee.faceImagePath ?? "",
  isActive: employee.isActive,
  createdAt: employee.createdAt.toISOString(),
  updatedAt: employee.updatedAt.toISOString()
});

export const employeeHandlers = {
  CreateEmployee: async (call: any, callback: any) => {
    try {
      const employee = await employeeService.create(call.request);
      callback(null, { employee: mapEmployee(employee) });
    } catch (error) {
      callback(toGrpcError(error));
    }
  },
  UpdateEmployee: async (call: any, callback: any) => {
    try {
      const employee = await employeeService.update(call.request);
      callback(null, { employee: mapEmployee(employee) });
    } catch (error) {
      callback(toGrpcError(error));
    }
  },
  GetEmployee: async (call: any, callback: any) => {
    try {
      const employee = await employeeService.getById(call.request.id);
      callback(null, { employee: mapEmployee(employee) });
    } catch (error) {
      callback(toGrpcError(error));
    }
  },
  ListEmployees: async (call: any, callback: any) => {
    try {
      const employees = await employeeService.list(call.request);
      callback(null, { employees: employees.map(mapEmployee) });
    } catch (error) {
      callback(toGrpcError(error));
    }
  },
  DeleteEmployee: async (call: any, callback: any) => {
    try {
      await employeeService.delete(call.request.id);
      callback(null, { success: true, message: "Employee deleted" });
    } catch (error) {
      callback(toGrpcError(error));
    }
  }
};
