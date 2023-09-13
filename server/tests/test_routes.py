from server import app

def test_home():
    client = app.test_client()
    response = client.get('/')
    assert b'Hello World!' in response.data

