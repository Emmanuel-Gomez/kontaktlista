import { observable, action } from "mobx";

export interface IContact {
	name: string;
	email: string;
}

export class ContactModel implements IContact {

	@observable name: string;
	@observable email: string;
	@observable favorite: boolean;

	constructor(contact?: IContact) {
		this.fromJson(contact);
	}

	@action
	public fromJson(contact?: IContact) {
		if(contact){
			this.name = contact.name;
			this.email = contact.email;
		}
		else {
			this.email = "";
			this.email = "";
		}

		this.favorite = false;
	}
}