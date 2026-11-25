from flask import Flask, request, jsonify
from flask_cors import CORS # type: ignore

import joblib  # 모델 저장 및 로드를 위한 라이브러리
import pickle  # CountVectorizer 저장 및 로드를 위한 라이브러리
from deep_translator import GoogleTranslator

app = Flask(__name__)
CORS(app)  # CORS 설정

# Google 번역기 사용
translator = GoogleTranslator(source='ko', target='en')

@app.route("/")
def home():
    return "Hello, Flask with Docker!"

@app.route("/api/analysis-email", methods=["GET", "POST", "OPTIONS"])
def process_email():
    if request.method == "OPTIONS":
        return '', 204

    # 요청에서 JSON 데이터 가져오기
    data = request.get_json()
    emailTitles = data.get("emailTitles", "")
    print(emailTitles)

    # 이메일 제목 번역
    translatedEmailTitles = []
    for k in emailTitles:
        translatedTitle = translator.translate(k)
        translatedEmailTitles.append(translatedTitle)
    print("Translated Email Titles:", translatedEmailTitles)

    # 학습된 모델을 사용하여 스팸 메일 예측
    model = joblib.load('mail-storm-model.pkl')  # 모델 파일 경로에 맞게 수정
    with open('mail-storm-vectorizer.pkl', 'rb') as file:
        cv = pickle.load(file)
    new_texts_transformed = cv.transform(translatedEmailTitles)
    predictions = model.predict(new_texts_transformed) # 예측
    print("Predictions:", predictions) # 결과 출력
    
    # 응답 데이터 생성
    response = {
        "data": [
            {
                "title": title,
                "result": result
            } for title, result in zip(emailTitles, predictions)
        ]
    }
    return jsonify(response)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
