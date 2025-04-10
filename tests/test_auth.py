from timefocusBack.core import auth

def test_create_access_token():
    token = auth.create_access_token({"sub": "jamersom"})
    assert token is not None
