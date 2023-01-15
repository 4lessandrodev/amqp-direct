install:
	yarn
	cd ./publisher && yarn && npm run build
	cd ./subscriber && yarn && npm run build

start:
	yarn
	docker-compose up -d
	yarn pm2 start ./ecosystem.config.js

logs:
	yarn pm2 log

stop:
	yarn pm2 stop all

delete:
	yarn pm2 delete all
