import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import * as admin from 'firebase-admin';
  
  @Injectable()
  export class FirebaseAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      const token = req.headers.authorization?.split('Bearer ')[1];
      if (!token) throw new UnauthorizedException('Token missing');
  
      try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.user = decoded;
        return true;
      } catch (err) {
        throw new UnauthorizedException('Invalid Firebase token');
      }
    }
  }
  