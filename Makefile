docker:
	docker run -p 3000:3000 hopprotocol/subgraph

# Build docker target
docker-build:
	docker build -f Dockerfile -t hopprotocol/subgraph .

# Tag docker image
docker-tag:
	$(eval REV=$(shell git rev-parse HEAD | cut -c1-7))
	docker tag hopprotocol/subgraph:latest hopprotocol/subgraph:latest
	docker tag hopprotocol/subgraph:latest hopprotocol/subgraph:$(REV)

# Push to registry
docker-push:
	$(eval REV=$(shell git rev-parse HEAD | cut -c1-7))
	docker push hopprotocol/subgraph:latest
	docker push hopprotocol/subgraph:$(REV)

# Build docker image and push to registry
docker-build-and-push: docker-build docker-tag docker-push

docker-compose-up:
	export NETWORK=base-goerli
	export RPC=https://goerli.base.org
	docker compose up

docker-graph-deploy:
	export NETWORK=base-goerli
	export IPFS_HOST: http://localhost:5001
	export GRAPH_NODE_HOST: http://localhost:8020
	docker run --env=IS_DOCKER=true --env=IPFS_HOST --env=GRAPH_NODE_HOST --network=host hopprotocol/subgraph:latest build-deploy:$NETWORK

docker-clean:
	sudo rm -rf data/
