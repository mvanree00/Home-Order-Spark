import axios from 'axios';
import jwtDecode from 'jwt-decode'

const httpUser = axios.create();

httpUser.getToken = function() {
    return localStorage.getItem('token');
};

httpUser.setToken = function(token) {
    localStorage.setItem('token', token);
    return token;
};

httpUser.getCurrentUser = function() {
    const token = this.getToken();
    return (token ? jwtDecode(token) : null)
};

httpUser.logIn = async function(credentials) {
    try {
        const response = await axios.post( '/api/users/authenticate', credentials );

        const token = response.data.token;
        if(token) {
            this.defaults.headers.common.token = this.setToken(token);
            return jwtDecode(token);
        } else {
            return false;
        }
    } catch(err) {
        console.log(err);
        return false;
    }
};

httpUser.signUp = async function(userInfo) {
    const response = await axios.post('/api/users', userInfo);

    const token = response.data.token;
    if(token) {
        this.defaults.headers.common.token = this.setToken(token);
        return jwtDecode(token);
    } else {
        console.log(response.data)
        return false;
    }
};
httpUser.addItem = async function(itemInfo) {
    console.log(itemInfo)
    await axios.post('/api/items', itemInfo);
};

httpUser.addCart = async function(itemInfo) {
    await axios.post('/api/carts', itemInfo)
    .then((response) =>{
        if(response.data.success){
            window.location.reload();
        }
    })
};

httpUser.removeCart = async function(itemInfo) {
    await axios.delete('/api/carts', {data: itemInfo})
    .then(() => {
        window.location.reload();
    })
};

httpUser.resetCart = async function(itemInfo) {
    await axios.delete('/api/carts/reset', {data: itemInfo})
    .then(() => {
        window.location.reload();
    })
};

httpUser.addQuantity = async function(id) {
    await axios.patch('/api/carts/add/' + id)
    .then(() => {
        window.location.reload();
    })
}

httpUser.removeQuantity = async function(id) {
    await axios.patch('/api/carts/remove/' + id)
    .then(() => {
        window.location.reload();
    })
}

httpUser.addOrder = async function(orderInfo) {
    await axios.post('/api/orders', orderInfo);
};

httpUser.addJob = async function(jobInfo) {
    await axios.post('/api/jobs', jobInfo);
};

httpUser.addPost = async function(jobInfo) {
    await axios.post('/api/forum', jobInfo);
};

httpUser.logOut = function() {
    localStorage.removeItem('token');
    delete this.defaults.headers.common.token;
    return true;
};

httpUser.defaults.headers.common.token = httpUser.getToken();
export default httpUser;