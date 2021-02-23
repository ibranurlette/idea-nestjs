import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('idea')
export class IdeaController {
  @Get()
  showAllIdeas() {}

  @Post()
  createIdea() {}

  @Get(':id')
  readIdea() {}

  @Put()
  updateIdea() {}

  @Delete()
  destroyIdea() {}
}
