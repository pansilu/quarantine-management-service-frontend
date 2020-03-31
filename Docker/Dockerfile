FROM httpd:2.4
RUN sed -i 's+#ErrorDocument\ 500.*+ErrorDocument\ 500 \/50x.html+' /usr/local/apache2/conf/httpd.conf
RUN sed -i 's+#ErrorDocument\ 404\ \/missing.html+ErrorDocument\ 404 \/40x.html+' /usr/local/apache2/conf/httpd.conf 
RUN rm -rf /usr/local/apache2/htdocs/
ADD 404.html /usr/local/apache2/htdocs/40x.html
ADD 50x.html /usr/local/apache2/htdocs/500.html
ADD dist/ /usr/local/apache2/htdocs/
