---
title: AI and Machine Learning
slug: /ai
---

# AI and Machine Learning

GPU Acceleration for both Nvidia and AMD are included out of the box and usually do not require any extra setup.

### Ollama GUI

[Install Alpaca](https://flathub.org/apps/com.jeffser.Alpaca) to manage and chat with your LLM models from within a native desktop application. Alpaca supports Nvidia and AMD acceleration natively and _includes ollama_.

![image](https://github.com/user-attachments/assets/9fd38164-e2a9-4da1-9bcd-29e0e7add071)

### Ollama API

Since Alpaca doesn't expose any API, if you need other applications than Alpaca to interact with your ollama instance (for example an IDE) you should consider installing it in a [container](https://hub.docker.com/r/ollama/ollama).

#### Quadlet (recommended)
`~/.local/share/systemd/ollama.container`
```
[Unit]
Description=Ollama Service
After=network.target local-fs.target

[Container]
Image=ollama/ollama:latest
ContainerName=ollama
AutoUpdate=yes
PublishPort=11434:11434
Volume=./ollama_v:/root/.ollama:z
Device=/dev/nvidia*:ro
Deploy=resources.reservations.devices.capabilities=gpu

[Service]
RestartUnlessStopped=yes
TimeoutStartSec=60s

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


#### Podman Compose
> **NOTE:** Podman needs to be run with sudo for nvidia gpu passthrough until [this](https://github.com/containers/podman/issues/19338) issue is fixed.
> 
Create this `podman-compose.yaml file

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
      - ./ollama_v:/root/.ollama:z
    devices:
      - nvidia.com/gpu=all
    deploy:
      resources:
        reservations:
          devices:
            - capabilities:
                - gpu

```

`❯ sudo podman-compose up -d`



#### Docker Compose

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
