# ce-berlin-non-profit

### Running the application

You must have [docker](https://store.docker.com/editions/community/docker-ce-desktop-mac) installed

```
git clone git@github.com:montera82/ce-berlin-non-profit.git

cd ce-berlin-non-profit/

npm install

docker-compose up -d
```
ps : this is not the most religious approach, since we are installing node dependencies on the host computer and copying over to docker container ( instead of solely doing installation in container ). But should be fine for most users.

Naviage to http://localhost:3001/ to see awesome :))
