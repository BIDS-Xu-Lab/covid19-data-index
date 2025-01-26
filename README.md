# covid19-data-index
For the website of covid19dataindex.org

## Development

```bash
cd web
npm install
npm run dev
```
## Prompt for composer

See the [prompt.md](prompt.md) file.

# Deployment

Before deployment, please make sure you tested the docker image locally.

To deploy this instance, a `t3.small` EC2 instance is used (2GB memory is required for building the website). The following steps are needed to deploy the website.

## Install docker

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Test

```bash
sudo docker run hello-world
```

add user to docker group

```bash
sudo usermod -aG docker $USER
```

then log out and log in again.
```bash
exit
```

## Configure deployment SSH key

```bash
ssh-keygen -t rsa -f ~/.ssh/id_github_cv19di
cat ~/.ssh/id_github_cv19di.pub
```

Add ~/.ssh/config naming it `github_cv19di` with the following content
Use echo to append the content to the file

```bash
echo "Host github_cv19di
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_github_cv19di
" >> ~/.ssh/config
```

## Clone the repo and deploy

Clone code base:

```bash
git clone git@github_cv19di:BIDS-Xu-Lab/covid19-data-index.git
```

Deploy:

```bash
cd covid19-data-index/conf/aws/
docker compose up -d --build
```

If everything works well, you should be able to see the container is running:

```bash
docker ps
```

## AWS configuration

This part is complex, so just follow the general step to setup:

- Ensure the EC2 instance has configured
- Setup security group to allow port 8800 to this machine from ALB.
- Setup target group to forward request to port 8800 of the EC2 instance.
- Setup ALB to forward request to the target group
- Setup SSL certificate for the ALB
- Setup Route53 to point to the ALB with the domain name, both `www` and `@` default domain name.

This process may take some time to configure correctly.