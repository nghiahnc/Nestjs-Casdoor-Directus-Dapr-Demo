// subscriber.controller.ts
import { Controller, Post, Body } from '@nestjs/common';

@Controller()
export class SubscriberController {
@Post('content-updated')
handle(@Body() body: any) {
  console.log('raw body:', body);

  const data = body?.data;   // 👈 SỬA Ở ĐÂY
  if (!data) return { ok: true };

  console.log('📩 data:', data);
  return { ok: true };
}

}
