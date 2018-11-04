import { Player } from './player';

export class Message {
	constructor(private from: Player, private content: string) {}
}
