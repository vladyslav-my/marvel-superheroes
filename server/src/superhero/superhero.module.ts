import { Module } from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { SuperheroController } from './superhero.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [SuperheroController],
  providers: [SuperheroService, PrismaService],
})
export class SuperheroModule {}
