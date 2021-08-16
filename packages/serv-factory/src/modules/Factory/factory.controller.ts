import {
  Controller, Post, Param, Body,
} from '@nestjs/common';
import { BotType } from 'shared-types';
import { FactoryService } from './factory.service';

@Controller('bot')
export class FactoryController {
  constructor(private readonly factoryService: FactoryService) {}

  @Post([':type/:id'])
  create(@Param('type') type: BotType, @Param('id') id: string, @Body('token') token: string): string {
    this.factoryService.createBots([
      {
        id,
        type,
        token,
      },
    ]);

    return 'success';
  }

  // @Delete([':id'])
  // delete(@Param('id') id: string, @Body('token') token: string): string {
  //   this.factoryService.createBots([
  //     {
  //       id,
  //       token,
  //     },
  //   ]);

  //   return 'success';
  // }
}
