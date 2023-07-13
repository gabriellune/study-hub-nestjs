import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';

export class AddAttachmentsDTO {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  attachments: string[];
}
