	contacts = [
		{
			"name": "Roselyn Hahn",
			"email": "roselyn.hahn@example.com"
		},
		{
			"name": "Javon Gleichner",
			"email": "javon.gleichner@example.com"
		},
		{
			"name": "Madonna Metz",
			"email": "madonna.metz@example.com"
		},
		{
			"name": "Jeffrey Ryan",
			"email": "jeffrey.ryan@example.com"
		},
		{
			"name": "Nat Stiedemann",
			"email": "nat.stiedemann@example.com"
		},
		{
			"name": "Nicklaus Stokes",
			"email": "nicklaus.stokes@example.com"
		},
		{
			"name": "Morris Bechtelar",
			"email": "morris.bechtelar@example.com"
		},
		{
			"name": "Michale Hammes",
			"email": "michale.hammes@example.com"
		},
		{
			"name": "Keyon Herzog",
			"email": "keyon.herzog@example.com"
		},
		{
			"name": "Brody Schaefer",
			"email": "brody.schaefer@example.com"
		},
		{
			"name": "Stacey Kozey",
			"email": "stacey.kozey@example.com"
		}
	];

	window.onload = function () {

		function render() {

			document.getElementById("contact-list").innerHTML = "";

			for (var i = 0; i < contacts.length; i++) {

				var contactItem = document.createElement("div");
				contactItem.innerHTML = contacts[i].name;
				contactItem.className = 'contactName';
				contactItem.id = i;

				contactItem.onclick = event => {

					var contactId = parseInt(event.currentTarget.id);
					var contactDetails = document.getElementById('contactDetails');
					var favouriteClass = contacts[parseInt(event.currentTarget.id)].favourite ? "favourite" : "";

					contactDetails.innerHTML =
						"<span id='close-details'>x</span>" +
						"<span id='favourite' class='" + favouriteClass + "'>*</span>" +
						"<div>" + contacts[parseInt(event.currentTarget.id)].name + "</div>" +
						"<div>" + contacts[parseInt(event.currentTarget.id)].email + "</div>";
						contactDetails.setAttribute("class", "");

					document.getElementById('favourite').onclick = function (e) {
						contacts[contactId].favourite = !contacts[contactId].favourite;

						if (e.currentTarget.getAttribute("class") == "favourite") {
							e.currentTarget.setAttribute("class", "");
						}
						else {
							e.currentTarget.setAttribute("class", "favourite");
						}
					}

					document.getElementById('close-details').onclick = function () {
						contactDetails.innerHTML = "";
						contactDetails.setAttribute("class", "hidden");
					}

				};

				document.getElementById("contact-list").appendChild(contactItem);
			}

			document.getElementById('contactFilter').onclick = function (e) {

				var contactNames = document.querySelectorAll('.contactName');

				if (e.currentTarget.innerText === "Visa alla") {

					e.currentTarget.innerText = "Filtrera favoriter"
					contactNames.forEach(function (node, i) {
					node.setAttribute("class", "contactName");
					})

				}
				else {

					e.currentTarget.innerText = "Visa alla";

					contactNames.forEach(function (node, i) {
					if (contacts[i].favourite) {
						node.setAttribute("class", "contactName");
					} else {
						node.setAttribute("class", "hidden contactName");
					}
					})

				}
			};

			document.getElementById('search-button').onclick = function () {

				var contactNames = document.querySelectorAll('.contactName');

				contactNames.forEach(function (node) {

					var regexp = new RegExp(document.getElementById('search').value.toLowerCase());

					if (regexp.test(node.innerText.toLowerCase())) {

						node.setAttribute("class", "contactName");

					}
					else {
						node.setAttribute("class", "hidden contactName");
					}
				});
			}
		}

		render();
	};
