import { Injectable } from '@nestjs/common';
import axios from 'axios';

const DIRECTUS_URL = 'http://localhost:8055';
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN; // nhớ set .env

@Injectable()
export class PostsService {
    private headers() {
        return {
            Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        };
    }

    async create(data: any) {
        const res = await axios.post(
            `${DIRECTUS_URL}/items/posts`,
            data,
            { headers: this.headers() },
        );
        return res.data.data;
    }

    async findAll() {
        const res = await axios.get(
            `${DIRECTUS_URL}/items/posts`,
        );
        return res.data.data;
    }

    async findOne(id: string) {
        const res = await axios.get(
            `${DIRECTUS_URL}/items/posts/${id}`,
        );
        return res.data.data;
    }



    async update(id: string, data: any) {
        const res = await axios.patch(
            `${DIRECTUS_URL}/items/posts/${id}`,
            data,
            { headers: this.headers() },
        );
        return res.data.data;
    }

    async remove(id: string) {
        await axios.delete(
            `${DIRECTUS_URL}/items/posts/${id}`,
            { headers: this.headers() },
        );
        return { success: true };
    }
}
