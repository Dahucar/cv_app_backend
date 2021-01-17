const { response, request } = require("express");
const bcrypt = require('bcryptjs');
const UserModel = require("../models/User.model");
const PlanModel = require("../models/Plan.model");
const { jwtGenerate } = require("../helpers/jwtGenerate");
const msgErrorRequest = 'Internal server error with your request!';

const addUser = async (req = request, res = response) => {
    try {
        //  TODO: verify email and nick with toLowerCase() params.
        const { nick, email, password } = req.body;
        let user = await UserModel.find({
            $or: [
              { 'nick': nick },
              { 'email': email }
            ]
        }).exec();
        if ( user.length != 0 ) {
            return res.status(400).json({
                ok: false,
                errors : {
                    emailNick: {
                        msg: 'Remenber. Your email or nick must be unique!',
                        param: 'nick and email'
                    }
                }
            });
        }
        user = new UserModel( req.body );
        // created a password encrypted
        const increments = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, increments );
        // created a new plan for user
        const planData = { type: 'FREE', initDate: new Date().getTime() }
        const userplan = new PlanModel( planData );
        await userplan.save();
        user.plan = userplan;
        await user.save();
        // created a new token with JWT
        const dataPlan = {
            id: user.plan.id,
            type: user.plan.type,
            initDate: user.plan.initDate,
            expiredDate: user.plan.expiredDate && null
        }
        const token = await jwtGenerate( user.id, user.nick, dataPlan );
        // return resonse for user request.
        return res.status(201).json({
            ok: true,
            msg: 'Your account is created successfully!',
            token,
            user: {
                uid: user._id,
                name: user.nick
            }
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest
        });
    }    
}

const login = async (req = request, res = response) => {
    try {
        // find user by email request
        const { email, password } = req.body;
        let user = await UserModel.findOne({ email }).populate('plan');
        if ( !user )
            return res.status(400).json({
                ok: false,
                errors : {
                    email: {
                        msg: 'Your email is not avaible!',
                        param: 'email'
                    }
                }
            });
        // veriy matched of user password
        const match = bcrypt.compareSync(password, user.password);
        if( !match ) 
            return res.status(400).json({
                ok: false,
                errors : {
                    email: {
                        msg: 'Your password is not valid!',
                        param: 'password'
                    }
                }
            });
        // created a new token with JWT
        const dataPlan = {
            id: user.plan.id,
            initDate: user.plan.initDate,
            type: user.plan.type,
            expiredDate: user.plan.expiredDate && null
        }
        const token = await jwtGenerate( user.id, user.nick, dataPlan );
        return res.status(200).json({
            ok: true,
            msg: 'Welcome back '+user.nick,
            user : {
                uid: user._id,
                name: user.nick,
            },
            token
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest
        });
    }    
}

const renewToken = async (req = request, res = response) => {
    try {
        // capture request params user.id, user.name
        const { uid, name } = req;
        const token = await jwtGenerate( uid, name );
        // create response with new token
        return res.status(200).json({
            ok: true,
            user: {
                uid,
                name
            },
            token
        });     
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest
        });
    }    
}

const editUser = async (req = request, res = response) => {
    try {
        // require x-token of header
        const { uid } = req;
        const paramsUpdate = {
            nick: req.body.nick,
            name: req.body.name,
            surname: req.body.surname,
        }
        await UserModel.findByIdAndUpdate(uid, paramsUpdate, { new: true });
        return res.status(200).json({
            ok: true,
            msg: 'Your data is saved successfully!'
        });
    } catch (error) {
        console.error( error );
        return res.status(500).json({
            ok: false,
            msg: msgErrorRequest
        });
    }    
}

module.exports = {
    addUser,
    editUser,
    login,
    renewToken
}