import paramiko
import os
import tarfile

def deploy():
    print("Compressing dist...")
    with tarfile.open('dist.tar.gz', 'w:gz') as tar:
        tar.add('dist', arcname='dist')
    print("Connecting to server...")
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect('65.109.172.180', username='root', password='d4rHKRdw9NgU')
    
    sftp = client.open_sftp()
    print("Uploading dist.tar.gz...")
    sftp.put('dist.tar.gz', '/var/www/jania-mesquita/frontend/dist.tar.gz')
    sftp.close()
    
    print("Extracting and moving files...")
    # remove old files except assets, htaccess etc might be rewritten
    # actually let's just extract and overwrite
    stdin, stdout, stderr = client.exec_command('cd /var/www/jania-mesquita/frontend && tar -xzf dist.tar.gz && cp -r dist/* . && rm -rf dist.tar.gz dist')
    print("STDOUT:", stdout.read().decode())
    print("STDERR:", stderr.read().decode())
    
    print("Setting permissions...")
    stdin, stdout, stderr = client.exec_command('cd /var/www/jania-mesquita/frontend && chown -R www-data:www-data .')
    
    client.close()
    print("Deployment complete.")

if __name__ == '__main__':
    deploy()
