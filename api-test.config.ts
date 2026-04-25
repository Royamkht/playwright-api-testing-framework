const processENV = process.env.Test_ENV
const env = processENV || 'prod'
console.log('Test enviroment is:' +env)

const config = {
    apiUrl: 'https://conduit-api.bondaracademy.com/api/',
    userEmail: 'royamokhtari8066@gmail.com',
    userPasssword: '8066'
}

if(env==='qa'){
    config.apiUrl ='https://conduit-api.bondaracademy.com/api/',
    config.userEmail='royamokhtari8066@gmail.com22222',
   config.userPasssword='8066????'

}

export { config }