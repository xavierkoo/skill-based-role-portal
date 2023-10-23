import pytest
from main import app
from fastapi.testclient import TestClient


@pytest.fixture()
def client():
    return TestClient(app)


def test_read_root(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "The API has started successfully"}


# Create a class called rolelisting to test the CRUD operations
class TestRoleListing:
    def test_get_rolelisting_pos(self, client):
        response = client.get("/api/v1/rolelistings/")
        assert response.status_code == 200
        assert isinstance(response.json(), dict)

    def test_get_rolelisting_neg(self, client):
        response = client.get("/api/v1/rolelistings/123")
        assert response.status_code == 404

    def test_create_rolelisting_pos(self, client):
        sample_payload = {
            "role_id": 234567892,
            "role_listing_desc": "Sample Description",
            "role_listing_open": "2020-01-31",
            "role_listing_close": "2022-01-31",
        }
        response = client.post("/api/v1/rolelistings/", json=sample_payload)
        assert response.status_code == 201
        assert isinstance(response.json(), dict)

    def test_create_rolelisting_neg(self, client):
        sample_payload = {
            "role_id": 234567892,
            "role_listing_desc": 12345,
            "role_listing_open": "2020-01-31",
            "role_listing_close": "2022-01-31",
        }
        response = client.post("/api/v1/rolelistings/", json=sample_payload)
        assert response.status_code == 422

    def test_create_rolelisting_boundary(self, client):
        sample_payload = {
            "role_id": 234567892,
            "role_listing_desc": 12345,
            "role_listing_open": "2020-01-31",
            "role_listing_close": "2022-01-31",
            "test_boundary": "test_boundary",
        }
        response = client.post("/api/v1/rolelistings/", json=sample_payload)
        assert response.status_code == 422

    def test_update_rolelisting_pos(self, client):
        sample_payload = {
            "role_listing_id": 2,
            "role_id": 234567892,
            "role_listing_desc": "Updated Sample Description",
            "role_listing_open": "2020-01-31",
            "role_listing_close": "2022-01-31",
        }
        response = client.put("/api/v1/rolelistings/", json=sample_payload)
        assert response.status_code == 200
        assert isinstance(response.json(), dict)

    def test_update_rolelisting_neg(self, client):
        sample_payload = {
            "role_listing_id": 2,
            "role_id": 234567892,
            "role_listing_desc": 12345,
            "role_listing_open": "2020-01-31",
            "role_listing_close": "2022-01-31",
        }
        response = client.put("/api/v1/rolelistings/", json=sample_payload)
        assert response.status_code == 422

    def test_update_rolelisting_boundary(self, client):
        sample_payload = {
            "role_listing_id": 2,
            "role_id": 234567892,
            "role_listing_desc": "Updated Sample Description",
            "role_listing_open": "2020-01-31",
        }
        response = client.put("/api/v1/rolelistings/", json=sample_payload)
        assert response.status_code == 422


# Create a class called TestRoleDetail to test the CRUD operations
class TestRoleDetail:
    def test_get_roledetail_pos(self, client):
        response = client.get("/api/v1/roledetails/")
        assert response.status_code == 200
        assert isinstance(response.json(), dict)

    def test_get_roledetail_neg(self, client):
        response = client.get("/api/v1/roledetails/12")
        assert response.status_code == 404


# Create a class called TestRoleApplication to test the CRUD operations
class TestRoleApplication:
    def test_get_roleapplication_pos(self, client):
        response = client.get("/api/v1/applications/")
        assert response.status_code == 200
        assert isinstance(response.json(), dict)

    def test_get_roleapplication_neg(self, client):
        response = client.get("/api/v1/applications/1")
        assert response.status_code == 404

    def test_get_role_application_by_staff_id_pos(self, client):
        staff_id = "123456789"
        response = client.get("/api/v1/applications/" + staff_id)
        assert response.status_code == 200
        assert isinstance(response.json(), dict)

    def test_get_role_application_by_staff_id_neg(self, client):
        staff_id = "1"
        response = client.get("/api/v1/applications/" + staff_id)
        assert response.status_code == 404

    def test_create_roleapplication_pos(self, client):
        sample_payload = {
            "role_listing_id": 1,
            "staff_id": 123456786,
            "role_app_reason": "Sample Test Reason",
        }
        response = client.post("/api/v1/applications/", json=sample_payload)
        assert response.status_code == 201
        assert isinstance(response.json(), dict)

    def test_create_roleapplication_neg(self, client):
        sample_payload = {
            "role_listing_id": 1,
            "staff_id": 123456789,
            "role_app_reason": "Sample Test Reason",
        }
        response = client.post("/api/v1/applications/", json=sample_payload)
        assert response.status_code == 400

    def test_create_roleapplication_boundary(self, client):
        sample_payload = {
            "role_listing_id": 1,
            "staff_id": 123456789,
            "role_app_reason": "Sample Test Reason",
            "test_boundary": "test_boundary",
        }
        response = client.post("/api/v1/applications/", json=sample_payload)
        assert response.status_code == 400


# create a class TestSkill to test the CRUD operations
class TestSkill:
    def test_get_all_skills_pos(self, client):
        response = client.get("/api/v1/allskills/")
        assert response.status_code == 200
        assert isinstance(response.json(), dict)

    def test_get_all_skills_neg(self, client):
        response = client.get("/api/v1/allskills/1")
        assert response.status_code == 404

    def test_get_staff_skills_by_staff_id_pos(self, client):
        staff_id = "123456789"
        response = client.get("/api/v1/staffskills/" + staff_id)
        assert response.status_code == 200
        assert isinstance(response.json(), dict)

    def test_get_staff_skills_by_staff_id_neg(self, client):
        staff_id = "1"
        response = client.get("/api/v1/staffskills/" + staff_id)
        assert response.status_code == 404


# create a class TestStaffDetail to test the CRUD operations
class TestStaffDetail:
    def test_get_all_staff_details_pos(self, client):
        response = client.get("/api/v1/staffdetails/")
        assert response.status_code == 200
        assert isinstance(response.json(), dict)

    def test_get_all_staff_details_neg(self, client):
        response = client.get("/api/v1/staffdetails/1")
        assert response.status_code == 404

    def test_get_staff_details_by_staff_id_pos(self, client):
        staff_id = "123456789"
        response = client.get("/api/v1/staffdetails/" + staff_id)
        assert response.status_code == 200
        assert isinstance(response.json(), dict)

    def test_get_staff_details_by_staff_id_neg(self, client):
        staff_id = "1"
        response = client.get("/api/v1/staffdetails/" + staff_id)
        assert response.status_code == 404
