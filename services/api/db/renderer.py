from rest_framework import renderers
import json

class UserRenderer(renderers.JSONRenderer):
    charset = 'UTF-8'
    def render(self, data, accepted_media_type=None, renderer_context=None):
        try:
            response = json.dumps(data)
        except Exception as e:
            # Handle serialization error
            response = json.dumps({'error': 'Error occurred during serialization'})
        return response