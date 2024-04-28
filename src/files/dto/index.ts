import { IsFile, MemoryStoredFile } from "nestjs-form-data";

export class ImageDto {
    @IsFile()
    image: MemoryStoredFile
}