const request = require("supertest");
const route = require('../server/routers/users')
const {getErrorObject} = require('../error')
const express = require("express");
const app = express();
app.use(require('../server/middleware/expressFunction'))

app.use("/", route);

describe('[/signup]', ()=>{
    it('[/signup]should be invalid, of 4-min-length password', async ()=>{
        const username =  `username-${new Date().getTime()}`
        const password =  `1234`

        const res = await request(app)
            .post("/signup")
            .send({
                username, password
            })
        const error = JSON.parse(res.error.text)
        expect(res.statusCode).toEqual(400);
        expect(res.status).toEqual(400);
        expect(error.errorCode).toEqual('auth_not_valid');
        expect(error.errorMessage).toEqual(getErrorObject('auth_not_valid'));
        expect(error.errors[0].value).toEqual(password);
        expect(error.errors[0].msg).toEqual('Invalid value');
        expect(error.errors[0].param).toEqual('password');
        expect(error.errors[0].location).toEqual('body');
    })

    it('[/signup]should be invalid, of 3-min-length username', async ()=>{
        const username =  `12`
        const password =  `password-${new Date().getTime()}`

        const res = await request(app)
            .post("/signup")
            .send({
                username, password
            })
        
        const error = JSON.parse(res.error.text)

        expect(res.statusCode).toEqual(400);
        expect(res.status).toEqual(400);
        expect(error.errorCode).toEqual('auth_not_valid');
        expect(error.errorMessage).toEqual(getErrorObject('auth_not_valid'));
        expect(error.errors.length).toEqual(1);
        expect(error.errors[0].value).toEqual(username);
        expect(error.errors[0].msg).toEqual('Invalid value');
        expect(error.errors[0].param).toEqual('username');
        expect(error.errors[0].location).toEqual('body');
    })

    it('[/signup]should be invalid, of both 3-min-length username, 8-min-length password', async ()=>{
        const username =  `12`
        const password =  `1234567`

        const res = await request(app)
            .post("/signup")
            .send({
                username, password
            })
        
        const error = JSON.parse(res.error.text)

        expect(res.statusCode).toEqual(400);
        expect(res.status).toEqual(400);
        expect(error.errorCode).toEqual('auth_not_valid');
        expect(error.errorMessage).toEqual(getErrorObject('auth_not_valid'));
        expect(error.errors.length).toEqual(2);
        expect(error.errors[0].value).toEqual(username);
        expect(error.errors[0].msg).toEqual('Invalid value');
        expect(error.errors[0].param).toEqual('username');
        expect(error.errors[0].location).toEqual('body');
        expect(error.errors[1].value).toEqual(password);
        expect(error.errors[1].msg).toEqual('Invalid value');
        expect(error.errors[1].param).toEqual('password');
        expect(error.errors[1].location).toEqual('body');
    })
})
