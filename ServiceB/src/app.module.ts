import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DaprService } from './dapr/dapr.service';
import { AuthModule } from './auth/auth.module';
import { SubscriberController } from './subscriber.controller';

import { DaprSubscribeController } from './dapr-subscribe.controller'; // 👈 THÊM

@Module({
  imports: [AuthModule],
  controllers: [
    AppController,
    SubscriberController,
    DaprSubscribeController,// 👈 BẮT BUỘC
  ],
  providers: [DaprService],
})
export class AppModule {}
