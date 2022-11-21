//@Access  = private
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const { getUserName, getPassword, saveUser } = require('../Services/HomeServices/users.service')

async function RegisterController(req, res) {
    //Valid
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: "Missing Username/Password" });
    }
    try {
        let userName = await getUserName({ username: username })
        //Not found username
        if (userName) {
            return res
                .status(400)
                .json({ success: false, message: "Username/password already exist" });
        }
        //All good
        const hashedPassword = await argon2.hash(password);
        const newUser = saveUser({ username, hashedPassword })
        //Token pay pack
        const accessToken = jwt.sign(
            {
                userId: newUser._id,
            },
            process.env.accessToken
        );
        res.json({
            accessToken,
            success: true,
            message: "Created successfully",
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

//Login
//@Access  = private
async function LoginController(req, res) {
    const { username, password } = req.body;
    try {
        //Valid
        if (!username || !password) {
            return res
                .status(400)
                .json({ success: false, message: "Missing username/password" });
        }
        //Checked user exist
        const user = await getUserName({ username: username })
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "Not found username/password" });
        }
        //Checked password
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            return res
                .status(400)
                .json({ success: false, message: "Incorrect username/password" });
        }
        //Given token for user
        const accessToken = jwt.sign(
            {
                userId: user._id,
            },
            process.env.accessToken
        );
        //All done
        res.json({ success: true, message: "Login successfully", accessToken });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
//Checking Login exist
//@Access  = private
async function LoginIn(req, res) {
    const user = await getPassword({ userId: req.userId })
    try {
        if (!user) {
            res.status(400).json({ success: false, message: 'User not found' })
        }
        res.json({ success: true, message: 'Login in', user })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Interval server error' })
        console.log(error)
    }
}

module.exports = {
    RegisterController,
    LoginController,
    LoginIn
};