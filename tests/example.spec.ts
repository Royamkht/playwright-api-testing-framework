import { test, expect } from '@playwright/test';
let authToken : string


test.beforeAll('run befor all tests', async({request}) => {
    const loginResponse = await request.post(
    'https://conduit-api.bondaracademy.com/api/users/login',
    {
      data: {
        user: {
          email: "royamokhtari8066@gmail.com",
          password: "Roya.8066"
        }
      }
    }
  );

  expect(loginResponse.status()).toBe(200);

  const loginJSON = await loginResponse.json();
  // console.log("TOKEN:", loginJSON.user.token);
  authToken =`Token ${loginJSON.user.token}`
  
})



test('creat and delete article', async ({ request }) => {
  const newArticle = await request.post(
    'https://conduit-api.bondaracademy.com/api/articles',
    {
      headers: {
        Authorization: authToken
      },
      data: {
        article: {
          title: "new roya",
          description: "mokhtari",
          body: "test",
          tagList: []
        }
      }
    }
  );

  console.log("CREATE STATUS:", newArticle.status());
  const newArticleJSON = await newArticle.json()
  console.log(newArticleJSON.article)
  const slugID = newArticleJSON.article.slug

  
  const articalsResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', {
    headers: {
      Authorization: authToken
    }
  });
  const articalsResponseJSON = await articalsResponse.json()
  expect(articalsResponse.status()).toBe(200);
  expect(articalsResponseJSON.articles[0].title).toEqual('new roya')
  console.log("CREATE STATUS:", articalsResponse.status());
  const deleteArtile = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugID}`, {
    headers: {
      Authorization: authToken
    }
  })

  expect(deleteArtile.status()).toBe(204);
  console.log("CREATE STATUS:", deleteArtile.status());
});



test('creat,update and delete article', async ({ request }) => {

  
  const newArticle = await request.post(
    'https://conduit-api.bondaracademy.com/api/articles',
    {
      headers: {
        Authorization: authToken
      },
      data: {
        article: {
          title: "new roya",
          description: "mokhtari",
          body: "test",
          tagList: []
        }
      }
    }
  );

  console.log("CREATE STATUS:", newArticle.status());
  const newArticleJSON = await newArticle.json()
  const slugID = newArticleJSON.article.slug

  const updatArticle = await request.put(`https://conduit-api.bondaracademy.com/api/articles/${slugID}`,{
    headers: {
      Authorization: authToken
    },
      data: {
        article: {
          title: "new roya modified",
          description: "mokhtari",
          body: "test",
          tagList: []
        }
      }
    
  })
  const updatArticleJSON = await updatArticle.json()
  expect(updatArticle.status()).toBe(200);
  console.log("UPDATE STATUS:", updatArticle.status());
  const newSlugID = updatArticleJSON.article.slug


  const articalsResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', {
    headers: {
      Authorization: authToken
    },
    
  });
  const articalsResponseJSON = await articalsResponse.json()
  expect(articalsResponse.status()).toBe(200);
  expect(articalsResponseJSON.articles[0].title).toEqual('new roya modified')
  console.log("GET STATUS:", articalsResponse.status());
  

  


  const deleteArtile = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${newSlugID}`, {
    headers: {
      Authorization: authToken
    }
  })


  expect(deleteArtile.status()).toBe(204);
  console.log("DELETE STATUS:", deleteArtile.status());


});


