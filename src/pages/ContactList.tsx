import * as React from "react";
import { observer } from 'mobx-react';
import { star, starBorder } from "../../assets";
import { ContactModel } from "../models/ContactModel";
import { IContactController } from "../controllers/ContactController";

interface IContactList {
	controller: IContactController
}

@observer
export class ContactList extends React.Component<IContactList> {

	public contactList: ContactModel[];

	constructor(props: IContactList) {
		super(props);
	}

	public contact(key: number, contact: ContactModel): React.ReactNode {

		const favoritIcon = contact.favorite? star: starBorder;

		return(
			<div
				key={key}
				className="list-item"
				onClick={() => this.props.controller.onSelectContact(contact)}>

				{contact.name}

				<div className="star-icon" onClick={evt => {
					evt.stopPropagation();
					this.props.controller.toogleFavorite(contact);
				}}>
					<img src={favoritIcon}/>
				</div>
			</div>
		)
	}
	
	render() {

		const { contacts } = this.props.controller;

		if(contacts.length < 1) {

			return <p> No contacts available </p>
		}

		return(
			<div className="contact-list">
				{contacts.map((contact, index) => {
					return this.contact(index, contact);
				})}
			</div>
		);
	}
}