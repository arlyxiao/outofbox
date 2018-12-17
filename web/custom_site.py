"""
Site global settings
"""


def site():
    return {
        'cors_origin_whitelist': (
            '192.168.56.101:5000',
            '192.168.56.101:8000',
            '192.168.56.101',
        )
    }
