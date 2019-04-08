const mongoose = require('mongoose');
const config = require('./config');


const Artist = require('./models/Artist');
const Album = require('./models/Album');
const Track = require('./models/Track');

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }

    const artist = new Artist.create(
        {name: 'Adele', description: 'Adele Laurie Blue Adkins'},
        {name: 'Michael Jackson', description: 'Michael Joseph Jackson'}
    );

    const album = new Album.create(
        {title: 'Adele 21', release: 2011, artist: artist[0]._id, image: ''},
        {title: 'Thriller', release: 1982, artist: artist[1]._id, image: ''}
    );

    // const track = new Track.create(
    //     {title: 'Rolling in the Deep', length: 3, album: album[0]._id, image: ''},
    //     {title: 'Billie Jean', length: 4, album: album[1]._id, image: ''}
    // );



    await Track.create(
        {
            title: 'Rolling in the Deep',
            length: 3,
            album: album[0]._id,
            image: ''
        },
        {
            title: 'Billie Jean',
            length: 4,
            album: album[1]._id,
            image: ''
        }
    )

};

run().catch(error => {
    console.error('Something went wrong', error);
});