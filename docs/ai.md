---
title: AI and Machine Learning
slug: /ai
---

Bluefin's [developer experience](/bluefin-dx) fully supports local AI development workflows. GPU Acceleration for both Nvidia and AMD are included out of the box and usually do not require any extra setup. 

:::tip[AI is an extension to cloud native]

Bluefin's focus in AI is providing a generic API endpoint to the operating system that is controlled by the user. Similar to how Bluefin ships `podman`, we feel that `ramalama` and other great open source tools can be used for many useful purposes.

:::


## AI Lab with Podman Desktop

The [AI Lab extension](https://developers.redhat.com/products/podman-desktop/podman-ai-lab) can be installed inside the included Podman Desktop to provide a graphical interface for managing local models:

![image](https://github.com/user-attachments/assets/e5557952-3e62-499e-93a9-934c4d452be0)

## Ramalama

[Ramalama](https://github.com/containers/ramalama) is included to manage local models and is the prefered default experience. It's for people who work with local models frequently and need advanced features. It offers the ability to pull models from huggingface, ollama, and any container registry. By default it pulls from ollama.com, check the [Ramalama documentation](https://github.com/containers/ramalama/tree/main/docs) for more information. 

Ramalama's command line experience is similar to Podman, examples include:

```
ramalama pull llama3.2:latest
ramalama run llama3.2  
ramalama run deepseek-r1
```

You can also serve the models locally: 

```
ramalama serve deepseek-r1
```

Then go to `http://127.0.0.0:8080` in your browser. 

Ramalama will automatically pull in anything your host needs to do the workload. The images are also stored in the same container storage as your other containers. This allows for centralized management of the ai models and other podman images:  

```
❯ podman images
REPOSITORY                                 TAG         IMAGE ID      CREATED        SIZE
quay.io/ramalama/rocm                      latest      8875feffdb87  5 days ago     6.92 GB
```

## Alpaca Graphical Client

For light chatbot usage we recommend that users [install Alpaca](https://flathub.org/apps/com.jeffser.Alpaca) to manage and chat with your LLM models from within a native desktop application. Alpaca supports Nvidia and AMD[^1] acceleration natively and _includes ollama_.

![image](https://github.com/user-attachments/assets/9fd38164-e2a9-4da1-9bcd-29e0e7add071)

[^1]: For proper AMD support, the Flatpak extension `com.jeffser.Alpaca.Plugins.AMD` must also be installed.

## Running Ollama as a Service

Since Alpaca doesn't expose any API, if you need other applications than Alpaca to interact with your ollama instance (for example an IDE) you should consider installing it in a [container](https://hub.docker.com/r/ollama/ollama).

### Quadlet (recommended)
[Bazzite Quadlet Docs](https://docs.bazzite.gg/Installing_and_Managing_Software/Quadlet/)  
`~/.config/containers/systemd/ollama.container`
```
[Unit]
Description=Ollama Service
After=network.target local-fs.target

[Container]
Image=ollama/ollama:latest
ContainerName=ollama
AutoUpdate=yes
PublishPort=11434:11434
Volume=%h/.ollama:/.ollama
RemapUsers=keep-id
RunInit=yes
NoNewPrivileges=no
PodmanArgs=--userns=keep-id
PodmanArgs=--group-add=keep-groups
PodmanArgs=--ulimit=host
PodmanArgs=--security-opt=label=disable
PodmanArgs=--cgroupns=host

# Nvidia
AddDevice=nvidia.com/gpu=all

# AMD
AddDevice=/dev/dri
AddDevice=/dev/kfd

[Service]
RestartUnlessStopped=yes
TimeoutStartSec=60s
# Ensure there's a userland podman.sock
ExecStartPre=/bin/systemctl --user enable podman.socket
# Ensure that the dir exists
ExecStartPre=-mkdir -p %h/.ollama

[Install]
WantedBy=multi-user.target
```

```sh
❯ systemctl --user daemon-reload

# start Ollama podlet for current session
❯ systemctl --user start ollama
❯ systemctl --user status ollama

# start Ollama podlet automatically after reboot
❯ systemctl --user enable ollama

# connect to ollama
❯ ollama list

# download and run model https://ollama.com/search
❯ ollama run <model>
```

### Docker Compose

To do so, first configure docker to use the nvidia drivers (that come preinstalled with Bluefin).

```bash
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

Then, choose a folder where to install the ollama container (for example `~/Containers/ollama`) and inside it create a new file named `docker-compose.yaml` with the following content:

```yaml
---
services:
  ollama:
    image: ollama/ollama
    container_name: ollama
    restart: unless-stopped
    ports:
      - 11434:11434
    volumes:
      - ./ollama_v:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - capabilities:
                - gpu
```


Finally, open a terminal in the folder containing the file just created and start the container with

```bash
docker compose up -d
```

and your ollama instance should be up and running at `http://127.0.0.1:11434`!

> **NOTE:** if you still want to use Alpaca as one of the way of interacting with Ollama, you can open the application, then go to _Preferences_, toggle the option _Use the Remote Connection to Ollama_, specify the endpoint above (`http://127.0.0.1:11434`) as _Server URL_ (leave _Bearer Token_ empty) in the dialog that will pop up and then press _Connect_.
> This way you should be able to manage the models installed on your ollama container and chat with them from the Alpaca GUI.
