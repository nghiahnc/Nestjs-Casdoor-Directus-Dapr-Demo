import { Injectable } from '@nestjs/common'; // 👈 THIẾU
import { DaprClient, CommunicationProtocolEnum } from '@dapr/dapr'; // 👈 THIẾU

@Injectable()
export class DaprService {
  private client: DaprClient;

  constructor() {
    this.client = new DaprClient({
      daprHost: process.env.DAPR_HOST ?? '127.0.0.1',
      daprPort: process.env.DAPR_HTTP_PORT ?? '3500',
      communicationProtocol: CommunicationProtocolEnum.HTTP,
    });
  }

  async publish(topic: string, data: any): Promise<void> {
    await this.client.pubsub.publish('my-pubsub', topic, data);
  }
}
