const {Blog} = require('../models/blog')



const addNewField = async() => {
    await Blog.find().updateMany({}, {
        $set: { category : 'blog'}
    }).catch(err => {
        console.log(err)
    })

    console.log('Finish')
}

addNewField()