import {
	action,
	observable,
	computed 
} from "mobx";

import * as contacts from "../../contacts.json";
import { ContactModel } from "../models/ContactModel";

export interface IContactController {
	contacts: ContactModel[];
	searchQuery: string;
	filterContacts: boolean;
	selectedContact: ContactModel;

	toggleFilter: () => void;
	onCloseContactPage: () => void;
	onSearch: (searchQuery: string) => void;
	toogleFavorite: (contact: ContactModel) => void;
	onSelectContact: (contact: ContactModel) => void;
}

export class ContactController implements IContactController {

	@observable public data: ContactModel[] = [];
	@observable public searchQuery: string = "";
	@observable public filterContacts: boolean = false;
	@observable public selectedContact: ContactModel;

	constructor() {
		this.loadContacts();
	}

	@computed get contacts(): ContactModel[] {

		const contacts =  this.data.filter( contact => {
			const name = contact.name.toLowerCase().trim();
			const email = contact.email.toLowerCase().trim();
			const query = this.searchQuery.toLowerCase().trim();
			
			return (name.includes(query) || email.includes(query));
		})

		if(this.filterContacts) {
			return contacts.filter(c => c.favorite);
		}

		return contacts;
	}

	@action
	private loadContacts(): void {
		this.data = contacts.map(contact => new ContactModel(contact));
	}

	@action
	public toggleFilter(): void {
		this.filterContacts = !this.filterContacts;
	}

	@action
	public onSearch(searchQuery: string): void {
		this.searchQuery = searchQuery;
	}

	@action
	public toogleFavorite(contact: ContactModel): void {
		const clickedContact  = this.data.find(c => c === contact);
		clickedContact.favorite = !clickedContact.favorite;
	}

	@action
	public onSelectContact(contact: ContactModel): void {
		this.selectedContact = this.data.find(c => c === contact);
	}

	@action
	public onCloseContactPage(): void {
		this.selectedContact = null;
	}
}