import * as React from "react";
import { observer } from "mobx-react";
import { createViewModel, IViewModel } from "mobx-utils";

import { IContactController } from "../controllers/ContactController"
import { star, starBorder, closeIcon } from "../../assets";
import { observable } from 'mobx';
import { ContactModel } from 'src/models/ContactModel';

interface IContactPage {
	controller: IContactController;
}

@observer
export class ContactPage extends React.Component<IContactPage> {

	@observable public viewModel: ContactModel & IViewModel<ContactModel>;

	constructor(props:IContactPage) {
		super(props);

		this.viewModel = createViewModel(this.props.controller.selectedContact);
	}

	public onChangeViewModel(key: string, value: any) {
		this.viewModel[key] = value;
	}

	render() {

		const { controller } = this.props;
		const {
			name,
			email,
			favorite
		} = this.viewModel;


		const favoritIcon = favorite? star: starBorder;

		return(
			<div className="contact-page">
				<div className="contact-page-row">

					<div className="star-contact-page" onClick={evt => {
						evt.stopPropagation();
						this.onChangeViewModel("favorite", !favorite);
					}}>
						<img src={favoritIcon}/>
					</div>

					<div className="close-button" onClick={() => controller.onCloseContactPage()}>
						<img src={closeIcon}/>
					</div>

				</div>

				<div className="contact-page-row">
					Name:
					<input
						type="text"
						className="contact-name-input"
						value={name}
						onChange={ evt => this.onChangeViewModel("name", evt.target.value) }
					/>
				</div>


				<div className="contact-page-row">
					Email:
					<input
						type="text"
						className="contact-name-input"
						value={email}
						onChange={ evt => this.onChangeViewModel("email", evt.target.value) }
					/>
				</div>
				
				{this.viewModel.isDirty &&
					<div className="contact-page-row contact-save">
						<p onClick={() => this.viewModel.reset()}>
							Reset
						</p>
						<p onClick={() => this.viewModel.submit()}>
							Spara
						</p>
					</div>
				}
			</div>
		)
	}
}