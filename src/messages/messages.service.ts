import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Injectable() // DI container로 자동 등록되게 하는 역할을 한다.
export class MessagesService {
  constructor(private messagesRepository: MessagesRepository) {}

  async findOne(id: string) {
    return this.messagesRepository.findOne(id);
  }

  async findAll() {
    return this.messagesRepository.findAll();
  }

  async create(content: string) {
    this.messagesRepository.create(content);
  }
}
