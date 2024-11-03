// superhero/superhero.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';

@Injectable()
export class SuperheroService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSuperheroDto, images: string[]) {
    return this.prisma.superhero.create({
      data: {
        ...data,
        images: {
          create: images.map((url) => ({ url })),
        },
      },
      include: { images: true },
    });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const totalCount = await this.prisma.superhero.count();
    const superheroes = await this.prisma.superhero.findMany({
      skip,
      take: limit,
      include: { images: true },
    });

    const superheroesData = superheroes.map((superhero) => ({
      id: superhero.id,
      nickname: superhero.nickname,
      origin_description: superhero.origin_description,
      images: superhero.images.map((image) => ({
        id: image.id,
        url: image.url,
      })),
    }));

    return {
      data: superheroesData,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  async findOne(id: number) {
    const superhero = await this.prisma.superhero.findUnique({
      where: { id },
      include: { images: true },
    });

    return {
      id: superhero.id,
      nickname: superhero.nickname,
      real_name: superhero.real_name,
      origin_description: superhero.origin_description,
      catch_phrase: superhero.catch_phrase,
      superpowers: superhero.superpowers,
      images: superhero.images.map((image) => ({
        id: image.id,
        url: image.url,
      })),
    };
  }

  async update(id: number, data: UpdateSuperheroDto, images: string[]) {
    return this.prisma.superhero.update({
      where: { id },
      data: {
        ...data,
        images: {
          create: images.map((url) => ({ url })),
        },
      },
      include: { images: true },
    });
  }

  async remove(id: number) {
    return this.prisma.superhero.delete({ where: { id } });
  }

  async addImages(id: number, imageUrls: string[]) {
    return this.prisma.superhero.update({
      where: { id },
      data: {
        images: {
          create: imageUrls.map((url) => ({ url })),
        },
      },
      include: { images: true },
    });
  }

  async deleteImages(superheroId: number, imageIds: number[]) {
    await this.prisma.image.deleteMany({
      where: {
        id: { in: imageIds },
        superheroId,
      },
    });
    return { message: 'Images deleted successfully' };
  }
}
