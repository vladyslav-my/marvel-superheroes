// superhero/superhero.controller.ts
import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Query,
  Get,
  Req,
  UploadedFiles,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { FileUploadInterceptor } from 'src/interceptors/file.interceptor';
import { Request } from 'express';

@Controller('superhero')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.superheroService.findAll(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superheroService.findOne(+id);
  }

  @Post()
  @UseInterceptors(FileUploadInterceptor.imagesInterceptor('images', 10))
  create(
    @Body() createSuperheroDto: CreateSuperheroDto,
    @UploadedFiles() images: Express.Multer.File[],
    @Req() request: Request,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}`;
    const filePaths =
      images?.map((file) => `${baseUrl}/uploads/${file.filename}`) || [];

    return this.superheroService.create({
      ...createSuperheroDto,
      images: filePaths,
    });
  }

  @Patch(':id')
  @UseInterceptors(FileUploadInterceptor.imagesInterceptor('images', 10))
  update(
    @Param('id') id: string,
    @Body() updateSuperheroDto: UpdateSuperheroDto,
    @UploadedFiles() images: Express.Multer.File[],
    @Req() request: Request,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}`;
    const filePaths = images?.map(
      (file) => `${baseUrl}/uploads/${file.filename}`,
    );

    return this.superheroService.update(+id, {
      ...updateSuperheroDto,
      images: filePaths,
    });
  }

  @Patch(':id/images')
  @UseInterceptors(FileUploadInterceptor.imagesInterceptor('images', 10))
  addImages(
    @Param('id') id: string,
    @UploadedFiles() images: Express.Multer.File[],
    @Req() request: Request,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}`;
    const filePaths = images.map(
      (file) => `${baseUrl}/uploads/${file.filename}`,
    );

    return this.superheroService.addImages(+id, filePaths);
  }

  @Delete(':id/images')
  deleteImages(@Param('id') id: string, @Body('imageIds') imageIds: number[]) {
    return this.superheroService.deleteImages(+id, imageIds);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.superheroService.remove(+id);
  }
}
