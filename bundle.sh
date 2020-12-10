#! /bin/sh
npm run build
rm -rf ../../html/Client-EHM
mkdir ../../html/Client-EHM
cp -R build/* ../../html/Client-EHM
