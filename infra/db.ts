import * as mongoose from 'mongoose';

class Database{
    private DB_URl = 'mongodb://localhost:27017/db_portal'

    createConnection(){
        mongoose.connect(this.DB_URl), 
        mongoose.set('useFindAndModify', false);
    }
}

export default Database;