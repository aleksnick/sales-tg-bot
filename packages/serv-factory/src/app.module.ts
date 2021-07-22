import { Module } from '@nestjs/common';
import { FactoryModule } from 'src/modules/Factory/Factory.module';

@Module({
  imports: [FactoryModule],
})
export class AppModule {}
