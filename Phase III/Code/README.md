# project-p3

# Topic 31: A NoSQL Database and CDN for Video Delivery System

## Team Members
- Yani Jin (yanijin@usc.edu)
- Xinyi Cai (caixinyi@usc.edu) 
- Ryan Afranji (afranji@usc.edu)

## Web Server
The express generated module contained too many files so we will just be uploading the ones we made modifications to which are ```index.js``` and ```index.jade```.

Followed [this video series](https://www.youtube.com/watch?v=ivstVNUKAW8) to set up the web server. Teaches how to use express generate the template of a web server and all the associated files. So followed its directions to generate the template and modify it to support the cassandra-driver. 

Next, I modified the ```index.js``` and ```index.jade``` page to make the queries needed for our own database, package those results into a data structure and then send those to the ```index.jade``` file I modified to display our website the way we wanted it to and populated it with values from that data structure.

```index.js``` can be found under WebServer/project/routes/index.js

```index.jade``` can be found under WebServer/project/views/index.jade

Learned for to make a list in jade and handle for loops from [this site](https://naltatis.github.io/jade-syntax-docs/).

Learned cassandra-driver and cql commands from [this one in GitHub](https://github.com/datastax/nodejs-driver) and [this one in datastax](https://docs.datastax.com/en/cql-oss/3.3/cql/cql_reference/cqlSelect.html).



## Load Balancer
Files are under the directory of ```LoadBalancer```.

Reference: [Load Balancing Techniques](https://www.nginx.com/blog/choosing-nginx-plus-load-balancing-techniques/) and [Round Robin](https://www.nginx.com/resources/glossary/round-robin-load-balancing/).

The ```load_balancer.conf``` file is the Nginx configuration file of load balancer. Here we define the listening port, the backend server, their IP addresses and the load balancing algorithms. The load balancer is currently running Amazon EC2 instance.

## Proxy Cache
Files for each proxies are the same as they follow identical cache policies. This is the reason why we only uploaded the configuration file needed for a single proxy, which is under the directory of ```ProxyCache```.

Reference: [Understanding proxy_pass](https://www.digitalocean.com/community/tutorials/understanding-nginx-http-proxying-load-balancing-buffering-and-caching) and [A Guide to Caching](https://www.nginx.com/blog/nginx-caching-guide/)

```proxy_cache.conf``` configures the nginx to a proxy cache. Replace the content in /etc/nginx/nginx.conf with the code inside this file if you want to set your own Nginx as proxy. Remember to set the port number inside /etc/nginx/sites_available/default to a number that does not conflict with port 80.

## GeoDNS
Remember to install bind9 first. For both master and slave, run ```bash GeoIP.sh``` first, then move GeoIP.acl to BIND configuration directory, which should be /etc/bind/.
### Master Name Server
Remember to create a log file ```/var/log/named/ee595cdn.log```.

```named.conf``` is the top level configuration file. ```named.conf.options``` has set up configurations applied to all views clauses. ```named.conf.local``` defines view clauses to mapping incoming requests geographically. In each view clause, a zone file is included. Since we have three views and one default, there are four corresponding zone files under /var/cache/bind/view/, all of which are listed in the folder view. They are ```master.ee595cdn.com.default```, ```master.ee595cdn.com.europe```, ```master.ee595cdn.com.north.america```, and ```master.ee595cdn.com.south.america```. There are a lot of IP address you need to modified when you start the system, all of which have been commented so that you could easily find them.

### Slave Name Server
Remember to create a log file ```/var/log/named/ee595cdn.log```.

The same as master name server, slave has ```named.conf```, ```named.conf.options```, and ```named.conf.local```. The main difference is that slave will transfer zone files from master. So for slave, we don't need view directory.
 
## Performance Test
Regarding the performance estimation, we use [this website](https://tools.keycdn.com/performance) to compare the results.
