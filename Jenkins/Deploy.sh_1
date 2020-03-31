#!/bin/bash

deploy_services(){

    
    echo "docker rm -f 	"
    docker rm -f qms_frontend
	
	echo "docker run --restart always --name qms_backend -d -p 8085:8080 qms_backend:v0.${BUILD_NUMBER}"
    docker run --restart always --name qms_frontend -d -p 85:80 qms_frontend:v0.${BUILD_NUMBER}
}

deploy_services