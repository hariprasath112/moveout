git pull origin main
npm install
pm2 reload moveout-backend
pm2 restart all

echo "Update completed successfully."