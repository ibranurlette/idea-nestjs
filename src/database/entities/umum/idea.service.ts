import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { IdeaIntity } from './idea.entity';
import { IdeaDTO, IdeaRO } from './idea.dto';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(IdeaIntity)
    private ideaRepository: Repository<IdeaIntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private toResponseObject(idea: IdeaIntity): IdeaRO {
    return { ...idea, author: idea.author.toResponseObject(false) };
  }

  private ensureOwnership(idea: IdeaIntity, userId: string) {
    if (idea.author.id !== userId) {
      throw new HttpException('incorect user', HttpStatus.UNAUTHORIZED);
    }
  }

  async showAll(): Promise<IdeaRO[]> {
    const ideas = await this.ideaRepository.find({ relations: ['author'] });
    return ideas.map((idea) => this.toResponseObject(idea));
  }

  async create(userId: string, data: IdeaDTO): Promise<IdeaRO> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const idea = await this.ideaRepository.create({ ...data, author: user });
    await this.ideaRepository.save(idea);
    return this.toResponseObject(idea);
  }

  async read(id: string): Promise<IdeaRO> {
    const idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!idea) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.toResponseObject(idea);
  }

  async update(
    userId: string,
    id: string,
    data: Partial<IdeaDTO>,
  ): Promise<IdeaRO> {
    const ideas = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!ideas) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(ideas, userId);
    await this.ideaRepository.update({ id }, data);
    const idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    return this.toResponseObject(idea);
  }

  async destroy(userId: string, id: string) {
    const idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!idea) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(idea, userId);
    await this.ideaRepository.delete({ id });
    return this.toResponseObject(idea);
  }
}
