import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuperheroModule } from './superhero/superhero.module';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    SuperheroModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}