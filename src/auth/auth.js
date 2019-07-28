const User = require("../model/User");

async function basicAuth(req, res, next) {
    console.log(req.headers.authorization);
    // make authenticate path public

    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const user = await authenticate({ username, password });

    if (!user) {
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    }

    // attach user to request object
    req.user = user
    
    next();
}



async function authenticate({ username, password }) {
    const user = await User.findOne({username});
    console.log("line35", user);
    console.log(password);
    if (user && user.password === password) {
        console.log("true");
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}




module.exports = {basicAuth, authenticate};



























