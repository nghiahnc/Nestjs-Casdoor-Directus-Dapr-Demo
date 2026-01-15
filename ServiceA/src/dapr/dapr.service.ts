import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DaprService {
    private daprUrl = `http://localhost:${process.env.DAPR_HTTP_PORT}`;

    async publish(topic: string, data: any) {
        await axios.post(
            `${this.daprUrl}/v1.0/publish/my-pubsub/${topic}`,
            data,
            { headers: { 'Content-Type': 'application/json' } },
        );
    }
}
