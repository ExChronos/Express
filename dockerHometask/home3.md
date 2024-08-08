F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker exec first_node
"docker exec" requires at least 2 arguments.
See 'docker exec --help'.

Usage:  docker exec [OPTIONS] CONTAINER COMMAND [ARG...]

Execute a command in a running container

F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker exec first_node 
/bin/sh
Error response from daemon: container 70ca27c5dad6cc04388c9085d8ff7945e3d8b68255d4f90daffd7fe36422a6e5 is not running

F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker rm first_node   
first_node

F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker exec first_node 
/bin/sh

F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker exec -t first_node /bin/sh
/ # context canceled

F:\code\JS\NodeJS\JS_Netology\dockerHometask>ls
"ls" не является внутренней или внешней
командой, исполняемой программой или пакетным файлом.

F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker exec -it first_node /bin/sh
/ # ls
bin    etc    home   lib64  root   tmp    var
dev    ex     lib    proc   sys    usr       
/ # cd dev
/dev # ls
core     mqueue   pts      stderr   tty
fd       null     random   stdin    urandom
full     ptmx     shm      stdout   zero
/dev # cd ..
/ # ls var
spool  www
/ # ls
bin    etc    home   lib64  root   tmp    var
dev    ex     lib    proc   sys    usr
/ # cd var
/var # ls
spool  www
/var # cd ..
/ # cd ex/first/demo
/ex/first/demo # ls
file1.txt
/ex/first/demo # touch file2.txt
/ex/first/demo # nano file1.txt
/bin/sh: nano: not found
/ex/first/demo # sudo apt install nano
/bin/sh: sudo: not found
/ex/first/demo # apt-get install nano
/bin/sh: apt-get: not found
/ex/first/demo # ls
file1.txt  file2.txt
/ex/first/demo # cd ..
/ex/first # ls
demo
/ex/first # cd ..
/ex # ls
first
/ex #



Microsoft Windows [Version 10.0.19045.4651]
(c) Корпорация Майкрософт (Microsoft Corporation). Все права защищены.ы.

F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES

F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker ps -a
CONTAINER ID   IMAGE     COMMAND     CREATED         STATUS
            PORTS     NAMES
70ca27c5dad6   busybox   "/bin/sh"   3 minutes ago   Exited (0) 2 minutes ago             first_node

F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker run --name first_node -i -d F:\code\JS\NodeJS\JS_Netology\dockerHometask\data:/ex/first/demo
docker: invalid reference format.
See 'docker run --help'.

F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker run --name first_node -i -d F:\code\JS\NodeJS\JS_Netology\dockerHometask\data:/ex/first/demo busybox
docker: invalid reference format.
See 'docker run --help'.

F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker run --name first_node -i -d -v F:\code\JS\NodeJS\JS_Netology\dockerHometask\data:/ex/first/demo busybox
fc3f3fa85f8d00237a0d7e7e839df66c63e70088d5f6f5ae9d606e172c8cb766

F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED         STATUS         PORTS     NAMES
fc3f3fa85f8d   busybox   "sh"      7 seconds ago   Up 6 seconds     
        first_node

F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker run --name second_node -i -d -v F:\code\JS\NodeJS\JS_Netology\dockerHometask\data:/ex/second/demo busybox
d03cc20be055350a0a673de808eadc76d5db102e20e7c2331fc70e5684cd9b2c
                                                                    
F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker exec -it second_node                 

What's next:
    Try Docker Debug for seamless, persistent debugging tools in any container or image → docker debug second_node
    Learn more at https://docs.docker.com/go/debug-cli/
"docker exec" requires at least 2 arguments.
See 'docker exec --help'.

Usage:  docker exec [OPTIONS] CONTAINER COMMAND [ARG...]

Execute a command in a running container

F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker ps              
CONTAINER ID   IMAGE     COMMAND   CREATED              STATUS      
        PORTS     NAMES
d03cc20be055   busybox   "sh"      About a minute ago   Up About a minute             second_node
fc3f3fa85f8d   busybox   "sh"      4 minutes ago        Up 4 minutes                  first_node

F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker exec -it second_node /bin/sh
/ # ls
bin    etc    home   lib64  root   tmp    var
dev    ex     lib    proc   sys    usr
/ # cd ex
/ex # ls
second
/ex # cd second
/ex/second # ls
demo
/ex/second # cd demo
/ex/second/demo # ls
file1.txt  file2.txt
/ex/second/demo #
/ex/second/demo # 


F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker stop first_node
first_node

F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker rm second_node
second_node

F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker ps -a         
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES

F:\code\JS\NodeJS\JS_Netology\dockerHometask>


F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker stop second_node

second_node

F:\code\JS\NodeJS\JS_Netology\dockerHometask>docker rm first_node
first_node

F:\code\JS\NodeJS\JS_Netology\dockerHometask>