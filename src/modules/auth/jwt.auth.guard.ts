import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private excludedRoutes = [
    { method: 'POST', path: '/users/create' },
    { method: 'POST', path: '/users/login' },
  ];

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;

    // Skip authentication for excluded routes
    if (this.excludedRoutes.some(route => route.method === method && url.startsWith(route.path))) {
      return true;
    }

    // Handle Observable return type from super.canActivate
    const result = super.canActivate(context);
    if (result instanceof Observable) {
      return firstValueFrom(result); // Convert Observable to Promise
    }

    return result; // Return boolean or Promise<boolean> directly
  }
}
