# Vahe Hovakimyan — IT Projects

This repository contains my practical projects in Linux system programming, networking, Bash scripting and cybersecurity.

## 🚀 DevOps Course Website

A responsive DevOps learning website built with
HTML, CSS and JavaScript.

🌐 Live Website:
https://cloudforge.pages.dev

## Projects

### Security Log Analyzer

A Bash-based security project that analyzes sample Linux SSH authentication logs and identifies suspicious activity.

**Features:**

- Counts failed SSH login attempts
- Groups failed attempts by IP address
- Detects suspicious IPs
- Displays successful root logins
- Detects access to `/etc/shadow`
- Generates a security report

**Technologies:** Bash, grep, awk, sort, uniq

[View Security Log Analyzer](./Security_Log_Analyzer)

---

### HTTP Client Server

A multi-client HTTP-like client-server application written in C using TCP sockets and POSIX threads.

**Features:**

- Handles multiple clients with `pthread`
- Supports GET and ECHO methods
- Uses the custom CHLP/1.0 protocol
- Validates requests and protocol versions
- Implements 400, 404 and 500 error responses
- Uses reliable `send_all` and `recv_all` functions

**Technologies:** C, TCP/IP, sockets, pthreads, file I/O

[View HTTP Client Server](./HTTP_Client_Server)

---

### Custom Shell

A custom Linux-style shell written in C.

**Features:**

- Executes external commands using `fork` and `exec`
- Supports `cd`, `pwd`, `echo` and `exit`
- Stores command history
- Supports environment variables
- Includes a customizable command prompt
- Handles built-in and external commands

**Technologies:** C, Linux, processes, Bash concepts, system programming

[View Custom Shell](./Custom_Shell)

## Technical Skills

- Linux and Bash
- C and system programming
- TCP/IP networking
- Git and GitHub
- Cybersecurity fundamentals
- Linux log analysis
- SQL fundamentals
- JavaScript and Node.js fundamentals

## Contact

- [LinkedIn](https://www.linkedin.com/in/vahe-hovakimyan-05a8893b4)
- [GitHub](https://github.com/vahehovak15-wq)
