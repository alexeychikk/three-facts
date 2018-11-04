import { Message, Player } from './';

export class ChatMessage extends Message {
	constructor(from: Player, content: string) {
		super(from, content);
	}
}
