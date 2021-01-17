# MongoDB Automatic Backup System

<p>Industry-Proven MongoDB Backup Microservice</p>

![](https://media.giphy.com/media/r3oOElXxOl0mVpoKzg/giphy.gif)

This application creates a full backup of the MongoDB database.  
It removes old backups as well as creates new backups. You can configure the retention period in weeks similarly as in aws RDS.  
You can configure the cron expression according to your need, referring to [this generator](https://crontab.cronhub.io/) or another.  
It supports two storage types as of now(`local` or `aws`).  
In most enterprise applications, relying on aws S3 is obviously common.  

## Configuration
Configure your own dotenv file like so:
```bash
cp env.example .env
```
`env.example` file itself is well documented.  

## Deployment
### Deploy Using PM2
You need to have mongodb(version >= 3.6) installed on your operating system first.  
```bash
mkdir backups
npm install --global pm2@latest
pm2 start index.js
```

### Deploy Using Docker
```bash
docker-compose up -d
```

## Bonus: Restore
Example command:
```bash
node restore --file=xxx.gz --fromDB=aaa --toDB=bbb
```
In the above example, `xxx.gz` is a backup file name inside the `local_backups` directory.  
`aaa` is the original db name, `bbb` is the destination db name, which are optional.  

## TODO
Port to TS, because I love it!

## License
**MIT**

Made with :heart: by [CrazyOptimist](https://crazyoptimist.net)
