from setuptools import setup, find_packages

setup(
    name="timefocus",
    version="0.1",
    packages=find_packages(),
    install_requires=[
        'plyer>=2.0.0',
        'playsound>=1.2.2',
        'pandas>=1.3.0',
        'rich>=10.0.0'
    ],
    entry_points={
        'console_scripts': [
            'timefocus=timefocus.interface.cli:main',
        ],
    },
)