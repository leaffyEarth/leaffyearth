@echo off
REM Set Docker Hub credentials
SET DOCKER_USERNAME=leaffyearthdocker
SET DOCKER_REPO=leaffyearthdocker
SET IMAGE_TAG=latest

REM Login to Docker Hub
docker login -u %DOCKER_USERNAME%
IF ERRORLEVEL 1 (
    echo Docker login failed!
    exit /b 1
)

REM Build and push backend image
docker build -t %DOCKER_REPO%/backend:%IMAGE_TAG% -f backend/dockerfile ../../leaffyearth
docker push %DOCKER_REPO%/backend:%IMAGE_TAG%

@REM REM Build and push frontend image
@REM docker build -t %DOCKER_REPO%/frontend:%IMAGE_TAG% -f frontend/Dockerfile ../../leaffyearth
@REM docker push %DOCKER_REPO%/frontend:%IMAGE_TAG%

REM Build and push markeplace image
@REM docker build -t %DOCKER_REPO%/marketplace:%IMAGE_TAG% -f marketplace/Dockerfile ../../leaffyearth
@REM docker push %DOCKER_REPO%/marketplace:%IMAGE_TAG%

REM docker pull mongo:latest
REM docker tag mongo:latest %DOCKER_REPO%/mongo:%IMAGE_TAG%
REM docker push %DOCKER_REPO%/mongo:%IMAGE_TAG%

echo All images have been pushed successfully!
