import { Injectable, BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { unlink } from 'fs';
import { promisify } from 'util';
import { extname } from 'path';

const unlinkAsync = promisify(unlink);

@Injectable()
export class FileService {
  private readonly uploadPath = './uploads'; // Directory for uploaded files

  // Function to upload a file
  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (file) {
      //throw new BadRequestException('No file provided for upload.');
    return `/uploads/${file.filename}`;
    } // Returning the public file path
  }

  // Function to update a file
  async updateFile(
    newFile: Express.Multer.File,
    oldFilePath: string | null,
  ): Promise<string> {
    if (oldFilePath) {
      await this.deleteFile(oldFilePath);
    }
    return this.uploadFile(newFile);
  }

  // Function to delete a file
  async deleteFile(filePath: string): Promise<void> {
    try {
      if (filePath) {
        const fullPath = `${this.uploadPath}/${filePath.split('/').pop()}`;
        await unlinkAsync(fullPath);
        console.log(`File ${filePath} deleted successfully.`);
      }
    } catch (error) {
      console.error(`Error deleting file ${filePath}:`, error.message);
    }
  }
}

