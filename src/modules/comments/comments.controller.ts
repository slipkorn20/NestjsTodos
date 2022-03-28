import { Body, Controller, Post, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCommentDto } from 'src/dto/comment-create.dto';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get()
  getAllComments() {
    // Call getAllComments on service and return result
    const result = this.commentsService.getAllComments();
    return {
      status: 'success',
      data: {
        comments: result,
      },
    };
  }

  @Post()
  @UsePipes(ValidationPipe)
  createComment(@Body() data: CreateCommentDto) {
    const result = this.commentsService.createComment(data);
    return {
      status: 'success',
      data: {
        comment: result,
      },
    };
  }
}
