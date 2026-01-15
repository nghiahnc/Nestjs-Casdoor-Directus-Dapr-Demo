import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { DirectusService } from './directus/directus.service';
import { DaprService } from './dapr/dapr.service';

@Module({
    controllers: [PostsController],
    providers: [DirectusService, DaprService],
})
export class AppModule { }
