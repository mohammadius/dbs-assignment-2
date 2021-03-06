import type { Gender } from "models";

export class User {
	constructor(
		public firstName: string,
		public lastName: string,
		public email: string,
		public birthDate: string,
		public address: string,
		public phoneNumber: string,
		public gender: Gender,
		public id?: string
	) {}
}
