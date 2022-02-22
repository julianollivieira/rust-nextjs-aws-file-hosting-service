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

## 📝 Open in Visual Studio Code
1. Once everything is running correctly, open [Visual Studio Code](https://code.visualstudio.com/) and install the [Docker extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker).
2. Go to the Docker tab in the [Activity Bar](https://code.visualstudio.com/docs/getstarted/userinterface), right-click the 'rust-nextjs-aws-file-hosting-service' entry, click 'Attach Visual Studio Code' and select the 'apps' container.
3. Go to 'File -> Open Workspace from File...' and open the workspace.code-workspace file located in /home/app.
4. And finally, install the [recommended extensions](https://code.visualstudio.com/docs/editor/extension-marketplace#_recommended-extensions).