pipeline {
    agent any
    stages {
		stage('Install') {
			steps {
			    echo "Current: Installing dependencies"
				sh 'yarn install'
			}
		}
		stage('Build') {
			steps {
			    echo "Current: Building with webpack"
				sh 'yarn run client-pack'
			}
		}
		stage('Deploy') {
			steps {
			    echo "Current: Build container and deploy to heroku"
				sh "heroku container:login"
				sh 'heroku container:push web --app caro-online-1712039-1712121'
				sh 'heroku container:release web --app caro-online-1712039-1712121'
			}
		}
	}
}