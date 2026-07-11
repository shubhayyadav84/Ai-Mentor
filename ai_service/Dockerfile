FROM python:3.10-slim

# Install system dependencies, including FFmpeg
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy and install Python dependencies
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port (Render sets $PORT dynamically)
EXPOSE 8000

# Start application by changing directory to backend to resolve python imports
CMD ["sh", "-c", "cd backend && uvicorn api:app --host 0.0.0.0 --port ${PORT:-8000}"]
