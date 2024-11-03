import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app-with-seeds.module';
import { MarvelSeedService } from './src/seeds/marvel-seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const marvelSeedService = app.get(MarvelSeedService);

  try {
    await marvelSeedService.createMarvelSeeds();
    console.log('Seed data has been successfully inserted.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
