import * as winston from 'winston';
import { Provider } from '@nestjs/common';
import { initWinston } from 'src/utils/winston.utils';

export const winstonProvider: Provider = {
    provide:"winston",
    useValue: initWinston()
  };