const ImageController = require('../server/routers/images/controller')
const UserController = require('../server/routers/users/controller')

describe('[ImageController] ', ()=>{
    it('[ImageController] should have basic function', async ()=>{
        const TranCon = new ImageController()
        expect(typeof TranCon.findById).toEqual('function')
        expect(typeof TranCon.create).toEqual('function')
        expect(typeof TranCon.list).toEqual('function')
        expect(typeof TranCon.init).toEqual('function')
    })

    it('[ImageController] should have findById()', async ()=>{
        const TranCon = new ImageController()
        const title = `title-${new Date().getTime()}`
        await TranCon.init({isPurge: true})

        const username = `username-${new Date().getTime()}`
        const password = `password-${new Date().getTime()}`
        const imageUrl = `https://${new Date().getTime()}.com`
        const description = `description-${new Date().getTime()}`
        const UserCon = new UserController()
        const createdItemUser = await UserCon.create({username, password})
        const userId = createdItemUser.id

        const createdItem = await TranCon.create({title, userId , imageUrl, description})
        const foundItem = await TranCon.findById(createdItem.id)
        expect(createdItem.id).toEqual(foundItem.id);
        expect(createdItem.title).toEqual(foundItem.title);
        expect(createdItem.userId).toEqual(userId);
        expect(createdItem.imageUrl).toEqual(imageUrl);
        expect(createdItem.description).toEqual(description);
    })

    it('[ImageController] should have list()', async ()=>{
        const TranCon = new ImageController()
        await TranCon.init({isPurge: true})
        const foundItemList = await TranCon.list()

        expect(Array.isArray(foundItemList)).toEqual(true);

        for(let i =0 ; i<foundItemList.length; i++) {
            expect(typeof foundItemList[i].id).toEqual('string');
            expect(typeof foundItemList[i].title).toEqual('string');
            expect(typeof foundItemList[i].description).toEqual('string');
            expect(typeof foundItemList[i].imageUrl).toEqual('string');
            expect(typeof foundItemList[i].userId).toEqual('string');
        }
    })
})