from fastapi.testclient import TestClient
from main import app

def test_health_check():
    # Using 'with' triggers the FastAPI startup (lifespan) event
    with TestClient(app) as client:
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "healthy"}

def test_analyze_endpoint():
    # Using 'with' ensures app.state.models is populated before the request
    with TestClient(app) as client:
        payload = {
            "docImageUrl": "https://tse2.mm.bing.net/th/id/OIP.FFqyVZ5sx_q1jqxeQGNCewHaKY?r=0&w=500&h=701&rs=1&pid=ImgDetMain&o=7&rm=3",
            "faceImageUrl": "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg"
        }
        response = client.post("/internal/analyze", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        
        assert "risk_score" in data
        assert "extracted_fields" in data
        assert "face_match_score" in data