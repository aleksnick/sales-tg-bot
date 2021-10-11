import {
  Controller, Post, Param, Body,
} from '@nestjs/common';
import { BotChannel, BotType } from 'shared-types';
import { FactoryService } from './factory.service';

@Controller('bot')
export class FactoryController {
  constructor(private readonly factoryService: FactoryService) {}

  @Post([':type/:id'])
  create(
    @Param('channel') channel: BotChannel,
      @Param('type') type: BotType,
      @Param('id') id: string,
      @Body('token') token: string,
  ): string {
    this.factoryService.createBots([
      {
        id,
        type,
        channel,
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
