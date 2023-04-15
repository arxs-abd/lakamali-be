# Blog Back End

## Api Documentation

### A. Authentication

#### 1. Register

##### Endpoint

```Javascript
POST /api/register
```

##### Field

| Field           | Description                         | Type   | Validation                        |
| --------------- | ----------------------------------- | ------ | --------------------------------- |
| email           | The email used to register          | String | Valid email                       |
| password        | The password used to register       | String | minimum 8 character               |
| passwordConfirm | Rewritten password used to register | String | passwordConfirm equal to password |

##### Example for Request and Response

```Javascript
// Request
{
    email : 'arisakhyar704@gmail.com',
    password : 'indonesiainyabesar',
    passwordConfirm : 'indonesiainyabesar',
}
// Response
200 OK
{
    status : 'success',
    msg : 'Signup Successfully'
}
// Request
{
    email : 'arisakhyar704@gmail.com',
    password : 'indonesiainyabesar',
    passwordConfirm : 'indonesiainyabesar',
}
// Response
401 UNAUTHORIZED
{
    status : 'error',
    msg : 'Password confirmation does not match password'
}
```

#### 2. Login

##### Endpoint

```Javascript
POST /api/login
```

##### Field

| Field    | Description                   | Type   | Validation          |
| -------- | ----------------------------- | ------ | ------------------- |
| email    | The email used to register    | String | Valid Email         |
| password | The password used to register | String | minimum 8 character |

##### Example For Request and Response

```Javascript
// Request
{
    email : 'arisakhyar704@gmail.com',
    password : 'indonesiainyabesar',
}
// Response
200 OK
{
    status : 'success',
    msg : 'Login Successfully',
    data : {
        id: '6353b066327fac926fb26d7a',
        email: 'arisakhyar704@gmail.com',
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNTNiMDY2MzI3ZmFjOTI2ZmIyNmQ3YSIsImVtYWlsIjoiYXJpc21hQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJFd1UmZRc1U1UzNoeXVFaUJuRmw1ZC5XbG1uYnlJUVgxMURWZEdmNlkyTkFBV3ZadU1yQnhhIiwiX192IjowfSwiaWF0IjoxNjY2NDI5NDMzfQ.BkHJyJt5wogx3QfUU7TeRlyRyJj_ACg3eHcBen9zl7Q'
    }
}

// Contoh Request yang Salah
{
    email : 'arisakhyar704@gmail.com',
    password : 'indonesiainyakecil',
}
// Response
403 FORBIDDEN
{
    status : 'error',
    msg : 'Password is Wrong'
}
```

#### 3. Logout

##### Endpoint

```Javascript
POST /api/logout
```

##### Field

| Field          | Description                                                        | Type   | Validation |
| -------------- | ------------------------------------------------------------------ | ------ | ---------- |
| x-access-token | JSON Web Token Received During Login Process and Stored In Cookies | String | Required   |

##### Example For Request and Response

```Javascript
// Cookies
{
    x-acces-token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNTNiMDY2MzI3ZmFjOTI2ZmIyNmQ3YSIsImVtYWlsIjoiYXJpc21hQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJFd1UmZRc1U1UzNoeXVFaUJuRmw1ZC5XbG1uYnlJUVgxMURWZEdmNlkyTkFBV3ZadU1yQnhhIiwiX192IjowfSwiaWF0IjoxNjY2NDI5NDMzfQ.BkHJyJt5wogx3QfUU7TeRlyRyJj_ACg3eHcBen9zl7Q'
}
// Response
200 OK
{
    status : 'success',
    msg : 'Logout Successfully',
}
```

### B. Blog

#### 1. View All Blog

##### Endpoint

```Javascript
GET /api/blog
```

##### Example For Response

```Javascript
// Response
200 OK
{
    status : 'success',
    msg : 'Successfully Get Blog',
    data : [
        {
            _id : '63eb84007746fbb54bc0684b',
            id_user : '63eb62d520b1564d6ccda22d',
            title : 'Cara Membuat Makanan',
            slug : 'cara-membuat-makanan',
            content : 'Caranya adalah dengan memakan semua makana dengan cara saja',
            createdAt : '2023-02-14T12:52:16.127Z',
            updatedAt : '2023-02-14T12:52:16.127Z',
            __v : 0
        }
    ]
}
```

#### 2. View Blog By User Id

##### Endpoint

```Javascript
GET /api/blog/userId
```

##### Example For Response

```Javascript
// Request
{
    idUser : '63eb62d520b1564d6ccda22d'
}
// Response
200 OK
{
    result : {
        _id : '63eb84007746fbb54bc0684b',
        id_user : '63eb62d520b1564d6ccda22d',
        title : 'Cara Membuat Makanan',
        slug : 'cara-membuat-makanan',
        content : 'Caranya adalah dengan memakan semua makana dengan cara saja',
        createdAt : '2023-02-14T12:52:16.127Z',
        updatedAt : '2023-02-14T12:52:16.127Z',
        __v : 0
    }
}
```

