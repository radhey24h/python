import sys
import os

def get_system_directory():
    print(os.listdir('/'))
    print('seems good')

def system_version():
    print(sys.version_info)
