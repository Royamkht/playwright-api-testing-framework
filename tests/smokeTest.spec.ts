import { expect } from '@playwright/test';
import { test } from '../utils/fixtures';
import { creatToken } from '../helpers/creatToken';

;

let authToken: string
test.beforeAll('Get token', async ({ api, config }) => {
    // const tokenResponse = await api
    //     .path('users/login')
    //     .body({ user: { email: config.userEmail, password: config.userPasssword } })
    //     .postRequest(200)
    authToken = await creatToken(api,config.userEmail,config.userPasssword)});


test('Get Articles', async ({ api }) => {

    const response = await api
        .path('/articles')
        .params({ limit: 10, offset: 0 })
        .getRequest(200)
    expect(response.articles.length).toBeLessThanOrEqual(10);
    expect(response.articlesCount).toEqual(10)

})
test('Get test tags', async ({ api }) => {

    const response = await api
        .path('/tags')
        .getRequest(200)
    expect(response.tags[0]).toEqual('Test')
    expect(response.tags.length).toBeLessThanOrEqual(10)
})

test('Create and delete article', async ({ api }) => {
    const creatArticleResponse = await api
        .path('/articles')
        .headers({ Authorization: authToken })
        .body({
            article: { title: "new roya", description: "mokhtari", body: "test", tagList: [] }
        })
        .postRequest(201)
    expect(creatArticleResponse.article.title).toEqual("new roya111")
    const slugID = creatArticleResponse.article.slug

    const getArticleResponse = await api
        .path('/articles')
        .params({ limit: 10, offset: 0 })
        .headers({ Authorization: authToken })
        .getRequest(200)
    expect(getArticleResponse.articles[0].title).toEqual('new roya')

    await api
        .path(`/articles/${slugID}`)
        .headers({ Authorization: authToken })
        .deleteRequest(204)

    const getArticleResponseTow = await api
        .path('/articles')
        .params({ limit: 10, offset: 0 })
        .headers({ Authorization: authToken })
        .getRequest(200)
    expect(getArticleResponseTow.articles[0].title).not.toEqual('new roya')
})



test('Create,Update and delete article', async ({ api }) => {
    const creatArticleResponse = await api
        .path('/articles')
        .headers({ Authorization: authToken })
        .body({ article: { title: "new roya2", description: "mokhtari", body: "test", tagList: [] } })
        .postRequest(201)
    expect(creatArticleResponse.article.title).toEqual("new roya2")
    const slugID = creatArticleResponse.article.slug



    const updatArticle = await api
        .path(`/articles/${slugID}`)
        .headers({ Authorization: authToken })
        .body({ article: { title: "new roya modified", description: "mokhtari", body: "test", tagList: [] } })
        .puttRequest(200)
    const newSlugID = updatArticle.article.slug
    expect(updatArticle.article.title).toEqual("new roya modified")

    const getArticleResponse = await api
        .path('/articles')
        .params({ limit: 10, offset: 0 })
        .headers({ Authorization: authToken })
        .getRequest(200)
    expect(getArticleResponse.articles[0].title).toEqual('new roya modified')


    await api
        .path(`/articles/${newSlugID}`)
        .headers({ Authorization: authToken })
        .deleteRequest(204)


    const getArticleResponseTow = await api
        .path('/articles')
        .params({ limit: 10, offset: 0 })
        .headers({ Authorization: authToken })
        .getRequest(200)
    expect(getArticleResponseTow.articles[0].title).not.toEqual('new roya modified')
})







