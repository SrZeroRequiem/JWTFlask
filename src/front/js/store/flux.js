const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token:"",
			auth: false
		},
		actions: {
			login: async (dataEmail, dataPassword) => {
				try {
					let response = await fetch('http://localhost:3001/api/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: dataEmail,
							password: dataPassword
						})
					});
					let data = await response.json();
					console.log(data);
					localStorage.setItem("token", data.access_token);
					setStore({ auth: true });
					return true;
				} catch (error) {
					console.log(error);
					return false;
				}
			},

			signup: async (dataEmail, dataPassword) => {
				try {
					let response = await fetch('http://localhost:3001/api/signup', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: dataEmail,
							password: dataPassword
						})
					});
					let data = await response.json();
					console.log(data);
					localStorage.setItem("token", data.access_token);
					return true;
				} catch (error) {
					console.log(error);
					return false;
				}
			},

			getProfile: async () => {
				try {
					let response = await fetch('http://localhost:3001/api/profile', {
						headers: {
							"Authorization": `Bearer ${localStorage.getItem("token")}`
						}
					});
					let data = await response.json();
					console.log(data);
					setStore({ auth: true });
					return true;
				} catch (error) {
					console.log(error);
					setStore({ auth: false });
					return false;
				}
			},

			logout: () => {
				localStorage.removeItem("token");
				return false;
			},

			validToken: async () => {
				try {
					let response = await fetch('http://localhost:3001/api/profile', {
						headers: {
							"Authorization": `Bearer ${localStorage.getItem("token")}`
						}
					});
					let data = await response.json();
					console.log(data);
					return true;
				} catch (error) {
					console.log(error);
					return false;
				}
			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					const response = await fetch("http://localhost:3001/api/hello");
					const data = await response.json();
					setStore({ message: data.message });
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
