FROM python:latest
ENV PYTHONUNBUFFERED 1

RUN mkdir -p /var/www
WORKDIR /var/www
ADD requirements.txt /var/www/

RUN pip install -r requirements.txt

CMD [ "bash" ]
