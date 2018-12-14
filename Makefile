BUILDER=lambci/lambda:build-nodejs8.10
NODE=lambci/lambda:nodejs8.10

deploy-sandbox: build
	docker run --rm -it -v "$$PWD":/var/task -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY ${BUILDER} npm run deploy:sandbox

build:
	docker run --rm -it -v "$$PWD":/var/task -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY ${BUILDER} npm run build

local-upload:
	docker run --entrypoint=node --rm -it -v "$$PWD":/var/task -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY ${NODE} local/upload.js

test:
	docker run --rm -it -v "$$PWD":/var/task:delegated ${BUILDER} npm test