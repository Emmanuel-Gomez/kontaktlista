import * as React from "react";
import { IContactController } from "../controllers/ContactController"
import { star, starBorder } from "../../assets";
import { observer } from 'mobx-react';

interface IContactPage {
	controller: IContactController;
}

@observer
export class ContactPage extends React.Component<IContactPage> {

	render() {

		const { controller } = this.props;
		const {
			name,
			email,
			favorite
		} = controller.selectedContact;

		const favoritIcon = favorite? star: starBorder;

		return(
			<div className="contact-page">
				<div className="contact-page-first-row">
					<div className="contact-name">{name}</div>
					<div className="star-icon" onClick={evt => {
						evt.stopPropagation();
						this.props.controller.toogleFavorite(controller.selectedContact);
					}}>
						<img src={favoritIcon}/>
					</div>
					<div className="close-button" onClick={() => controller.onCloseContactPage()}>✖️</div>
				</div>
				<div className="contact-page-second-row">{email}</div>
			</div>
		)
	}
}