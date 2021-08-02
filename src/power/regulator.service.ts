import { PowerService } from './power.service';

export class RegulatorSerivce {
  constructor(private powerService: PowerService) {}

  regulatePower() {
    console.log('뭐 어떡하라고...');
  }
}
