FROM python:3.11.7-alpine3.19

WORKDIR /api

COPY requirements.txt ./requirements.txt

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000