FROM postgres:15.2
COPY init.sql /docker-entrypoint-initdb.d/