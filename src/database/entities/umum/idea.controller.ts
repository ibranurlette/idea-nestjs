import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  Logger,
  UseGuards,
} from '@nestjs/common';

import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { AuthGuard } from 'src/shared/auth.guards';
import { User } from '../users/user.decorator';

@Controller('api/ideas')
export class IdeaController {
  private logger = new Logger('IdeaController');

  constructor(private IdeaService: IdeaService) {}

  private logData(options: any) {
    options.user && this.logger.log('USER' + JSON.stringify(options.user));
    options.data && this.logger.log('DATA' + JSON.stringify(options.data));
    options.id && this.logger.log('IDEA' + JSON.stringify(options.id));
  }

  @Get()
  showAllIdeas() {
    return this.IdeaService.showAll();
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createIdea(@User('id') user, @Body() data: IdeaDTO) {
    this.logData({ user, data });
    return this.IdeaService.create(user, data);
  }

  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.IdeaService.read(id);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  updateIdea(
    @User('id') user: string,
    @Param('id') id: string,
    @Body() data: Partial<IdeaDTO>,
  ) {
    this.logData({ user, id, data });
    return this.IdeaService.update(user, id, data);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroyIdea(@User('id') user: string, @Param('id') id: string) {
    return this.IdeaService.destroy(user, id);
  }
}
