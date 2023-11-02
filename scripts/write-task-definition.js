function env(key) {
  let envKey = key + '__' + process.env.CI_ENVIRONMENT_SLUG;

  if (!process.env[envKey]) {
    console.error('Environment variable ' + envKey + ' does not exist.');
    process.exit(1);
  } else {
    return process.env[envKey];
  }
}

function getEnvironmentKeyPairs(keys) {
  return keys.map((key) => {
    return {
      name: key,
      value: env(key),
    };
  });
}

let taskDefinition = {
  volumes: [],
  family: 'webcaptioner-' + process.env.CI_ENVIRONMENT_SLUG,
  executionRoleArn: 'REMOVED',
  networkMode: 'awsvpc',
  containerDefinitions: [
    {
      logConfiguration: {
        logDriver: 'awslogs',
        options: {
          'awslogs-group': '/ecs/webcaptioner',
          'awslogs-region': 'us-east-1',
          'awslogs-stream-prefix': 'ecs',
        },
      },
      portMappings: [
        {
          hostPort: 8080,
          protocol: 'tcp',
          containerPort: 8080,
        },
      ],
      cpu: 0,
      memoryReservation: 300,
      volumesFrom: [],
      image:
        'REMOVED:' +
        process.env.CI_ENVIRONMENT_SLUG,
      name: 'webcaptioner',
      environment: [
        ...getEnvironmentKeyPairs([
          'CHROME_EXTENSION_ID',
          'GOOGLE_CAST_APP_ID',
          'REDIS_URL',
          'ADMIN_TOKEN',
          'TWITCH_APP_CLIENT_ID',
          'TWITCH_APP_CLIENT_SECRET',
          'DROPBOX_CLIENT_ID',
          'GOOGLE_FONTS_API_KEY',
          'FIREBASE_API_KEY',
          'FIREBASE_AUTH_DOMAIN',
          'FIREBASE_DATABASE_URL',
          'FIREBASE_PROJECT_ID',
          'FIREBASE_STORAGE_BUCKET',
          'FIREBASE_MESSAGING_SENDER_ID',
          'FIREBASE_NODE_SERVICE_ACCOUNT_KEY',
          'HELPSCOUT_DOCS_API_KEY',
          'HELPSCOUT_DOCS_COLLECTION_ID',
        ]),
        {
          name: 'HOST_PUBLIC',
          value: process.env.CI_ENVIRONMENT_URL,
        },
      ],
    },
  ],
};

console.log(JSON.stringify(taskDefinition));
