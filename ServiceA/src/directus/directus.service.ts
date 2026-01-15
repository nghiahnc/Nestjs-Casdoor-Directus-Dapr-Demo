import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DirectusService {
    private token: string | null = null;
    private baseUrl = process.env.DIRECTUS_URL!;

    constructor() {
        if (!this.baseUrl) throw new Error('DIRECTUS_URL missing');
    }

    async getToken(force = false) {
        if (this.token && !force) return this.token;

        const res = await axios.post(`${this.baseUrl}/auth/login`, {
            email: process.env.DIRECTUS_EMAIL,
            password: process.env.DIRECTUS_PASSWORD,
        });

        this.token = res.data.data.access_token;
        return this.token;
    }

    private async headers() {
        return { Authorization: `Bearer ${await this.getToken()}` };
    }

    async findAll(collection: string) {
        const res = await axios.get(
            `${this.baseUrl}/items/${collection}`,
            { headers: await this.headers() },
        );
        return res.data.data;
    }

    async create(collection: string, data: any) {
        const res = await axios.post(
            `${this.baseUrl}/items/${collection}`,
            data,
            { headers: await this.headers() },
        );
        return res.data.data;
    }
}
