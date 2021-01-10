pipeline {
    agent any
    environment {
        HEROKU_API_KEY='c8c87ad2-a453-47c4-818d-4fec2397fabe'
    }
    stages {
		stage('Load env variable') {
			steps {
			    fileOperations([fileCopyOperation(
					excludes: '',
					flattenFiles: false,
					includes: 'D:\\jenkins\\users\\env\\**',
					targetLocation: 'D:\\jenkins\\workspace\\CI-CD plus score"
				)])
			}
		}
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