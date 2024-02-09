from python:3.12.2

RUN pip3 install poetry

WORKDIR /usr/src/app

COPY poetry.lock pyproject.toml /usr/src/app/

COPY . .

RUN poetry install

CMD ["poetry", "run", "python", "manage.py", "runserver"]