sudo rm -r ./src/entities
if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi
npx typeorm-model-generator -h $DB_HOST -d $DB_NAME -u $DB_USER -x $DB_PASSWD -p $DB_PORT -e $DB_DIALECT -o ./src/
rm ./src/ormconfig.json
rm ./src/tsconfig.json