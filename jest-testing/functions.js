const functions = {
    add: (a, b)=> {
        return a+b
    },
    createUser: () => {
        const user = { firstName: 'A' }
        user['lastName'] = 'B'
        return user;
    }
};

module.exports =functions