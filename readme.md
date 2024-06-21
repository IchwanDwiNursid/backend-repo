# -------------------backend-repo----------------------

1.  `npm install --force`

2.  create collection in `firebase firestore` , using name "users" , than
    create field document

        - name string
        - email string
        - password string
        - token string

3.  create `.env` file and create variale like this :

- PORT=for-express
- FB_API_KEY=for-fb
- FB_PROJECT_ID=for-fb
- FB_STORAGE_BUCKET=for-fb
- FB_MESSAGE_ID=for-fb
- FB_APP_ID=for-fb
- FB_MEASURE_ID=for-fb
- REFRESH_TOKEN_SECRET=for-jwt

4. `npm run dev` "for development staging"
5. `npm run build` "for compiling in JS code"
6. `npm run start` "for production staging "
7. You can using example call API in file `rest.http`
