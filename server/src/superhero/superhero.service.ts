// superhero/superhero.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class SuperheroService {
  constructor(private prisma: PrismaService) {}

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async create(data: CreateSuperheroDto, images: string[]) {
    //! hardcore
    await this.delay(1200);

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
    //! hardcore
    await this.delay(1200);

    const skip = (page - 1) * limit;
    const totalCount = await this.prisma.superhero.count();
    const superheroes = await this.prisma.superhero.findMany({
      skip,
      take: limit,
      include: { images: true },
      orderBy: {
        createdAt: 'desc',
      },
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
    //! hardcore
    await this.delay(1200);

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
    //! hardcore
    await this.delay(1200);

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
    //! hardcore
    await this.delay(1200);

    const superhero = await this.prisma.superhero.findUnique({
      where: {
        id,
      },
      include: { images: true },
    });

    superhero.images.forEach((image) => {
      const filePath = path.join(
        process.cwd(),
        'uploads',
        path.basename(image.url),
      );
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete file: ${filePath}`, err);
        } else {
          console.log(`Deleted file: ${filePath}`);
        }
      });
    });

    return this.prisma.superhero.delete({ where: { id } });
  }

  async addImages(id: number, imageUrls: string[]) {
    //! hardcore
    await this.delay(1200);

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
    //! hardcore
    await this.delay(1200);

    const imagesToDelete = await this.prisma.image.findMany({
      where: {
        id: { in: imageIds },
        superheroId,
      },
      select: {
        url: true,
      },
    });

    await this.prisma.image.deleteMany({
      where: {
        id: { in: imageIds },
        superheroId,
      },
    });

    imagesToDelete.forEach((image) => {
      const filePath = path.join(
        process.cwd(),
        'uploads',
        path.basename(image.url),
      );
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete file: ${filePath}`, err);
        } else {
          console.log(`Deleted file: ${filePath}`);
        }
      });
    });

    return { message: 'Images deleted successfully' };
  }
}
