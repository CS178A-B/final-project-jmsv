#! /bin/bash
heroku container:push --app=obscure-ocean-12960 web
heroku container:release --app=obscure-ocean-12960 web
