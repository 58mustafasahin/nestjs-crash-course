import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from '@app/users/controllers/users/users.controller';
import { UsersService } from '@app/users/services/users/users.service';
import { ExampleMiddleware } from './middlewares/example.middleware';
import { AnotherMiddleware } from './middlewares/another.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AnotherMiddleware)
      .forRoutes(
        {
          path: 'users',
          method: RequestMethod.GET,
        },
        {
          path: 'users/:id',
          method: RequestMethod.GET,
        },
      )
      .apply(ExampleMiddleware)
      .forRoutes(
        {
          path: 'users',
          method: RequestMethod.GET,
        },
        {
          path: 'users/:id',
          method: RequestMethod.GET,
        },
      );
  }
}
