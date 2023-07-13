import { IsArray, IsNotEmpty } from 'class-validator';

export class AddAttachmentsDTO {
  @IsNotEmpty()
  @IsArray()
  attachments: string[];
}
