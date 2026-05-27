import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { grpcClients, promisifyGrpc } from "../../../shared/grpc/grpc-client";
import { persistBase64Image } from "../../../shared/utils/file-storage";

export class EmployeeController {
  async create(req: Request, res: Response): Promise<void> {
    const faceImagePath =
      req.file?.path ??
      (req.body.faceImageBase64 ? await persistBase64Image(req.body.faceImageBase64, "employee-face") : undefined);

    const response = await promisifyGrpc<{ employee: Record<string, unknown> }>(
      grpcClients.employee,
      "CreateEmployee",
      {
        ...req.body,
        fullName: req.body.fullName || req.body.name || "", // Compatibility with name
        faceImagePath: faceImagePath ?? req.body.faceImagePath ?? "",
        faceImageBase64: req.body.faceImageBase64 ?? ""
      }
    );

    // Backward compatibility: add 'student' key
    res.status(StatusCodes.CREATED).json({
      ...response,
      student: response.employee
    });
  }

  async update(req: Request, res: Response): Promise<void> {
    const faceImagePath =
      req.file?.path ??
      (req.body.faceImageBase64 ? await persistBase64Image(req.body.faceImageBase64, "employee-face") : undefined);

    const response = await promisifyGrpc<{ employee: Record<string, unknown> }>(
      grpcClients.employee,
      "UpdateEmployee",
      {
        ...req.body,
        id: req.params.id,
        fullName: req.body.fullName || req.body.name || "", // Compatibility with name
        faceImagePath: faceImagePath ?? req.body.faceImagePath ?? "",
        faceImageBase64: req.body.faceImageBase64 ?? ""
      }
    );

    // Backward compatibility: add 'student' key
    res.status(StatusCodes.OK).json({
      ...response,
      student: response.employee
    });
  }

  async getById(req: Request, res: Response): Promise<void> {
    const response = await promisifyGrpc<{ employee: Record<string, unknown> }>(
      grpcClients.employee,
      "GetEmployee",
      { id: req.params.id }
    );

    // Backward compatibility: add 'student' key
    res.status(StatusCodes.OK).json({
      ...response,
      student: response.employee
    });
  }

  async list(req: Request, res: Response): Promise<void> {
    const response = await promisifyGrpc<{ employees: Array<Record<string, unknown>> }>(
      grpcClients.employee,
      "ListEmployees",
      { search: req.query.search ?? "" }
    );

    // Backward compatibility: add 'students' key
    res.status(StatusCodes.OK).json({
      ...response,
      students: response.employees
    });
  }

  async delete(req: Request, res: Response): Promise<void> {
    const response = await promisifyGrpc<{ success: boolean; message: string }>(
      grpcClients.employee,
      "DeleteEmployee",
      { id: req.params.id }
    );

    res.status(StatusCodes.OK).json(response);
  }
}
