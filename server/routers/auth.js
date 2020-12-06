const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const {getGoogleAccountFromCode} = require('../services/google-utils');
const getFacebookUserData = require('../services/facebook-utils');
const router = express.Router();

router.post('/api/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        if(!email || !password) {
            return res.status(400).send({error: 'Login failed, please fill your password and your email'})
        }
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Maybe wrong password or email'})
        } else {
            const token = await user.generateAuthToken()
            res.send({ user, token })
        }
    } 
    catch(error) {
        res.status(400).send(error)
    }
})
router.post('/api/loginGoogle', async(req, res) => {
    if (req.body.code) {
        const {email, password, name} = await getGoogleAccountFromCode(req.body.code);
        try {
            const find = await User.findOne({email});
            if(find) {
                const token = await find.generateAuthToken();
                res.status(201).send({ user:find, token })
            } else {
                const user = new User({email, password, name});
                await user.save()
                const token = await user.generateAuthToken();
                res.send({ user, token });
            }
        } 
        catch (error) {
            res.status(400).send(error)
        }
    }
})
router.post('/api/loginFacebook', async(req, res) => {
    if (req.body.code) { 
        const {email, password, name} = await getFacebookUserData(req.body.code);
        try {
            const find = await User.findOne({email});
            if(find) {
                const token = await find.generateAuthToken();
                res.status(201).send({ user: find, token })
            } else {
                const user = new User({email, password, name});
                await user.save()
                const token = await user.generateAuthToken();
                res.send({ user, token });
            }
        } 
        catch (error) {
            res.status(400).send(error)
        }
    }
})
router.post('/api/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } 
    catch (error) {
        res.status(500).send(error)
    }
})
router.post('/api/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } 
    catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router
