#!/bin/sh

npm --prefix ./server start &
npm --prefix ./client run dev
wait -n
