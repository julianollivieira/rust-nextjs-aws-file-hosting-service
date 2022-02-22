# Rust Next.js AWS File hosting service
🗃️ A file hosting service made using Rust, Next.js and AWS


## ⚒️ Setup a local development environment

1. First of all, clone the project:

```bash
$ git clone https://github.com/julianollivieira/rust-nextjs-aws-file-hosting-service
```

2. Change directory into the project root:
```bash
$ cd rust-nextjs-aws-file-hosting-service
```

3. Make sure you have [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/) installed, make sure the Docker service is running and then start the development container with Docker Compose:

```bash
$ docker compose -f docker-compose.dev.yml up
```

4. And finally, get a shell inside the container, change directory into the API server and run cargo watch to re-run the API server on file change:

```bash
$ cd /home/app/apps/api && cargo watch -x run
```