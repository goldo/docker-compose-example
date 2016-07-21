# Build & Run
```
docker-compose build
docker-compose up -d
```

# Auto-deploy from github webhook

```
npm run webhook
```

On Github set this url
```
http://IP:8555/incoming/docker-compose-example
```

set content-type as: `application/x-www-form-urlencoded`

and git push to github to see your container rebuilding and reploying
