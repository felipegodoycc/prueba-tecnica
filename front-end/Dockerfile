# base image
FROM node:10.9 AS builder

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install

# add app
COPY . /app

RUN node --max_old_space_size=1024 node_modules/@angular/cli/bin/ng build --prod

FROM httpd
RUN rm -r /usr/local/apache2/htdocs/*
COPY --from=builder /app/dist/front-end/ /usr/local/apache2/htdocs/
COPY --from=builder /app/.htaccess /usr/local/apache2/htdocs/
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf
RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/a### Rewrite rule was written from the Dockerfile when building the image ###\n\
    DirectoryIndex index.html\n\
    RewriteEngine on\n\
    RewriteCond %{REQUEST_FILENAME} -s [OR]\n\
    RewriteCond %{REQUEST_FILENAME} -d\n\
    RewriteRule ^.*$ - [NC,L]\n\
    RewriteRule ^(.*) index.html [NC,L]\n' \
  /usr/local/apache2/conf/httpd.conf
RUN { \
  echo 'IncludeOptional conf.d/*.conf'; \
} >> /usr/local/apache2/conf/httpd.conf \
  && mkdir /usr/local/apache2/conf.d

