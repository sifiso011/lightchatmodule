# lightchatmodule
Chat App with WebSockets and Node.js
WebSocket is a popular communication protocol (TCP) that enables seamless full-duplex communication (two-way communication) between client and server. In other words, it allows websites send and receive data without delay. WebSockets do not use the http:// or https:// scheme (because they do not follow the HTTP protocol). Instead, WebSocket URIs use a new scheme ws: or wss: (recommended) for a secure WebSocket. Web developers use WebSocket to build chat applications, multiplayer games, SDKs, or user interfaces exposing server-side services in real-time and so much more.

A simple chat app that allows users to talk to each other.

Prerequisites
Before following this tutorial, you need the following:

Basic web development knowledge
Basic JavaScript Knowledge
Node 12+

Dependencies
Express: lightweight and flexible Node.js web framework that provides robust set of features for building applications.
Socket.IO: enables real-time bidirectional event-based communication. Socket abstract WebSocket connections. It uses WebSocket for transportation and then fallback to 
long polling when Websockets fail to establish a connection.
Moment: helps you manipulate and format dates in JavaScript.
Nodemon: a tool that helps develop Node.js applications by automatically restarting the node application when file changes in the directory are detected.
