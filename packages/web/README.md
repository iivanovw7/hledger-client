-   Endpoints sample config

```nginx
        location / {
                proxy_pass http://localhost:HLEDGER_PORT;

                auth_basic "AUTH_NAME";
                auth_basic_user_file /etc/nginx/.htpasswd;
        }

        location /client/ {
                proxy_pass http://localhost:CLIENT_PORT;

                auth_basic "AUTH_NAME";
                auth_basic_user_file /etc/nginx/.htpasswd;
        }
```
