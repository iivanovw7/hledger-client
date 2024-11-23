# Hledger-client

Web mobile client app for [hledger](https://hledger.org)
which can be deployed on the same server with `hledger-web` and use `hledger-json` api.

Running alongside with `hledger-web` will require additional nginx configurations
to make new client available on `/client` path and to avoid collisions among network requests.

Example:

```nginx
       location / {
                proxy_pass http://localhost:AAAA;

                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /client/ {
                proxy_pass http://localhost:BBBB;

                # Optional headers for proxying requests
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /client/api {
                proxy_pass http://localhost:AAAA;

                rewrite ^/client/api/(.*) /$1 break;

                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }
```
