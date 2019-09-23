import './App.css';
import * as React from 'react';
import { observer } from "mobx-react";
import { magnifier } from "../assets";

import { ContactList } from './pages/ContactList';
import { ContactPage } from './pages/ContactPage';
import { IContactController, ContactController } from './controllers/ContactController';

@observer
class App extends React.Component {

	public readonly controller: IContactController = new ContactController();
	
	render() {

		const {
			searchQuery,
			filterContacts
		} = this.controller;

		const filterLabel = filterContacts? "Visa alla": "Filtrera favoriter";

		return (
			<div className="app">
				<div className="app-header">Contacts</div>
					
					<div className="search-label">
						<input
							type="search"
							className="search-input"
							placeholder="Sök"
							value={searchQuery}
							onChange={evt => this.controller.onSearch(evt.target.value)}
						/>
						<img className="magnifier-icon" src={magnifier} width={30} height={30}/>
					</div>

					<div className="filter-input">
							<p onClick={() => this.controller.toggleFilter()}>{filterLabel}</p>
					</div>

					<div className="app-content">

						<ContactList controller={this.controller}/>

						{ this.controller.selectedContact && 
							<ContactPage controller={this.controller}/>
						}
					</div>
			</div>
		);
	}
}

export default App;