sudo apt-get install software-properties-common -y
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update -y

sleep 1

echo What version?

read version

sudo apt-get install php$version php$version-fpm

sleep 1

sudo apt-get install php$version-fpm php$version-mysql php$version-mbstring php$version-xml php$version-xsl php$version-gd php$version-intl php$version-soap php$version-curl php$version-zip php$version-cli php$version-common php$version-bcmath openssl
