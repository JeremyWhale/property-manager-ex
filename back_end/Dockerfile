# Use a base image suitable for your Django app (e.g., Python)
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt .
RUN python -m pip install -r requirements.txt

# Copy the rest of the application
COPY . .

# Create a non-root user
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

# Expose the necessary port
EXPOSE 8000

# Command to start the Django API
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "back_end.wsgi"]