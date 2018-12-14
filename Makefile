BUILDER=node:8.10.0
NODE=node:8.10.0

deploy-dev:
	docker run --rm -it -v "$$PWD":/var/task -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY ${BUILDER} npm run deploy:dev

build-dev:
	docker run --rm -it -v "$$PWD":/var/task -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY ${BUILDER} npm run build:dev

local-upload:
	docker run --entrypoint=node --rm -it -v "$$PWD":/var/task -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY ${NODE} local/upload.js

test:
	docker run --rm -it -v "$$PWD":/var/task:delegated ${BUILDER} npm test