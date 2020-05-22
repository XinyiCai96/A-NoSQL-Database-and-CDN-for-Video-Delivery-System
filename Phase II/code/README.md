# Topic 31: Distributed Systems (CDN + Storage) Design

## Team Members
- Yani Jin (yanijin@usc.edu)
- Xinyi Cai (caixinyi@usc.edu) 
- Ryan Afranji (afranji@usc.edu)

## Web Server
All the following files are under the directory of ```WebServer```.
1. cqlsh_commands.txt gives the list of the commands I entered into the shell cqlsh to build our database
2. app.js is our current web server. We will be making modifications to it and adding much more complexity to it in phase 3. We just have this to set up and make sure the system we are building is functioning correctly. This is run by starting it as a node js server.
3. index.html is a dummy file used by app.js right now.
4. web_server_nginx.conf is our nginx conf file for the web server. We run node js to have the server run locally. This configuration of nginx binds this server to the public ip of the ec2 instance.

## Load Balancer
Reference: [Choose Load Balancing Techniques](https://www.nginx.com/blog/choosing-nginx-plus-load-balancing-techniques/) and [Round Robin](https://www.nginx.com/resources/glossary/round-robin-load-balancing/)

load_balancer.conf file (under the ```LoadBalancer``` directory) is the nginx configuration file of load balancer. Here we define the listening port, the backend servers and their public ip addresses and the load balancing algorithms. The load balancer is currently running on a local virtual machine. We use Ngrok to provide a public ip address for the load balancer.

## Proxy Cache
Reference: [Understanding proxy_pass](https://www.digitalocean.com/community/tutorials/understanding-nginx-http-proxying-load-balancing-buffering-and-caching) and [A Guide to Caching](https://www.nginx.com/blog/nginx-caching-guide/)

proxy_cache.conf (under the ```ProxyCache``` directory) configures the nginx to a proxy cache. Replace the content in /etc/nginx/nginx.conf with the code inside this file if you want to set your own Nginx as proxy. Remember to set the port number inside /etc/nginx/sites_available/default to a number that does not conflict with port 80.

