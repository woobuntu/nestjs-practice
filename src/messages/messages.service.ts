import { MessagesRepository } from './messages.repository';

export class MessagesService {
  constructor(private messagesRepository = new MessagesRepository()) {}
  // 생성자를 위와 같이 작성하면 MessagesService는 MessagesRepository에 종속되는 것
  // 이후 dependency injection으로 교체할 것

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
