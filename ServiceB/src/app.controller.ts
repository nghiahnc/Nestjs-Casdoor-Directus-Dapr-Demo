import { Controller, Get, Post, UseGuards } from '@nestjs/common'; 
import { DaprService } from './dapr/dapr.service';
import { AuthGuard } from './auth/auth.guard'; 
import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly daprService: DaprService) {}

  @Get('na')
  @UseGuards(AuthGuard)
  getHello() {
    return { message: 'Hello from NestJS with Dapr!' };
  }
  @Get('call')
    @UseGuards(AuthGuard)
async callAuth() {
  const res = await axios.get(
    `http://localhost:3500/v1.0/invoke/service-a/method/posts`,
    {
      headers: {
        Authorization: 'Bearer demo-token', 
      },
    },
  );

  return res.data;
}

 @Post('publish-test')
async publishTest() {
  await this.daprService.publish('content-updated', {
    message: 'hello',
  });
  return { ok: true };
}


}
