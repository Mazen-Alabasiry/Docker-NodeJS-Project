pipeline {
  agent any
  stages {
    stage('git repo') {
      steps {
        sh '''ls
/bin/echo "hello from jenkins" > jenkFile.txt
ls
cat jenkFile.txt '''
      }
    }

  }
}