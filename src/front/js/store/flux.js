const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: {
				email: null
			},
			auth: false
		},
		actions: {
			login: async (dataEmail, dataPassword) => {
				const actions = getActions();
				try {
					const response = await fetch('http://localhost:3001/api/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: dataEmail,
							password: dataPassword
						})
					});
					const data = await response.json();
					console.log("Login"+data);
					localStorage.setItem("token", data.access_token);
					const validate = await actions.validateLogin();
					return validate;
				} catch (error) {
					console.log(error);
					return false;
				}
			},

			signup: async (dataEmail, dataPassword) => {
				try {
					const response = await fetch('http://localhost:3001/api/signup', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: dataEmail,
							password: dataPassword
						})
					});
					const data = await response.json();
					console.log(data);
					localStorage.setItem("token", data.access_token);
					return true;
				} catch (error) {
					console.log(error);
					return false;
				}
			},

			validateLogin: async () => {
				try {
					const response = await fetch('http://localhost:3001/api/validate', {
						headers: {
							"Authorization": `Bearer ${localStorage.getItem("token")}`
						}
					});
					const data = await response.json();
					if (response.status >= 400 && response.status < 500) {
						throw new Error(data.msg);
					}
					setStore({ auth: true });
					return true;
				} catch (error) {
					console.log(error);
					setStore({ auth: false });
					return false;
				}
			},

			getProfile: async () => {
				const store = getStore();
				try {
					const response = await fetch('http://localhost:3001/api/profile', {
						headers: {
							"Authorization": `Bearer ${localStorage.getItem("token")}`
						}
					});
					const data = await response.json();
					setStore({ user: data });
					return null;
				} catch (error) {
					console.log(error);
					return null;
				}
			},

			logout: () => {
				localStorage.removeItem("token");
				return false;
			},

			validToken: async () => {
				try {
					const response = await fetch('http://localhost:3001/api/profile', {
						headers: {
							"Authorization": `Bearer ${localStorage.getItem("token")}`
						}
					});
					const data = await response.json();
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
