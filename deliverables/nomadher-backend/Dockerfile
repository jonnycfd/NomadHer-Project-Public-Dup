FROM python:3.6-alpine

RUN apk add --update python3-dev  gcc build-base

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY ./app /app

ENTRYPOINT [ "python3" ]

CMD [ "./app/flask_entry.py" ]