import { StatusCodes } from "http-status-codes";
import { FaceRecognitionClient } from "../../../shared/clients/face-recognition.client";
import { AppError } from "../../../shared/errors/app-error";
import { CreateEmployeeDto, ListEmployeesQuery, UpdateEmployeeDto } from "../dto/employee.dto";
import { EmployeeRepository } from "../repository/employee.repository";

export class EmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly faceRecognitionClient: FaceRecognitionClient
  ) {}

  async create(input: CreateEmployeeDto) {
    const faceDescriptor =
      input.faceImageBase64 || input.faceImagePath
        ? await this.faceRecognitionClient.encodeFace({
            imageBase64: input.faceImageBase64,
            imagePath: input.faceImagePath
          })
        : null;

    return this.employeeRepository.create(input, faceDescriptor);
  }

  async update(input: UpdateEmployeeDto) {
    let faceDescriptor: number[] | undefined;

    if (input.faceImageBase64 || input.faceImagePath) {
      faceDescriptor = await this.faceRecognitionClient.encodeFace({
        imageBase64: input.faceImageBase64,
        imagePath: input.faceImagePath
      });
    }

    const employee = await this.employeeRepository.update(input, faceDescriptor);
    if (!employee) {
      throw new AppError(StatusCodes.NOT_FOUND, "Employee not found");
    }

    return employee;
  }

  async getById(id: string) {
    const employee = await this.employeeRepository.findById(id);
    if (!employee) {
      throw new AppError(StatusCodes.NOT_FOUND, "Employee not found");
    }

    return employee;
  }

  async list(query: ListEmployeesQuery) {
    return this.employeeRepository.list(query.search);
  }

  async delete(id: string) {
    await this.employeeRepository.delete(id);
  }
}
