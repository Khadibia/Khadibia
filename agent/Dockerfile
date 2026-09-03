FROM python:3.11-slim

WORKDIR /app

COPY agent/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY agent/ ./agent/
COPY content/ ./content/

ENV CONTENT_DIR=/app/content
ENV PYTHONPATH=/app/agent

EXPOSE 7860

CMD ["uvicorn", "agent.app:app", "--host", "0.0.0.0", "--port", "7860"]
