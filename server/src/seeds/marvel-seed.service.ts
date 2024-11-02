// src/seeds/marvel-seed.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import axios from 'axios';
import * as crypto from 'crypto';

function generateMarvelAuthParams() {
  const ts = Date.now().toString();
  const hash = crypto
    .createHash('md5')
    .update(ts + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_PUBLIC_KEY)
    .digest('hex');

  return { ts, hash };
}

@Injectable()
export class MarvelSeedService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.createMarvelSeeds();
  }

  async createMarvelSeeds() {
    try {
      const { hash, ts } = generateMarvelAuthParams();
      const { data } = await axios.get(
        'https://gateway.marvel.com:443/v1/public/characters',
        {
          params: {
            limit: 40,
            apikey: process.env.MARVEL_PUBLIC_KEY,
            hash,
            ts,
          },
        },
      );

      const characters = data.data.results.map((character) => ({
        nickname: character.name,
        //   origin_description: character.description,
        images: [
          `${character.thumbnail.path}.${character.thumbnail.extension}`,
        ],
      }));

      for (const character of characters) {
        await this.prisma.superhero.create({ data: character });
      }

      console.log('Marvel seed data inserted successfully');
    } catch (error) {
      console.error('Failed to seed Marvel data:', error);
    }
  }
}
