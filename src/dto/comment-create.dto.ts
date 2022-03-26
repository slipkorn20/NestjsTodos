import { IsEnum, IsNumber, IsString } from "class-validator";
import { CommentEmotion } from "src/enums/comment-emotion.enum";

export class CreateCommentDto {
  @IsString()
  text: string;
  @IsString()
  author: string;
  @IsNumber()
  rating: number;
  @IsEnum(CommentEmotion)
  emotion:CommentEmotion
}
