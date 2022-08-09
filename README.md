# nodejs-microservices

This is a nodejs app using microservices. Each service has its own database.

-   Users (includes auth routes)
-   Notes (CRUD of notes)
-   Notify (RabbitMQ consumer which send emails through gmail smtp server)
-   Gateway (Proxy server)
-   Pgadmin (email/password - test@gmail.com/pass by default)

## Usage

To run all services please use this command

```bash
docker-compose up
```
