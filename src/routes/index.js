import express from 'express';
import { indexPage, messagesPage, addMessage } from '../controllers';
import { performAsyncAction } from '../middleware/middleware';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/messages', messagesPage);
indexRouter.post('/messages', addMessage);
indexRouter.post('/messages', performAsyncAction, addMessage);

export default indexRouter;
