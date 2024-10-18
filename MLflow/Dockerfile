FROM python:3.9-slim

ENV PIP_NO_CACHE_DIR=1

RUN pip install --upgrade pip
RUN pip install mlflow boto3

WORKDIR /mlflow-app

COPY . /mlflow-app

EXPOSE 5000

CMD ["mlflow", "server", "--host", "0.0.0.0", "--backend-store-uri", "postgresql://youssef:YVn4EIAXJCc1@ep-autumn-firefly-a2bwyn6z.eu-central-1.aws.neon.tech/MLflow?sslmode=require", "--default-artifact-root", "/mlflow-artifacts"]

