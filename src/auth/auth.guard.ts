// src/auth/auth.guard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import * as jwt from 'jsonwebtoken';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<Request>();
      const authHeader = request.headers.authorization;
  
      if (!authHeader) throw new UnauthorizedException('No token provided');
  
      const token = authHeader.split(' ')[1];
      const secret = process.env.JWT_SECRET;
  
      if (!secret) throw new Error('JWT_SECRET not set in .env');
  
      try {
        const decoded = jwt.verify(token, secret);
        request.user = decoded;
        return true;
      } catch (err) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }
  