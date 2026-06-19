pipeline {
    agent any

    parameters {
        choice(
            name: 'ENV_NAME',
            choices: ['QA_UPGRADE', 'DEV', 'DEVAT', 'QA', 'QA2', 'CLOUDQA', 'UAT'],
            description: 'Target Application Environment'
        )
        choice(
            name: 'TEST_SUITE',
            choices: ['@smoke', '@regression', '@sanity', 'all'],
            description: 'Select Test Suite Tag to Execute'
        )
    }

    environment {
        ENV = "${params.ENV_NAME}"
        SUITE = "${params.TEST_SUITE}"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                echo 'Cleaning up previous execution artifacts...'
                bat 'npm run clean'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                bat 'npm install'
                echo 'Installing Playwright browser engines...'
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Execute Tests') {
            steps {
                script {
                    echo "Running ${env.SUITE} tests on environment ${env.ENV}..."
                    if (env.SUITE == 'all') {
                        bat "npx cross-env ENV=${env.ENV} npx playwright test"
                    } else {
                        bat "npx cross-env ENV=${env.ENV} npx playwright test --grep ${env.SUITE}"
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Generating and archiving reports...'
            // Generate Allure Report
            bat 'npm run allure:generate'
            
            // Publish Allure Report using Jenkins Allure Plugin
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            
            // Archive Playwright reports
            archiveArtifacts artifacts: 'playwright-report/**, logs/**', allowEmptyArchive: true
        }
    }
}
