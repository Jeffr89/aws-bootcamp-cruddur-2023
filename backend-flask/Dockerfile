FROM python:3.10-slim-buster

WORKDIR /backend-flask

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN apt update && apt install -y curl && rm -rf /var/lib/apt/lists/*

COPY . .

ENV FLASK_ENV=development
EXPOSE ${PORT}

RUN chmod +x init.sh
ENTRYPOINT [ "./init.sh" ]
#CMD ["./init.sh"]git