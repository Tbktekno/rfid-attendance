import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Secret, SignOptions } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { env } from "../../../config/env";
import { AppError } from "../../../shared/errors/app-error";
import { LoginDto, RegisterDto } from "../dto/auth.dto";
import { UserRepository } from "../repository/user.repository";

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(input: RegisterDto): Promise<{ token: string; user: { id: string; name: string; email: string; role: string } }> {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Email already registered");
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await this.userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash,
      role: input.role
    });

    return {
      token: this.generateToken(user),
      user
    };
  }

  async login(input: LoginDto): Promise<{ token: string; user: { id: string; name: string; email: string; role: string } }> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      console.warn(`[AUTH] Login failed: User not found for email ${input.email}`);
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
    }

    const passwordMatches = await bcrypt.compare(input.password, user.passwordHash);
    if (!passwordMatches) {
      console.warn(`[AUTH] Login failed: Password mismatch for email ${input.email}`);
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
    }

    console.info(`[AUTH] Login successful for email ${input.email}`);

    return {
      token: this.generateToken(user),
      user
    };
  }

  private generateToken(user: { id: string; email: string; role: string }): string {
    return jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role
      },
      env.JWT_SECRET as Secret,
      {
        expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
      }
    );
  }
}
