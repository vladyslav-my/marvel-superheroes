import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadInterceptor {
  static imagesInterceptor(fieldName: string, maxCount: number) {
    return FilesInterceptor(fieldName, maxCount, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const filename = `${uniqueSuffix}-${file.originalname}`;
          callback(null, filename);
        },
      }),
    });
  }
}
