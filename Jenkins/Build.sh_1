#!/bin/bash

build_services(){

. ${WORKSPACE}/jenkins/${ENVIRONMENT}/env

    prodts=${WORKSPACE}/${SERVICE}/src/environments/environment.prod.ts

    sed -i "s+apiUrl:.*+apiUrl: 'http://${DEPLOY_HOST}:${DMS_PORT}',+" $prodts
    sed -i "s+umsUrl:.*+umsUrl: 'http://${DEPLOY_HOST}:${UMS_PORT}',+" $prodts
    sed -i "s+omsUrl:.*+omsUrl: 'http://${DEPLOY_HOST}:${OMS_PORT}',+" $prodts
    sed -i "s+ws_url:.*+ws_url: 'http://${DEPLOY_HOST}:${WS_PORT}',+" $prodts
    sed -i "s+basePath:.*+basePath: 'http://${DEPLOY_HOST}:${FRONTEND_PORT}/',+" $prodts
    sed -i "s+spmUrl:.*+spmUrl: 'http://${DEPLOY_HOST}:${SPM_PORT}/',+" $prodts
    sed -i "s+infraUrl:.*+infraUrl: 'http://${DEPLOY_HOST}:${IMS_PORT}/',+" $prodts
	sed -i "s+tmsUrl:.*+tmsUrl: 'http://${DEPLOY_HOST}:${TMS_PORT}/',+" $prodts



    cd ${WORKSPACE}/${SERVICE}/
	
	sudo rm -rf ${WORKSPACE}/setup/dist/frontend/dist

    sudo npm install
    sudo npm rebuild node-sass
    sudo npm install -g @angular/cli@7.2.2

    sudo ng build --prod
    #sudo ng build --prod --base-href="dte/"

    #mvn clean install -DskipTests
    #gradle clean build -x test

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
	
    #sudo cp -rf ${WORKSPACE}/${SERVICE}/dist/* ${WORKSPACE}/${SERVICE}/docker
	sudo cp -rf ${WORKSPACE}/setup/dist/frontend/dist/* ${WORKSPACE}/${SERVICE}/docker
    cd ${WORKSPACE}/${SERVICE}/docker
    sudo chown -R jenkins:jenkins ${WORKSPACE}/${SERVICE}/docker


    docker build -t ${SERVICE} .
    if [ $? -ne 0 ]
	then
		echo "docker build failed"
		exit 1
	fi

    docker tag ${SERVICE} ${DOCKER_REGISTRY}/${SERVICE}
    docker push ${DOCKER_REGISTRY}/${SERVICE}

    docker rmi -f ${DOCKER_REGISTRY}/${SERVICE}
    docker rmi -f ${SERVICE}


}

build_services
