module.exports = {
    title: {
        in: 'body',
        isLength: {
        options: { min: 1 },
        errorMessage: 'Image Title is empty',
        }
    },
    imageUrl: {
        in: 'body',
        isLength: {
        options: { min: 1 },
        errorMessage: 'Image imageUrl is empty',
        }
    }
}