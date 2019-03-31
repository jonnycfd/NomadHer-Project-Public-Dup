Steps to run the backend:
1. pip3 install -r requirements.txt
2. python3 app/flask_entry.py

Database usage example:
- python3 main.py


# docker
To start:

`docker build -t d3-301 .`

`docker run -d --name d3-301-container -p 80:80 d3-301:latest`

`docker start d3-301-container`

To stop/remove container:

`docker stop d3-301-container`

`docker rm d3-301-container`

# heroku
`heroku login`

`heroku create --app team5-nomadher-api`

`heroku container:login`

`heroku container:push web --app team5-nomadher-api`

`heroku container:release web --app team5-nomadher-api`

`heroku open --app team5-nomadher-api`