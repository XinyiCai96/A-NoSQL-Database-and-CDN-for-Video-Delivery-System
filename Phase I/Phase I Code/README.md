# BigDataCDN

|Team member | Student ID|
| ---------- |:---------:|
|Yani Jin    | 3973887764|
|Xinyi Cai   | 2749149968|
|Ryan Afranji| 8763027899|

Environment: Linux.

## Instructions to Set up

### Convert a PC into a Web Server
1. Install Varnish: ```sudo apt-get install varnish```
2. Install Nginx: ```sudo apt-get install nginx```
3. Set Nginx listen on 8080 instead of 80: In server section, change "80" in the first two lines to "8080".
4. Let Varnish listen on Nginx: In backend_default section inside of /etc/varnish/default.vcl, change host to 127.0.0.1 and port to 8080.
5. Let Varnish sit on 80 which could receive HTTP request from outside:
	- In /etc/default/varnish, change the corresponding value of "-a" to 80.
	- Type ```sudo varnishd -d -f /etc/varnish/default.vcl``` to get into debug mode, then type ```start```.
	- Till now, you can access the default page of Nginx through the browser in your local machine (127.0.0.1:80)
6. Expose local web server to the public using Ngrok. Please refer to [Ngrok tutorial](https://dev.to/levivm/exposing-localhost-server-to-the-internet-in-one-minute-2713).

