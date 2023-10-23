import pytest
from starlette.testclient import TestClient
from main import app


@pytest.fixture
def client():
    return TestClient(app)


def test_read_root(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "The API has started successfully"}

def test_get_rolelisting(client):
    response = client.get("/api/v1/rolelistings/")
    assert response.status_code == 200
    assert isinstance(response.json(), dict)

def test_get_roledetail(client):
    response = client.get("/api/v1/roledetails/")
    assert response.status_code == 200
    assert isinstance(response.json(), dict)

def test_create_rolelisting(client):
    sample_payload = {
    "role_id": 234567892,
    "role_listing_desc": "Sample Description",
    "role_listing_open": "2020-01-31",
    "role_listing_close": "2022-01-31"
    }
    response = client.post("/api/v1/rolelistings/", json=sample_payload)
    assert response.status_code == 201
    assert isinstance(response.json(), dict)

def test_update_rolelisting(client):
    sample_payload = {
    "role_listing_id": 2,
    "role_id": 234567892,
    "role_listing_desc": "Updated Sample Description",
    "role_listing_open": "2020-01-31",
    "role_listing_close": "2022-01-31"
    }
    response = client.put("/api/v1/rolelistings/", json=sample_payload)
    assert response.status_code == 200
    assert isinstance(response.json(), dict)

def test_get_role_application(client):
    response = client.get("/api/v1/applications/")
    assert response.status_code == 200
    assert isinstance(response.json(), dict)

def test_get_role_application_by_staff_id(client):
    staff_id = "123456789"
    response = client.get("/api/v1/applications/" + staff_id)

    assert response.status_code == 200
    assert isinstance(response.json(), dict)

def test_create_rolelisting(client):
    sample_payload = {
    "role_listing_id" : 1,
    "staff_id" : 123456789,
    "role_app_status" : "applied",
    "role_app_reason" : "Sample Reason",
    }
    response = client.post("/api/v1/applications/", json=sample_payload)
    assert response.status_code == 201
    assert isinstance(response.json(), dict)

def test_get_all_skills(client):
    response = client.get("/api/v1/allskills/")
    assert response.status_code == 200
    assert isinstance(response.json(), dict)

def test_get_staff_skills_by_staff_id(client):
    staff_id = "123456789"
    response = client.get("/api/v1/staffskills/" + staff_id)
    assert response.status_code == 200
    assert isinstance(response.json(), dict)