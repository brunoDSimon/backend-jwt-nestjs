import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schemas/users.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature(
      [
        {
      name: 'User',
      schema: UsersSchema
    }]),
    AuthModule
  ]
})
export class UsersModule {}
