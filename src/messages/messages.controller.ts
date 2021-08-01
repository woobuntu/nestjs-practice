import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  messagesService: MessagesService;

  constructor() {
    this.messagesService = new MessagesService();
  }
  // constructor(private messagesService = new MessagesService()) {}
  // 이후 dependency injection으로 교체할 것

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    const { content } = body;
    this.messagesService.create(content);
  }

  @Get(':id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);
    if (!message)
      throw new NotFoundException('해당 id의 message가 존재하지 않습니다.');
    return message;
  }
}
