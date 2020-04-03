#!/bin/bash

build_services(){

    npm install
    #npm rebuild node-sass
    #npm install -g @angular/cli@7.2.2

    ng build --prod
	# ng build

    if [ $? -ne 0 ]
	then
	    echo ""
		echo "npm build failed"
		exit 1
	else
	    echo ""
	    echo "build success"
	    echo ""
	fi
	
	cp -rf ${WORKSPACE}/dist/* ${WORKSPACE}/Docker/
    
	cd ${WORKSPACE}/Docker

    docker build -t qms_frontend:v0.${BUILD_NUMBER} .
    if [ $? -ne 0 ]
	then
		echo "docker build failed"
		exit 1
	fi


}

build_services
