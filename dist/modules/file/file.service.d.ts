export declare class FileService {
    private readonly uploadPath;
    uploadFile(file: Express.Multer.File): Promise<string>;
    updateFile(newFile: Express.Multer.File, oldFilePath: string | null): Promise<string>;
    deleteFile(filePath: string): Promise<void>;
}
