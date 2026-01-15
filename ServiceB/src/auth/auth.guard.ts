import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    if (!req.session?.user) {
      // ✅ lưu lại trang user đang vào
      req.session.returnTo = req.originalUrl;

      return res.redirect('/auth/login');
    }

    return true;
  }
}