#### 2. View Blog By Slug

##### Endpoint

```Javascript
GET /api/blog/:slug
```

##### Example For Response

```Javascript
// Request
GET /api/blog/cara-membuat-makanan
// Response
200 OK
{
    result : {
        _id : '63eb84007746fbb54bc0684b',
        id_user : '63eb62d520b1564d6ccda22d',
        title : 'Cara Membuat Makanan',
        slug : 'cara-membuat-makanan',
        content : 'Caranya adalah dengan memakan semua makana dengan cara saja',
        createdAt : '2023-02-14T12:52:16.127Z',
        updatedAt : '2023-02-14T12:52:16.127Z',
        __v : 0
    }
}
```

#### 3. Create a Blog

##### Endpoint

```Javascript
POST /api/blog/
```

##### Field

| Field     | Description                 | Type   | Validation |
| --------- | --------------------------- | ------ | ---------- |
| title     | Title for blog in website   | String | Required   |
| content   | Content for blog in website | String | Required   |
| thumbnail | Image for blog in website   | String | Optional   |

##### Example For Response

```Javascript
// Request
{
    title : 'Cara Membuat Makanan',
    content : 'Caranya adalah dengan memakan semua makana dengan cara saja',
}
// Response
200 OK
{
    {
    status : 'successfully',
    msg : 'Blog Added'
}
}
```

#### 4. Update Blog

##### Endpoint

```Javascript
PUT /api/blog/
```

##### Field

| Field     | Description                 | Type   | Validation |
| --------- | --------------------------- | ------ | ---------- |
| id        | Id for blog in website      | String | Required   |
| title     | Title for blog in website   | String | Optional   |
| content   | Content for blog in website | String | Optional   |
| thumbnail | Image for blog in website   | Image  | Optional   |

##### Example For Response

```Javascript
// Request
{
    title : 'Cara Membuat Makanan Lagi',
    content : 'Caranya adalah dengan memakan semua makana dengan cara apa saja',
}
// Response
200 OK
{
    {
    status : 'successfully',
    msg : 'Blog Updated'
}
}
```

#### 5. Remove Blog

##### Endpoint

```Javascript
DELETE /api/blog/
```

##### Field

| Field | Description            | Type   | Validation |
| ----- | ---------------------- | ------ | ---------- |
| id    | Id for blog in website | String | Required   |

##### Example For Response

```Javascript
// Request
{
    id : '63ebba602bc11162f2ab3d58'
}
// Response
200 OK
{
    {
    status : 'successfully',
    msg : 'Blog Has Been Deleted'
    }
}
```

#### 6. Create Public Blog

##### Endpoint

```Javascript
POST /api/blog/public
```

##### Field

| Field     | Description                        | Type   | Validation |
| --------- | ---------------------------------- | ------ | ---------- |
| title     | Title for blog in website          | String | Required   |
| content   | Content for blog in website        | String | Required   |
| thumbnail | Image for blog in website          | String | Optional   |
| category  | Category for blog in website       | String | Required   |
| user      | name of creator of blog in website | String | Required   |

##### Example For Response

```Javascript
// Request
{
    title : 'Cara Membuat Makanan',
    content : 'Caranya adalah dengan memakan semua makana dengan cara saja',
    thumbnail : 'https://lokasigambar.com',
    category : 'blog',
    user : 'arxs-akh'
}
// Response
200 OK
{
    {
    status : 'successfully',
    msg : 'Blog Added'
    }
}
```

#### 7. Get Public Blog

##### Endpoint

```Javascript
GET /api/blog/public
```

##### Example For Response

```Javascript
// Response
200 OK
{
    status : 'success',
    msg : 'Successfully Get Blog',
    data : [
        {
            _id : '63eb84007746fbb54bc0684b',
            user : 'arxs-akh',
            title : 'Cara Membuat Makanan',
            slug : 'cara-membuat-makanan',
            content : 'Caranya adalah dengan memakan semua makana dengan cara saja',
            category : 'blog',
            hasAccept : false,
            createdAt : '2023-02-14T12:52:16.127Z',
            updatedAt : '2023-02-14T12:52:16.127Z',
            __v : 0
        }
    ]
}
```

#### 8. Review Blog Public

##### Endpoint

```Javascript
POST /api/blog/public/{public_blog_id}/review/{accept | reject}
```

##### Example Request

```Javascript
POST /api/blog/public/64397c82d3422c528eef4a09/review/accept
```

##### Example For Response

```Javascript
// Response
200 OK
{
    'status' : 'success',
    'message' : 'Blog Has Been accept'
}
```
