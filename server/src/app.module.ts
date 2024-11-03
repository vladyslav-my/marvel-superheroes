import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuperheroModule } from './superhero/superhero.module';
import { PrismaModule } from 'nestjs-prisma';
import { MarvelSeedService } from './seeds/marvel-seed.service';

@Module({
  imports: [
    SuperheroModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MarvelSeedService],
})
export class AppModule {}
