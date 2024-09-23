Microsoft Windows [Version 10.0.19045.4651]
(c) Корпорация Майкрософт (Microsoft Corporation). Все права защищены.

F:\code\JS\NodeJS\JS_Netology\DockerIntroduce>docker pull busybox
Using default tag: latest
latest: Pulling from library/busybox
ec562eabd705: Pull complete
Digest: sha256:9ae97d36d26566ff84e8893c64a6dc4fe8ca6d1144bf5b87b2b85a32def253c7
Status: Downloaded newer image for busybox:latest
docker.io/library/busybox:latest

What's next:
    View a summary of image vulnerabilities and recommendations → docker scout quickview busybox

F:\code\JS\NodeJS\JS_Netology\DockerIntroduce>docker run --name pinger -it busybox ping -c 7 netology.ru
PING netology.ru (188.114.99.233): 56 data bytes
64 bytes from 188.114.99.233: seq=0 ttl=63 time=15.147 ms
64 bytes from 188.114.99.233: seq=1 ttl=63 time=15.704 ms
64 bytes from 188.114.99.233: seq=2 ttl=63 time=16.125 ms
64 bytes from 188.114.99.233: seq=3 ttl=63 time=12.897 ms
64 bytes from 188.114.99.233: seq=4 ttl=63 time=16.850 ms
64 bytes from 188.114.99.233: seq=5 ttl=63 time=13.686 ms
64 bytes from 188.114.99.233: seq=6 ttl=63 time=11.738 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 11.738/14.592/16.850 ms

F:\code\JS\NodeJS\JS_Netology\DockerIntroduce>docker ps -a
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS
           PORTS     NAMES
5bc581382ae9   busybox   "ping -c 7 netology.…"   24 seconds ago   Exited (0) 17 seconds ago             pinger

F:\code\JS\NodeJS\JS_Netology\DockerIntroduce>docker logs pinger
PING netology.ru (188.114.99.233): 56 data bytes
64 bytes from 188.114.99.233: seq=0 ttl=63 time=15.147 ms
64 bytes from 188.114.99.233: seq=1 ttl=63 time=15.704 ms
64 bytes from 188.114.99.233: seq=2 ttl=63 time=16.125 ms
64 bytes from 188.114.99.233: seq=3 ttl=63 time=12.897 ms
64 bytes from 188.114.99.233: seq=4 ttl=63 time=16.850 ms
64 bytes from 188.114.99.233: seq=5 ttl=63 time=13.686 ms
64 bytes from 188.114.99.233: seq=6 ttl=63 time=11.738 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 11.738/14.592/16.850 ms

F:\code\JS\NodeJS\JS_Netology\DockerIntroduce>docker start pinger
pinger

F:\code\JS\NodeJS\JS_Netology\DockerIntroduce>docker ps -a
CONTAINER ID   IMAGE     COMMAND                  CREATED              STATUS       
              PORTS     NAMES
5bc581382ae9   busybox   "ping -c 7 netology.…"   About a minute ago   Exited (0) 2 
seconds ago             pinger

F:\code\JS\NodeJS\JS_Netology\DockerIntroduce>docker logs pinger
PING netology.ru (188.114.99.233): 56 data bytes
64 bytes from 188.114.99.233: seq=0 ttl=63 time=15.147 ms
64 bytes from 188.114.99.233: seq=1 ttl=63 time=15.704 ms
64 bytes from 188.114.99.233: seq=2 ttl=63 time=16.125 ms
64 bytes from 188.114.99.233: seq=3 ttl=63 time=12.897 ms
64 bytes from 188.114.99.233: seq=4 ttl=63 time=16.850 ms
64 bytes from 188.114.99.233: seq=5 ttl=63 time=13.686 ms
64 bytes from 188.114.99.233: seq=6 ttl=63 time=11.738 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 11.738/14.592/16.850 ms
PING netology.ru (188.114.98.233): 56 data bytes
64 bytes from 188.114.98.233: seq=0 ttl=63 time=15.664 ms
64 bytes from 188.114.98.233: seq=1 ttl=63 time=33.372 ms
64 bytes from 188.114.98.233: seq=2 ttl=63 time=14.911 ms
64 bytes from 188.114.98.233: seq=3 ttl=63 time=13.914 ms
64 bytes from 188.114.98.233: seq=4 ttl=63 time=13.370 ms
64 bytes from 188.114.98.233: seq=5 ttl=63 time=15.827 ms
64 bytes from 188.114.98.233: seq=6 ttl=63 time=14.949 ms

--- netology.ru ping statistics ---
7 packets transmitted, 7 packets received, 0% packet loss
round-trip min/avg/max = 13.370/17.429/33.372 ms

F:\code\JS\NodeJS\JS_Netology\DockerIntroduce>docker rm pinger
pinger
