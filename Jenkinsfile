pipeline {
    agent any
    environment {
        HEROKU_API_KEY='c8c87ad2-a453-47c4-818d-4fec2397fabe'
    }
    stages {
   		 stage('Git-checkout') {
			steps {
			    dir('src') {
			        script {
			            if(!fileExists('package.json')) {
			                sh "git init ."
			                sh "git remote add origin https://github.com/tnah-hcmus/caro-online.git"
			            }
			        }
    				echo "Current: git checkout code"
    				sh "git fetch"
    				sh "git checkout ${params.branch}"
    				sh "git pull origin ${params.branch}"
			    }
			}
		}
		stage('Install') {
			steps {
			    dir('src') {
			      echo "Current: Installing dependencies"
				  sh 'yarn install'
			    }
			}
		}
		stage('Build') {
			steps {
			    dir('src') {
			        echo "Current: Building with webpack"
				    sh 'yarn run client-pack'
			    }
			}
		}
		stage('Deploy') {
			steps {
			    dir('src') {
			        echo "Current: Build container and deploy to heroku"
				    sh "heroku container:login"
				    sh 'heroku container:push web --app caro-online-1712039-1712121'
				    sh 'heroku container:release web --app caro-online-1712039-1712121'
			    }
			}
		}
	}
}