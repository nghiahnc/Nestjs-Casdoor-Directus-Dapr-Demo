import { Controller, Get, Post, Body } from '@nestjs/common';
import { DirectusService } from './directus/directus.service';
import { DaprService } from './dapr/dapr.service';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly directus: DirectusService,
        private readonly dapr: DaprService,
    ) { }

    @Get()
    async getAll() {
        return this.directus.findAll('posts');
    }

    @Post()
    async create(@Body() body: any) {
        const post = await this.directus.create('posts', body);

        // publish event
        await this.dapr.publish('post-created', post);

        return post;
    }
}
