FROM python:3.9-slim

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

Add wait-for-it
COPY wait-for-it.sh wait-for-it.sh 
RUN chmod +x wait-for-it.sh

ENTRYPOINT [ "/bin/bash", "-c" ]
CMD ["./wait-for-it.sh" , "server_backend:5101/" , "--strict" , "--timeout=300" , "--" , "pytest"]