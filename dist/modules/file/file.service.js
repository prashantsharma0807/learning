"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const util_1 = require("util");
const unlinkAsync = (0, util_1.promisify)(fs_1.unlink);
let FileService = class FileService {
    constructor() {
        this.uploadPath = './uploads';
    }
    async uploadFile(file) {
        if (file) {
            return `/uploads/${file.filename}`;
        }
    }
    async updateFile(newFile, oldFilePath) {
        if (oldFilePath) {
            await this.deleteFile(oldFilePath);
        }
        return this.uploadFile(newFile);
    }
    async deleteFile(filePath) {
        try {
            if (filePath) {
                const fullPath = `${this.uploadPath}/${filePath.split('/').pop()}`;
                await unlinkAsync(fullPath);
                console.log(`File ${filePath} deleted successfully.`);
            }
        }
        catch (error) {
            console.error(`Error deleting file ${filePath}:`, error.message);
        }
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
//# sourceMappingURL=file.service.js.map