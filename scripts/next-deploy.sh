#!/bin/bash
set -euxo pipefail

cd src/ufvcsanextjs/
echo "Pulling latest commit"
git pull https://github.com/DevelopsS15/ufv-csa.git
echo "Installing packages via npm"
npm install
echo "Building NextJS application"
npm run build
echo "Copying NextJS build to dedicated folder"
sudo cp -r .next/* /var/www/csa
echo "Restarting nginx"
sudo systemctl enable nginx
sudo nginx -t
echo "Restarting NextJS application (via pm2)"
pm2 restart csa