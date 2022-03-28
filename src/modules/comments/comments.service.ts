import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from 'src/dto/comment-create.dto';
import { Comment } from '../../interface/comments.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommentsService {
  private database: Comment[] = [];

  getAllComments() {
    return [...this.database];
  }
  createComment(newCommentData: CreateCommentDto): Comment {
    const newComment: Comment = {
      ...newCommentData,
      date: new Date(),
      id: uuidv4(),
    };
    this.database.push(newComment)
    return newComment;
  }
}
