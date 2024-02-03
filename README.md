# Commands to deploy on AWS EC2

## Cloning

- Generate ssh key: `ssh keygen -t rsa`
- Add ssh key to your git account
- Clone into this repo

## Installation

- Install docker: `sudo yum install docker`
- Test using `docker run hello-world`

- Install tmux: `sudo yum install tmux`

- Install npm: (Can't remember, google "install npm on linux")

- Install serve: `npm i -g serve`

## Backend

- `cd back-end`
- Build api and tag it as 'api': `docker build -t api .`
- Run backend: `docker run -p 8000:8000 -d api`
- (If above doesn't detach properly): `docker run -p 8000:8000 api &`
- Check it's running: `docker ps`

## Frontend

- `cd vite-ui`
- `git pull` (Make sure the build file was recently pushed from dev env using `npm run build`)
- Open a new tmux instance: `tmux new-session -t ui`
- If not done automatically, enter tmux session using: `tmux a -t ui`
- `cd property-manager/vite-ui`
- Serve the build files: `sudo serve -m dist -p 80`
- Check the UI is running on the url, and close the ec2 connect tab
- Check UI is still running after closing the tab

## Tearing it down to update / restart

### API

- Stop api: `docker stop api`
- Remove api: `docker rm api -f`
- Check it's gone with `docker ps`

### UI

- Find tmux session: `tmux ls`
- Attach to tmux session: `tmux a -t [session name here, e.g. ui-1]`
- Kill the UI session: CTRL+C
- (If UI is running detached) Find PID of running process: `sudo lsof -n -i :80 | grep LISTEN`
- Kill process on that PID: `sudo kill -9 [PID, e.g. 43215]`

If you want to kill the tmux session

- Exit the session using [CTRL+B] then "D" **OR** close the current tab and reconnect
- Kill all sessions: `tmux kill-session -a`
- Verify it's been killed using: `tmux ls`
- If not, kill it using: `tmux kill-session -t [session name here]`
