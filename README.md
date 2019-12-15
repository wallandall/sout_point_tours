# South Point Tours

## API Endpoints

Documentation on all API Endpoint can be found [her](https://documenter.getpostman.com/view/9595116/SWEB1aY8?version=latest)

## Environment variables

All environment variables are stored in a file called config.env, ensure that this file is incuded in the Root of the Project when deploying. As this file includes sensitive information, it should not be published to github or stored where it is publicaly visible.

```
NODE_ENV=production
PORT=3000
DATABASE=linktoyourdatabase
DATABASE_PASSWORD=yourdatabasepassword
JWT_SECRET=yourjwtsecretkey
JWT_EXPIRES_IN=90d
EMAIL_USERNAMR=emailaddress
EMAIL_PASSWORD=password
EMAIL_HOST=youremailhost
API_KEY=yourapikey
FROM_EMAIL=info<info@yourdomain.com>

```
