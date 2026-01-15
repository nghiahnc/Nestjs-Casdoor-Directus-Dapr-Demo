// dapr-subscribe.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller()
export class DaprSubscribeController {

  @Get('dapr/subscribe')
  subscribe() {
    return [
      {
        pubsubname: 'my-pubsub',
        topic: 'content-updated',
        route: 'content-updated',
      },
    ];
  }
}
