#!/bin/bash
imageName=hledger-client-web
containerName=hledger-client-web

docker build -t $imageName -f Dockerfile .

echo Delete old container...
docker rm -f $containerName

echo Run new container...
docker run -d -p 3050:3050 --name $containerName $imageName
