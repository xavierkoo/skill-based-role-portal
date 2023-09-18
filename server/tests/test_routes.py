"""
Test the routes of the server
"""

import json
import pytest
from server.server import app


def test_home():
    """
    Test the home route
    """
    client = app.test_client()
    response = client.get("/")
    assert b"Hello World!" in response.data
