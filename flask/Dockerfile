# 베이스 이미지
FROM python:3.10-slim

# 작업 디렉토리 생성
WORKDIR /app

# 애플리케이션 코드와 의존성 복사
COPY ./app /app

# 의존성 설치
RUN pip install --no-cache-dir -r requirements.txt

# Flask 실행
CMD ["python", "app.py"]
