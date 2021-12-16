import Cookie from "js-cookie";
const rootPath = 'https://api.realworld.io/api/'

export const SignUp = async (login, name, email, password) => {
    const requestBody = {
        user: {
            username: login,
            bio: name,
            email: email,
            password: password
        }
    };
    return fetch(rootPath + `users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });
}

export const SignIn = async (email, password) => {
    const requestBody = {
        user: {
            email: email,
            password: password
        }
    };
    return fetch(rootPath + `users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });
}

export const Auth = async () => {
    return fetch(rootPath + `user`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${Cookie.get('token')}`
        }
    })
}