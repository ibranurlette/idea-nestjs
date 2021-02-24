import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { IdeaIntity } from './idea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaIntity])],
  controllers: [IdeaController],
  providers: [IdeaService],
})
export class IdeaModule {}
